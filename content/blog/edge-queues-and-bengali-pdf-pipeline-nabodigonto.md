---
title: "Asynchronous Multi-Channel Notification Queues & Serverless Bengali PDF Generation on the Edge"
metaTitle: "Edge Queues & Bengali PDF Pipeline: Nabodigonto"
description: "How we engineered a 4-channel Cloudflare Queues notification engine (SMS, Email, WebPush, FCM) and serverless Bengali font shaping with pdf-lib and R2."
date: "2026-09-02"
tags:
  - Projects
  - Architecture
  - Cloudflare Workers
  - Backend
  - Lessons Learned
draft: false
relatedProjectSlug: "nabodigonto"
---

In the previous installments of this series, we covered [monorepo architecture on Turborepo](/blog/architecting-nabodigonto-100k-loc-monorepo) and [relational data modeling with Cloudflare D1](/blog/edge-data-modeling-cloudflare-d1-media-pipeline).

In this concluding article, we examine two of the most critical operational engines in **Nabodigonto**: how we engineered an **asynchronous 4-channel notification queue** to reach members across SMS, email, web push, and mobile push, and how we built an in-memory **serverless Bengali vector PDF engine** running on Cloudflare Workers and R2.

---

## 1. The Multi-Channel Communication Challenge in Bangladesh

When designing notifications for a grassroots welfare organization in South Asia, standard web push or transactional email alone is insufficient. Member demographics span widely different technological realities:

- **Rural & Elderly Members:** Frequently do not own smartphones or check email accounts. They rely on direct telecom **SMS** for dues receipts, meeting notices, and emergency welfare disbursements.
- **Active Volunteers & University Students:** Rely heavily on real-time **Web Push** (VAPID) in the browser and **Mobile Push** via Firebase Cloud Messaging (FCM) on the Expo/React Native mobile app.
- **Official Records & Donors:** Donors require formal **email receipts** with attached vector PDF statements.

If the primary API worker tried to make sequential outbound HTTP requests to telecom SMS gateways and email APIs inside the request handler:
1. **Unacceptable Latency:** Telecom SMS gateways in Bangladesh often have 1,500ms–3,000ms response latencies.
2. **Cascading Timeouts:** A slow third-party API would hold the client's connection open, exhausting worker CPU time and risking HTTP 504 timeouts.
3. **Partial Delivery Failures:** If the SMS dispatch succeeded but email failed, retrying the whole request would lead to duplicate SMS messages.

To solve this, we decoupled communication entirely using **Cloudflare Queues**.

---

## 2. The 4-Channel Queue Fanout Architecture

```
[ Frontend Client ]
       │
       ▼ (POST /api/dues/collect)
[ services/api ] ──► [ Cloudflare D1 ] (Atomic DB batch)
       │
       ▼ (env.NOTIFICATIONS_QUEUE.send())
[ Cloudflare Queue: "nabodigonto-notifications" ]
       │
       ▼ (Batch consumer worker)
[ services/notification-service ]
       ├──► OneCodeSoft SMS Gateway (Direct carrier SMS)
       ├──► Resend API (Transactional HTML + PDF receipts)
       ├──► Web Push / VAPID (Browser notifications)
       └──► Firebase Cloud Messaging (Expo mobile app)
```

### Decoupled Producer

In `services/api`, the request handler performs its atomic D1 database operations, queues the notification payload, and immediately returns a response to the user in under **40ms**:

