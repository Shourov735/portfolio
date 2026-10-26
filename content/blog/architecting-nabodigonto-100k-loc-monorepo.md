---
title: "Architecting Nabodigonto: Scaling a Production Community Platform to a 100k+ LOC Monorepo"
metaTitle: "Architecting Nabodigonto: 100k+ LOC Monorepo"
description: "How I structured Nabodigonto into a fault-isolated Turborepo with separate public and portal frontends, Cloudflare Workers API, and shared type contracts."
date: "2026-08-15"
tags:
  - Projects
  - Architecture
  - Cloudflare Workers
  - TypeScript
  - Next.js
draft: false
relatedProjectSlug: "nabodigonto"
---

In late 2024, I set out to build the core digital platform for **Nabodigonto Social Welfare Organization** — a registered grassroots non-profit in Bangladesh operating community welfare programs, emergency blood donation coordination, student scholarships, and mutual aid funds. Following the initial architecture and launch of the platform, the executive board appointed me as **IT Secretary** to oversee the organization's technology roadmap, infrastructure, and ongoing engineering.

What began as an MVP web app eventually expanded into an ecosystem managing hundreds of active members, digital PVC-style membership IDs with dynamic verification, monthly dues tracking, dual-admin treasury reconciliation, and automated notifications.

Today, Nabodigonto spans more than **100,000 lines of TypeScript across a Turborepo monorepo**. This article is the first of a three-part technical series breaking down the real architectural decisions, operational trade-offs, and lessons learned from engineering this system for edge deployment.

---

## 1. The Trap of the All-in-One Monolith

When starting a community platform, the instinctive approach is to build a single Next.js monolith. In an early prototype, everything lived in one project:
- Public landing page, program galleries, and blood donor contacts.
- Authenticated member and administrative dashboards.
- PDF generation for member ID cards and financial donation receipts.
- Direct database connections and background notifications.

In practice, this created three immediate problems:

1. **Bundle Bloat for Public Visitors:** Visitors arriving from mobile 3G/4G connections in rural Bangladesh just wanted to find an emergency blood donor or read an event report. Loading a heavy Next.js bundle bundled with Clerk authentication SDKs and administrative UI components resulted in unacceptable load times and high mobile data overhead.
2. **Blast Radius & Reliability:** If a memory-heavy PDF generation job or a complex accounting query spiked memory or exceeded the CPU limit, it risked bringing down or throttling the entire web instance for public visitors.
3. **Coupled Dependencies:** Updating an administrative package or changing an internal dashboard state risked regression bugs on public-facing informational pages.

To build a reliable platform that would last, I tore down the prototype and decoupled the entire codebase into a clean, modular Turborepo monorepo.

---

## 2. Monorepo Topology: Strict Fault Isolation

```
nabodigonto/
├── apps/
│   ├── web-public/          # Vite + React 19 SPA (Auth-free, lightweight, offline fallback)
│   └── web-portal/          # Next.js 16 App Router + Clerk Auth (Member & Admin portal)
├── services/
│   ├── api/                 # Hono API on Cloudflare Workers (RPC, D1/Prisma queries)
│   ├── media-service/       # Cloudflare Worker + R2 (PDF generation, font embedding)
│   └── notification-service/# Cloudflare Queues consumer (SMS, Email, WebPush, FCM)
├── packages/
│   ├── contracts/           # Shared Zod schemas & RPC route definitions
│   ├── db/                  # Prisma schema & Cloudflare D1 driver adapter
│   ├── auth/                # Clerk JWT verification middleware for edge runtime
│   ├── api-client/          # Pre-typed Hono RPC client for frontend apps
│   └── ui/                  # Shared Tailwind CSS v4 design system tokens & components
└── mobile/
    └── apps/
        └── nabodigonto-app/ # React Native companion app for field volunteers
```

### Decoupling `web-public` and `web-portal`

The most consequential design decision was splitting the frontend into two distinct applications:

- **`apps/web-public` (Vite + React 19 SPA):** 
  - Zero authentication dependencies. No Clerk SDK, no administrative state machines, and minimal runtime overhead.
  - Deployed globally at the edge with immediate cacheability.
  - Incorporates an offline JSON snapshot of verified emergency blood donors and executive contacts, cached in the browser so users can access critical contact information even when their mobile internet drops out.

- **`apps/web-portal` (Next.js 16 App Router):**
  - Dedicated entirely to authenticated experiences: member profiles, monthly dues tracking, dynamic 3D member ID cards, and the administrative accountability suite.
  - Uses Clerk for authentication with session tokens verified at the edge by `services/api`.

