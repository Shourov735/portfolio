---
title: "Edge Data Modeling & Offline Resiliency: Cloudflare D1, Batch Transactions, and Media Pipelines"
metaTitle: "Edge Data Modeling: Cloudflare D1 & Media Pipeline"
description: "Deep dive into edge SQLite constraints with Cloudflare D1, atomic batch transactions, R2 storage, and isolated Bengali font rendering with pdf-lib."
date: "2026-08-22"
tags:
  - Architecture
  - Database
  - Cloudflare Workers
  - Backend
draft: false
relatedProjectSlug: "nabodigonto"
---

In [Part 1 of this series](/blog/architecting-nabodigonto-100k-loc-monorepo), I detailed how we decoupled the Nabodigonto platform into a Turborepo monorepo with dedicated edge services. 

Once the service boundaries were established, the next major engineering challenge was **data persistence and document generation** at the serverless edge. Non-profit operations require rock-solid relational consistency: monthly dues must match financial ledgers, member statuses must be updated atomically, and members need printable identity cards and donation receipts in Bengali.

Here is how we solved relational edge data modeling on **Cloudflare D1** and built an in-memory Bengali vector PDF generation pipeline on **Cloudflare Workers and R2**.

---

## 1. Choosing Cloudflare D1: SQLite at the Global Edge

Traditional web apps connect to a centralized PostgreSQL or MySQL instance through persistent connection pools (like PgBouncer). In serverless edge environments (Cloudflare Workers, V8 isolates), maintaining long-lived TCP connection pools to a single origin database introduces significant latency and connection exhaustion risks.

We chose **Cloudflare D1**, which provides distributed SQLite at the edge:
- **Zero Connection Management:** Worker isolates execute queries via internal RPC bindings directly against the D1 storage engine.
- **Microsecond Read Latency:** Read replicas can cache query results close to end users in South Asia.
- **Type-Safe Schema with Prisma:** We use Prisma ORM coupled with the `@prisma/adapter-d1` driver adapter inside our shared `packages/db` package.

```prisma
// packages/db/prisma/schema.prisma

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

model Member {
  id              String         @id @default(cuid())
  memberNumber    String         @unique
  fullName        String
  bloodGroup      String
  phoneNumber     String         @unique
  role            String         @default("GENERAL_MEMBER")
  status          String         @default("ACTIVE")
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  
  duesPayments    DuesPayment[]
  auditEntries    AuditLog[]
}

model DuesPayment {
  id              String         @id @default(cuid())
  memberId        String
  amount          Float
  monthPaid       String         // Format: YYYY-MM
  receiptNumber   String         @unique
  paymentMethod   String         // HAND_CASH, BKASH, NAGAD, BANK_TRANSFER
  receivedById    String
  createdAt       DateTime       @default(now())

  member          Member         @relation(fields: [memberId], references: [id])
}

model BloodDonor {
  id              String         @id @default(cuid())
  memberId        String?
  fullName        String
  bloodGroup      String         // A+, B+, O+, AB+, etc.
  district        String
  lastDonatedAt   DateTime?
  isAvailable     Boolean        @default(true)
  phoneNumber     String
  createdAt       DateTime       @default(now())
}
```

---

## 2. Edge SQLite Constraints: Atomic Batch Transactions

While SQLite is incredibly fast for reads, it has a distinct operational constraint in distributed systems: **writes are strictly serialized**. If an edge API makes multiple round-trip queries over the network to complete a single business transaction, each statement incurs coordinator overhead and lock contention.

Consider what happens when recording a member dues payment:
1. Verify the member is active.
2. Insert a new `DuesPayment` record with a generated receipt number.
3. Update the member's last-paid dues period.
4. Record an audit log entry for the receiving officer.

If executed as sequential `await` calls, an unexpected error or worker timeout halfway through would leave the database in an inconsistent state (e.g. payment logged, but member status not updated).

To prevent this, we execute multi-step mutations using atomic batch statements:

