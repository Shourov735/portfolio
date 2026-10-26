---
title: "Dual-Control Financial Reconciliation & Multi-Channel Notifications in Practice"
metaTitle: "Dual-Control Financial Reconciliation: Nabodigonto"
description: "How we implemented independent two-officer monthly starting balance matching, cash and bank reconciliation with surplus/deficit tracking, and queue-driven notifications."
date: "2026-09-02"
tags:
  - Projects
  - Backend
  - FinTech
  - Lessons Learned
draft: false
relatedProjectSlug: "nabodigonto"
---

In the previous two installments of this series, we covered [monorepo architecture on Turborepo](/blog/architecting-nabodigonto-100k-loc-monorepo) and [relational data modeling with Cloudflare D1 and vector PDF generation](/blog/edge-data-modeling-cloudflare-d1-media-pipeline).

In this concluding article, we examine the human and governance layer of **Nabodigonto**: how we engineered **dual-control financial reconciliation** to prevent discrepancies in grassroots treasury accounting, and how we built an **asynchronous notification queue** to keep members informed across SMS, email, and push notifications.

---

## 1. The Human Problem in Community Finances

In volunteer-led community organizations, financial transparency is not an abstract compliance checkbox — it is the lifeblood of organizational trust.

When an organization relies on monthly membership dues, public charity drives, and emergency medical funds, suspicion or bookkeeping errors can easily fracture community solidarity:
- If a single treasurer enters and approves financial numbers in isolation, there is zero protection against typo errors or unilateral mismanagement.
- If physical cash collected at neighborhood meetings is not immediately reconciled against bank accounts, discrepancies emerge at the end of the year that nobody can reconstruct.
- Standard small-business accounting tools are often either too convoluted or assume a single authoritative accountant.

To solve this, we designed the **Accountability Portal** around a core security and governance principle: **Dual-Control Verification**.

---

## 2. Independent Two-Officer Starting Balance Matching

The foundational rule of dual-control is that **no single individual can open or close a financial period alone**.

At the beginning of each calendar month, two distinct authorized officers (such as the Finance Secretary and the IT Secretary / System Admin) must independently review the physical accounts and submit what they believe the opening balance is.

The software deliberately does **not** pre-fill the second officer's form with the first officer's submission. Each officer must independently verify their records and submit their number.

```ts
// apps/web-portal/src/app/api/admin/accountability-portal/confirm/route.ts
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@nabodigonto/db"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { periodId, submittedAmount, officerRole } = body

  const period = await db.financialPeriod.findUnique({
    where: { id: periodId },
  })

  if (!period) {
    return NextResponse.json({ error: "Financial period not found" }, { status: 404 })
  }

  // Record submission from Officer 1 or Officer 2 based on role
  const isOfficer1 = officerRole === "FINANCE_OFFICER"
  const updateData = isOfficer1
    ? { startingBalance1: submittedAmount, officer1Id: userId }
    : { startingBalance2: submittedAmount, officer2Id: userId }

  const updatedPeriod = await db.financialPeriod.update({
    where: { id: periodId },
    data: updateData,
  })

  // Once both officers have entered their figures, execute the reconciliation match
  if (updatedPeriod.startingBalance1 !== null && updatedPeriod.startingBalance2 !== null) {
    const amount1 = updatedPeriod.startingBalance1
    const amount2 = updatedPeriod.startingBalance2

    if (amount1 !== amount2) {
      // Discrepancy detected: Log audit warning and block period activation
      await db.auditLog.create({
        data: {
          action: "STARTING_BALANCE_MISMATCH",
          entityId: periodId,
          performedById: userId,
          details: JSON.stringify({ amount1, amount2, delta: Math.abs(amount1 - amount2) }),
        },
      })

      return NextResponse.json({
        status: "MISMATCH",
        message: `Opening balance mismatch: Finance reported ৳${amount1}, but Admin reported ৳${amount2}. Please verify physical registers.`,
      }, { status: 400 })
    }

    // Amounts match: Period is officially opened and locked
    await db.financialPeriod.update({
      where: { id: periodId },
      data: {
        status: "ACTIVE",
        verifiedStartingBalance: amount1,
        reconciledAt: new Date(),
      },
    })

    return NextResponse.json({
      status: "VERIFIED",
      message: `Starting balance of ৳${amount1} verified and locked by both officers.`,
    })
  }

  return NextResponse.json({
    status: "AWAITING_SECOND_OFFICER",
    message: "First entry recorded. Awaiting independent submission from the second officer.",
  })
}
```

This simple, pragmatic enforcement eliminated opening balance disputes. If there is a disagreement, the officers must sit down, compare physical deposit slips and registers, resolve the discrepancy, and re-submit.

---

## 3. Physical Cash vs. Bank Reconciliation & Surplus/Deficit Logging

At the end of the monthly cycle, the platform aggregates all transactions recorded during the period:

$$\text{Expected Closing Balance} = \text{Starting Balance} + \text{Dues Collected} + \text{Donations} - \text{Expenses}$$

However, in grassroots organizations, money exists in two distinct places:
1. **Hand Cash:** Physical currency held by designated treasury volunteers for immediate emergency disbursements.
2. **Bank Accounts & Mobile Money:** Funds in the organization's official bank accounts, bKash, or Nagad merchant numbers.

When closing the month, officers physically count the cash on hand and check official bank statements, inputting:

$$\text{Actual Balance} = \text{Hand Cash Counted} + \text{Bank Balance Verified}$$

$$\text{Discrepancy} = \text{Actual Balance} - \text{Expected Closing Balance}$$