Because the public site and portal are independent apps, a deployment or issue in the portal has **zero impact** on the public site's availability.

---

## 3. Type-Safe Edge APIs with Hono RPC & Shared Contracts

Rather than writing traditional REST controllers with hand-rolled `fetch` calls or maintaining OpenAPI documentation that quickly drifts from reality, the backend is built on **Hono** running on Cloudflare Workers, coupled with **`packages/contracts`**.

In `packages/contracts`, we define domain validation schemas using Zod:

```ts
// packages/contracts/src/accountability.ts
import { z } from "zod"

export const StartPeriodSchema = z.object({
  periodMonth: z.string().regex(/^\d{4}-\d{2}$/, "Must be in YYYY-MM format"),
  startingBalance: z.number().nonnegative("Starting balance must be non-negative"),
  officerRole: z.enum(["FINANCE_OFFICER", "SYSTEM_ADMIN"]),
  verificationNotes: z.string().max(500).optional(),
})

export type StartPeriodInput = z.infer<typeof StartPeriodSchema>

export const ReconcilePeriodSchema = z.object({
  periodId: z.string().cuid(),
  handCashCounted: z.number().nonnegative(),
  bankBalanceVerified: z.number().nonnegative(),
  discrepancyType: z.enum(["NONE", "SURPLUS", "DEFICIT"]).default("NONE"),
  discrepancyAmount: z.number().default(0),
  justificationNotes: z.string().max(1000).optional(),
})

export type ReconcilePeriodInput = z.infer<typeof ReconcilePeriodSchema>
```

In `services/api`, the Hono router mounts these contracts directly with input validators:

```ts
// services/api/src/routes/accountability.ts
import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { StartPeriodSchema } from "@nabodigonto/contracts"
import { requireAdminAuth } from "../middleware/auth"

export const accountabilityRouter = new Hono()
  .post(
    "/period/start",
    requireAdminAuth,
    zValidator("json", StartPeriodSchema),
    async (c) => {
      const input = c.req.valid("json")
      const user = c.get("user")
      
      const result = await c.env.DB_SERVICE.recordStartingBalanceEntry({
        ...input,
        recordedBy: user.id,
      })

      return c.json(result, 200)
    }
  )
```

In the frontend applications, consuming this endpoint requires no string URLs or manual type casting:

```ts
// apps/web-portal/src/lib/api.ts
import { hc } from "hono/client"
import type { AppType } from "@nabodigonto/api"

export const api = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!)

// Inside a React component or action:
const res = await api.accountability.period.start.$post({
  json: {
    periodMonth: "2026-08",
    startingBalance: 45000,
    officerRole: "FINANCE_OFFICER",
    verificationNotes: "Physical passbook and cash register counted.",
  },
})

if (res.ok) {
  const data = await res.json()
  // data is fully typed according to the backend contract return type
}
```

If a backend route changes its parameter names, response structure, or validation rules, TypeScript flags the compile-time error across all consuming apps during `turbo build`.

---

## 4. Operational Boundaries: Independent Edge Services

Instead of packing all operational tasks into one monolithic worker, background and specialized workloads are broken into dedicated workers:

- **`services/media-service`:** An isolated worker responsible for generating PDF membership cards and monthly financial statements. It has its own Cloudflare R2 bucket binding and uses `pdf-lib` with `@pdf-lib/fontkit` to assemble vector PDFs in memory. By keeping this off the main API worker, CPU-intensive font rendering cannot starve live API requests of execution time.
- **`services/notification-service`:** A Cloudflare Queues consumer. When financial receipts, dues reminders, or emergency blood alerts are created, the API worker pushes an event payload to the queue. The notification worker processes them asynchronously, handling retries and rate-limiting across SMS gateways (OneCodeSoft) and email (Resend).

---

## 5. Key Architecture Lessons

1. **Decouple Public Pages from Auth Runtimes:** The highest traffic part of a non-profit site is often public-facing (events, emergency donor lookups, donation guidelines). Keeping authentication SDKs out of the public bundle keeps performance fast and resilient to auth provider outages.
2. **Contracts First, Implementation Second:** In a monorepo with multiple apps and services, maintaining shared validation schemas in a separate package (`packages/contracts`) eliminates an entire category of client-server serialization bugs.
3. **Small Is Safe:** Distributing workloads across specialized serverless workers ensures that failures remain localized and operational costs remain near zero.

In **Part 2**, we will dive into data storage: how we modeled the relational database on **Cloudflare D1**, handled atomic multi-table transactions with D1 batch operations, and rendered complex Bengali Unicode fonts in edge PDF workers.