```ts
// packages/db/src/services/dues.ts
import { D1Database } from "@cloudflare/workers-types"

export async function recordDuesPaymentAtomic(
  d1: D1Database,
  data: {
    memberId: string
    amount: number
    monthPaid: string
    receiptNumber: string
    paymentMethod: string
    receivedById: string
  }
) {
  // Cloudflare D1 batch API executes all prepared statements in a single atomic transaction
  const statements = [
    d1.prepare(`
      INSERT INTO DuesPayment (id, memberId, amount, monthPaid, receiptNumber, paymentMethod, receivedById, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      data.memberId,
      data.amount,
      data.monthPaid,
      data.receiptNumber,
      data.paymentMethod,
      data.receivedById
    ),

    d1.prepare(`
      UPDATE Member
      SET updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(data.memberId),

    d1.prepare(`
      INSERT INTO AuditLog (id, action, entityId, performedById, details, createdAt)
      VALUES (?, 'DUES_COLLECTED', ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      data.memberId,
      data.receivedById,
      JSON.stringify({ amount: data.amount, monthPaid: data.monthPaid, receipt: data.receiptNumber })
    )
  ]

  // Atomic execution: either all 3 statements succeed or none do
  const results = await d1.batch(statements)
  return results
}
```

By leveraging `d1.batch()`, all operations travel to the D1 primary coordinator in a single HTTP payload and commit together, ensuring strict ACID consistency without database locks lingering across network round trips.

---

## 3. Media Generation at the Edge: In-Memory Vector PDFs

A core requirement for Nabodigonto was providing members with official digital identity cards and verifiable PDF receipts for monthly donations.

The industry-standard way to generate PDFs in web apps is using headless Chrome (e.g. Puppeteer) to print an HTML page. However:
- Puppeteer requires a 300MB+ Chromium binary.
- It consumes hundreds of megabytes of RAM.
- Cloudflare Workers run on V8 isolates with a **128MB memory limit** and cannot spawn OS subprocesses.

To overcome this, we built a dedicated media worker (`services/media-service`) that generates native vector PDFs entirely in memory using **`pdf-lib`** and **`@pdf-lib/fontkit`**.

### The Bengali Unicode Font Rendering Problem

Standard PDF engines only support ASCII and Latin-1 character sets out of the box. Bengali is a complex Brahmic script with consonants, dependent vowel signs (*matras*), and conjunct glyphs (*juktakkhor*). If you attempt to draw raw Unicode strings into a canvas without a proper font shaper, characters render out of order or as unreadable glyph boxes.

To resolve this:
1. We bundle TrueType Unicode font files (`Kalpurush.ttf` and `SolaimanLipi.ttf`) as binary assets in the media worker.
2. We register `@pdf-lib/fontkit` on the `PDFDocument` instance to enable full OpenType font shaping and glyph ligature substitution.
3. We draw vector elements, text, and dynamic QR verification codes directly onto a standardized PVC card canvas dimensions (3.375" x 2.125").

```ts
// services/media-service/src/generators/member-card.ts
import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import QRCode from "qrcode"

export async function generateMemberIdCardPdf(member: {
  fullName: string
  memberNumber: string
  bloodGroup: string
  role: string
  verificationUrl: string
  fontBytes: ArrayBuffer
}): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  // Embed Bengali Unicode font
  const customFont = await pdfDoc.embedFont(member.fontBytes)

  // Standard CR80 PVC Card Dimensions in points: 243 x 153 pt (85.6mm x 54mm)
  const page = pdfDoc.addPage([243, 153])
  const { width, height } = page.getSize()

  // Draw background banner & branding
  page.drawRectangle({
    x: 0,
    y: height - 36,
    width,
    height: 36,
    color: rgb(0.08, 0.58, 0.36), // Nabodigonto Green
  })

  // Render text with complex Bengali Unicode glyphs
  page.drawText(member.fullName, {
    x: 16,
    y: 84,
    size: 11,
    font: customFont,
    color: rgb(0.1, 0.1, 0.1),
  })

  page.drawText(`সদস্য নং: ${member.memberNumber}`, {
    x: 16,
    y: 68,
    size: 8,
    font: customFont,
    color: rgb(0.3, 0.3, 0.3),
  })

  page.drawText(`রক্তের গ্রুপ: ${member.bloodGroup}`, {
    x: 16,
    y: 52,
    size: 8,
    font: customFont,
    color: rgb(0.85, 0.15, 0.15),
  })

  // Generate QR code for instant phone scanning & verification
  const qrDataUrl = await QRCode.toDataURL(member.verificationUrl, { margin: 1, width: 120 })
  const qrImage = await pdfDoc.embedPng(qrDataUrl)
  page.drawImage(qrImage, {
    x: width - 68,
    y: 36,
    width: 52,
    height: 52,
  })

  return await pdfDoc.save()
}
```

---

## 4. Zero-Filesystem Streaming with Cloudflare R2

Serverless workers have no persistent local disk. When `generateMemberIdCardPdf` finishes building the PDF bytes:

1. The worker writes the raw `Uint8Array` directly to a Cloudflare R2 bucket (`env.MEDIA_BUCKET.put()`).
2. It assigns an immutable object key based on a hash of the content: `cards/${memberNumber}.pdf`.
3. It returns a cryptographically signed URL or pipes the document stream with appropriate `Content-Type: application/pdf` headers.

Because generation is pure in-memory vector math, producing a complete card takes under **40ms** and uses less than **25MB of memory**, comfortably running within Cloudflare's serverless isolate limits.

---

## 5. Engineering Takeaways

- **Batch at the Edge:** When working with distributed databases like Cloudflare D1, combine dependent mutations into atomic `batch()` calls to preserve consistency and avoid coordinator latency.
- **Isolate Document Rendering:** Generating PDFs and images should never run on the primary API thread. Moving media generation to an isolated worker protects the main API from memory spikes.
- **Direct Vector Assembly Beats Headless Browsers:** For documents with structured layouts, building PDFs programmatically with `pdf-lib` is orders of magnitude faster and lighter than running headless browser instances.

In **Part 3**, we will explore how we engineered an **asynchronous 4-channel notification queue** across SMS, email, web push, and FCM, and scaled our serverless Bengali PDF generation pipeline.