```
+-------------------------------------------------------------------------+
|                  Monthly Reconciliation Calculation                     |
|                                                                         |
|  Verified Starting Balance : ৳ 45,000.00                                |
|  + Monthly Dues Collected  : ৳ 18,500.00 (37 members @ ৳500)            |
|  + General Donations       : ৳ 12,000.00                                |
|  - Approved Welfare Grants : ৳ 22,000.00 (Medical aid & education)      |
|  ---------------------------------------------------------------------  |
|  Expected Balance          : ৳ 53,500.00                                |
|                                                                         |
|  Actual Physical Audit:                                                 |
|    Physical Hand Cash Count: ৳  8,500.00                                |
|    Verified Bank Statement : ৳ 45,000.00                                |
|  ---------------------------------------------------------------------  |
|  Actual Balance            : ৳ 53,500.00                                |
|  Status                    : BALANCED (Discrepancy: ৳0.00)              |
+-------------------------------------------------------------------------+
```

### Transparent Discrepancy Auditing

In the real world, minor differences occasionally occur — for example, unrecorded mobile banking cashout fees or loose coin rounding.

Rather than allowing administrators to quietly edit past entries to make numbers balance, the platform forces **explicit categorization**:
- If `Discrepancy > 0`: Classified as `SURPLUS`.
- If `Discrepancy < 0`: Classified as `DEFICIT`.
- In either case, the submission requires **mandatory justification notes** and creates an immutable entry in the public audit ledger.

Transparency does not require pretending humans never make mistakes; it requires ensuring every variance is documented and explained.

---

## 4. Multi-Channel Notifications via Cloudflare Queues

When a member pays their monthly dues or an emergency blood request is broadcast, the system must notify people immediately.

However, in Bangladesh, network infrastructure and user demographics dictate different communication channels:
- **Elderly or rural members:** Frequently do not check email or own smartphones with push notifications. They rely entirely on **SMS**.
- **Younger members & university students:** Prefer **WebPush** or **WhatsApp/Telegram updates**.
- **Financial records:** Donors require formal **email receipts** with attached PDF verification statements.

If the API worker attempted to call SMS gateways and email providers sequentially inside the HTTP request handler, latency would skyrocket, and a slow external telecom API could cause the user's browser request to time out.

We decoupled notifications using **Cloudflare Queues**:

```
[ Frontend Client ]
       │
       ▼ (POST /api/dues/collect)
[ services/api ] ──► [ Cloudflare D1 ] (Atomic DB batch)
       │
       ▼ (env.NOTIFICATIONS_QUEUE.send())
[ Cloudflare Queue: "nabodigonto-notifications" ]
       │
       ▼ (Batch consumer)
[ services/notification-service ]
       ├──► OneCodeSoft SMS Gateway (Direct carrier SMS)
       ├──► Resend API (Transactional HTML + PDF receipts)
       └──► WebPush / FCM (Mobile & browser alerts)
```

### The Queue Consumer Pattern

```ts
// services/notification-service/src/index.ts
export default {
  async queue(batch: MessageBatch<NotificationPayload>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      const { type, recipientPhone, recipientEmail, data } = message.body

      try {
        switch (type) {
          case "DUES_PAYMENT_CONFIRMED":
            // 1. Send SMS via Bangladeshi Gateway (OneCodeSoft API)
            await sendSmsViaOneCodeSoft(env.SMS_API_KEY, {
              recipient: recipientPhone,
              message: `নবদিগন্ত: আপনার ${data.month} মাসের চাঁদা ৳${data.amount} সফলভাবে গৃহীত হয়েছে। রশিদ নং: ${data.receiptNumber}`,
            })

            // 2. Send Email Receipt via Resend if email is registered
            if (recipientEmail) {
              await sendEmailReceipt(env.RESEND_API_KEY, {
                to: recipientEmail,
                subject: `Nabodigonto Dues Receipt - ${data.month}`,
                receiptNumber: data.receiptNumber,
                amount: data.amount,
                downloadUrl: data.receiptPdfUrl,
              })
            }
            break

          case "EMERGENCY_BLOOD_ALERT":
            // Broadcast alert to matching blood donors in the district
            await broadcastEmergencyAlert(env, data)
            break
        }

        // Acknowledge message upon successful dispatch
        message.ack()
      } catch (error) {
        console.error(`Failed to dispatch notification for message ${message.id}:`, error)
        // message.retry() will backoff and retry up to max retries
        message.retry({ delaySeconds: 30 })
      }
    }
  },
}
```

By offloading all external network calls to the queue worker, the primary API returns in under **50ms**, while SMS and email dispatches are retried reliably in the background.

---

## 5. Summary & Engineering Reflections

Building Nabodigonto across more than 100,000 lines of code has been one of the most rewarding engineering experiences of my university career:

1. **Architecture Is About Boundaries:** Splitting `web-public` and `web-portal` kept public load times instant and prevented auth downtime from affecting community visitors.
2. **Design for Human Reality:** Software for non-profits must acknowledge that money is messy and volunteer time is scarce. Dual-control reconciliation and explicit deficit/surplus logging built lasting trust among executive members.
3. **Serverless Edge Is Production-Ready:** Running D1, R2, Queues, and Workers delivered sub-second responsiveness across Bangladesh at effectively zero cloud infrastructure cost.

If you are an engineer building for real-world organizations: do not design just for the sunny day where everything works. Design the audit trails, the retry queues, and the human checks for the rainy days — because those are what keep real communities thriving.
