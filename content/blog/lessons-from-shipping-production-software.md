---
title: "What I Learned Shipping a Serverless Platform to 1,200 Users"
description: "Field notes from running Nabodigonto — a Cloudflare Workers platform for a Bangladeshi welfare organization — at production scale."
date: "2026-03-04"
tags:
  - Cloudflare Workers
  - Edge
  - Production
  - Engineering
draft: false
---

In December 2024, I shipped a community platform for Nabodigonto Social Welfare Organization — a small NGO in Bangladesh — and was elected IT Secretary to run it. Nine months later, the platform handles about 1,200 active members, manages a real treasury, and runs on Cloudflare Workers at the edge. This is what I learned that no tutorial could have taught me.

## The architecture nobody recommends

The conventional wisdom for a non-profit CRUD app is: pick a Rails template, deploy to Heroku, call it done. I did something different because the constraints were real.

- **Latency matters.** Members are on 3G in Gazipur. A round trip to us-east-1 is half a second I cannot afford.
- **Cost matters.** The organization is small. A monthly bill above $20 is a budget conversation I want to avoid.
- **Maintenance matters.** I am one person with a degree to finish. I cannot be on call.

Cloudflare Workers solved all three. Pages render from the edge, KV and R2 store data cheaply, and the runtime cost at this scale is effectively zero. The trade-off was losing the comfort of long-lived processes and a relational database — but for a CRUD app with three write paths and a treasury report, that was the right trade.

## The Blind Audit Protocol

The non-obvious feature is what I call the Blind Audit Protocol. The platform tracks monthly dues, donations, and expenses. If a regular member can see the running balance, a single dishonest treasurer can quietly siphon funds before anyone notices. So the platform does not show the running balance to anyone until **two officers have signed the period**.

```ts
async function canRevealLedger(periodId: string) {
  const signatures = await db.periodSignatures.findMany({ where: { periodId } })
  return signatures.length >= 2 && signatures.every((s) => s.verifiedAt !== null)
}
```

It is the simplest possible primitive — count the signatures — and it is the single most important line of code in the system. The lesson for me was that **security primitives often look boring**. The drama is in what they prevent, not what they do.

## Edge databases are a real constraint

I started on Cloudflare D1 (SQLite at the edge) and eventually moved most writes to Neon Postgres with HTTP transport. D1 was great for reads — sub-millisecond, replicated everywhere. For writes it was a bottleneck because of the per-database write rate limits. Neon turned out to be the right fit because it gives me a real transactional database with edge-friendly latency, and the operational story is far simpler than running my own.

The lesson: **edge databases are not interchangeable.** Pick the one that matches your read/write shape, not the one with the best marketing page.

## What broke

Three things, in order of importance:

1. **A malformed CSV import** wiped out six months of attendance records. Restoring from the nightly R2 snapshot took ninety minutes and a great deal of humility. I now write defensive imports and snapshot before every bulk operation.
2. **A Cloudflare Workers script exceeded the 10ms CPU limit** during a routine monthly report. The fix was to chunk the aggregation and use `ctx.waitUntil` to keep the response fast. I now measure CPU time in the dev console for anything that walks more than a thousand rows.
3. **A user reported that the mobile ID card flipped the wrong way on iOS Safari.** A prefixed `transform-style: preserve-3d` solved it. Cross-browser CSS is a permanent tax; accept it.

## The thing about shipping

The unglamorous truth about shipping is that the platform you launch is not the platform you finish. Nabodigonto in March 2026 looks almost nothing like the version I deployed in December 2024. The version in December 2025 will look almost nothing like the one in March 2026. The discipline that has mattered most is not cleverness or taste — it is keeping the change log honest, writing down the things that broke, and treating the bug tracker as a record of learning rather than a record of failure.

If you are a student engineer reading this: ship something. Anything. The first version will be wrong in ways you cannot predict, and that is the entire point. The only way to learn the things I have written about here is to have a system with real users who notice when it breaks.