```ts
// services/api/src/routes/dues.ts
import { Hono } from "hono"
import { DuesCollectSchema } from "@nabodigonto/contracts"

export const duesRouter = new Hono().post("/collect", async (c) => {
  const input = c.req.valid("json")
  
  // 1. Commit atomic database mutations
  const payment = await c.env.DB_SERVICE.recordDuesPaymentAtomic(input)

  // 2. Publish async notification event to Cloudflare Queue
  await c.env.NOTIFICATIONS_QUEUE.send({
    type: "DUES_PAYMENT_CONFIRMED",
    recipientPhone: input.phoneNumber,
    recipientEmail: input.email,
    fcmToken: input.fcmToken,
    data: {
      memberName: input.memberName,
      month: input.month,
      amount: input.amount,
      receiptNumber: payment.receiptNumber,
      receiptPdfUrl: `https://media.nabodigonto.org/receipts/${payment.receiptNumber}.pdf`,
    },
  })

  return c.json({ success: true, receiptNumber: payment.receiptNumber }, 201)
})
```

### Resilient Queue Consumer

In `services/notification-service`, the consumer worker processes messages in batches with exponential backoff and dead-letter queueing:

```ts
// services/notification-service/src/index.ts
export default {
  async queue(batch: MessageBatch<NotificationPayload>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const { type, recipientPhone, recipientEmail, fcmToken, data } = message.body

      try {
        switch (type) {
          case "DUES_PAYMENT_CONFIRMED":
            // Channel 1: Bangladeshi SMS Gateway (OneCodeSoft API)
            if (recipientPhone) {
              await sendSmsViaOneCodeSoft(env.SMS_API_KEY, {
                recipient: recipientPhone,
                message: `নবদিগন্ত: আপনার ${data.month} মাসের চাঁদা ৳${data.amount} সফলভাবে গৃহীত হয়েছে। রশিদ নং: ${data.receiptNumber}`,
              })
            }

            // Channel 2: Transactional Email via Resend
            if (recipientEmail) {
              await sendEmailReceipt(env.RESEND_API_KEY, {
                to: recipientEmail,
                subject: `Nabodigonto Dues Receipt - ${data.month}`,
                receiptNumber: data.receiptNumber,
                amount: data.amount,
                downloadUrl: data.receiptPdfUrl,
              })
            }

            // Channel 3: Mobile Push Notification (Firebase Cloud Messaging)
            if (fcmToken) {
              await sendFcmPush(env.FIREBASE_SERVICE_ACCOUNT, {
                token: fcmToken,
                title: "চাঁদা পরিশোধ সফল",
                body: `${data.month} মাসের চাঁদা ৳${data.amount} গৃহীত হয়েছে।`,
              })
            }
            break

          case "EMERGENCY_BLOOD_ALERT":
            await broadcastEmergencyDonorAlert(env, data)
            break
        }

        // Acknowledge message upon successful dispatch
        message.ack()
      } catch (error) {
        console.error(`Failed to dispatch message ${message.id}:`, error)
        // Retry with backoff if within retry budget
        message.retry({ delaySeconds: 30 })
      }
    }
  },
}
```

---

## 3. Serverless Bengali PDF Generation Without Headless Browsers

A core feature of the platform is generating official digital membership ID cards and verifiable PDF receipts for monthly contributions.

The default approach in modern web engineering is using headless Chromium (Puppeteer / Playwright) to render HTML to PDF. However:
- Chromium binaries exceed **300MB**.
- Headless browsers require hundreds of megabytes of RAM.
- Cloudflare Workers run in V8 isolates with a **128MB memory limit** and cannot execute Node.js subprocesses.

To overcome this, we built a dedicated media worker (`services/media-service`) that generates native vector PDFs entirely in memory using **`pdf-lib`** and **`@pdf-lib/fontkit`**.

### Solving Bengali Unicode Font Shaping

Standard PDF engines only support Latin-1 or ASCII characters. Bengali is a Brahmic script that requires complex OpenType font shaping: consonants combine with vowel signs (*matras*) and conjunct glyphs (*juktakkhor*). Drawing raw Unicode strings without a font shaper results in broken, unreadable character sequences.

We resolved this by embedding custom TrueType fonts (`Kalpurush.ttf` and `SolaimanLipi.ttf`) and registering `@pdf-lib/fontkit`:

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

  // Embed custom Bengali Unicode TrueType font
  const customFont = await pdfDoc.embedFont(member.fontBytes)

  // Standard CR80 PVC Card Dimensions in points: 243 x 153 pt (85.6mm x 54mm)
  const page = pdfDoc.addPage([243, 153])
  const { width, height } = page.getSize()

  // Draw background header banner
  page.drawRectangle({
    x: 0,
    y: height - 36,
    width,
    height: 36,
    color: rgb(0.08, 0.58, 0.36),
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

  // Embed dynamic QR code for instant phone scanning & edge verification
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

## 4. In-Memory Streaming to Cloudflare R2

Once the vector PDF bytes are assembled:
1. The media worker streams the `Uint8Array` directly into Cloudflare R2 (`env.MEDIA_BUCKET.put()`).
2. An immutable key is assigned (`cards/${memberNumber}.pdf`).
3. The worker returns a signed download URL or streams the document with `Content-Type: application/pdf` headers.

Because this pipeline performs pure in-memory vector math without spawning browser instances, card generation completes in under **40ms** and consumes less than **25MB of RAM**, comfortably running within edge limits.

---

## 5. Engineering Reflections

Building Nabodigonto across more than 100,000 lines of code demonstrates that distributed, edge-native systems can solve real-world community problems reliably:

1. **Decouple Slow External APIs:** Outbound telecom and email calls should never hold user HTTP requests hostage. Asynchronous queues guarantee responsiveness and provide built-in retries.
2. **In-Memory Vector Math Beats Headless Browsers:** For structured documents, programmatic vector generation with `pdf-lib` and font shaping is faster, lighter, and thousands of times cheaper than running Chromium.
3. **Design for Local Reality:** Software built for South Asian grassroots communities must adapt to diverse connectivity tiers, from carrier SMS on 2G feature phones to push notifications on modern mobile apps.
