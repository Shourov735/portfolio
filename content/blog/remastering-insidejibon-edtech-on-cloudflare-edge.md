---
title: "Remastering InsideJibon: Building a $0-Subscription EdTech Engine on Cloudflare Edge"
metaTitle: "InsideJibon: $0 EdTech on Cloudflare Edge"
description: "How I re-architected InsideJibon with Cloudflare Durable Objects, Workers AI caption RAG, and a zero-egress video pipeline under a $0/month constraint."
date: "2026-09-26"
tags:
  - Projects
  - Architecture
  - Cloudflare Workers
  - Next.js
  - AI
  - Edge
draft: false
---

Earlier this year, I built the initial version of [**InsideJibon**](https://insidejibon.shourov.workers.dev) — an educational web platform tailored for Bangladeshi educators and students. It had the standard LMS features: course listings, video lecture playback, timed quizzes, and bilingual (English/Bengali) UI text.

It worked. But as real students began using it, the limitations of an MVP prototype became glaringly clear. 

Students would watch a video, get stuck on a mathematical derivation, and leave the app to ask on Facebook groups. Live classes forced teachers to drop Zoom links into WhatsApp chats. Exams were vulnerable to simple browser tab-switching. Worst of all, the prospect of scaling video hosting and live streaming threatened to rack up hundreds of dollars in monthly bills for cloud egress and transcode pipelines — an expense that neither a grassroots educator nor a student engineer can absorb.

Over the past few weeks, I undertook a massive, comprehensive remaster of InsideJibon. Across 469 files and more than 75,000 lines of code, I re-engineered the platform from the ground up into a high-performance, masterclass learning environment. 

Here is the architectural blueprint of how I pulled it off on Cloudflare's serverless edge, maintaining an absolute **$0/month subscription cost invariant** across every layer.

---

## 1. The North Star & The $0 Invariant

The engineering goal for the remaster was defined by a single thesis:

> *A Bangladeshi student should be able to go from "I have an exam in 6 weeks" to "I am top of my class" without ever leaving InsideJibon — attending live classes, asking doubt questions, taking proctored mock exams, building daily study streaks, and having their parents monitor their progress — all on a lightning-fast, Bangla-first edge platform.*

And the primary operational constraint: **$0/month in SaaS subscriptions.**

```
+-----------------------------------------------------------------------+
|                 InsideJibon $0-Subscription Stack                      |
|                                                                       |
|  Edge Compute      : Next.js 16 App Router on Cloudflare Workers       |
|  Relational DB     : Neon Serverless Postgres via Drizzle (neon-http) |
|  Real-Time State   : Cloudflare Durable Objects (WebSockets)          |
|  Edge Caching/KV   : Cloudflare Cache API & Workers KV                |
|  Semantic Search   : Cloudflare Vectorize (Index: lessons_v1)         |
|  AI Inference      : Workers AI (@cf/baai/bge, @cf/m2m100, llama)     |
|  Transactional Mail: Cloudflare Email Service (env.email.send())      |
|  Video Delivery    : YouTube Unlisted IFrame via youtube-nocookie     |
+-----------------------------------------------------------------------+
```

Every technology decision was made to honor this boundary. We replaced Resend/Postmark with native Cloudflare Email routing, replaced Pusher/Ably with Cloudflare Durable Objects, replaced Pinecone with Vectorize, and solved the single most expensive problem in EdTech — video bandwidth — without paying a single cent for egress.

---

## 2. The $0 Video Pipeline: YouTube-First Architecture

Video bandwidth is the death of bootstrapped EdTech startups. Serving hundreds of hours of 1080p video directly from AWS S3 or Cloudflare Stream quickly accumulates prohibitive costs.

Instead of renting an expensive video encoding and delivery cloud, I designed a **YouTube-First streaming pipeline**:

1. **Unlisted Embed Stage**: Instructors upload lesson videos to YouTube as *Unlisted* and paste the link into the InsideJibon course builder.
2. **Server-Side Validation without API Keys**: When a link is submitted, our Worker queries YouTube's public oEmbed endpoint (`https://www.youtube.com/oembed?url=...`). This confirms the video exists, extracts its canonical title, author, and thumbnail, and rejects private or broken links — completely free and without requiring Google API credentials or quota consumption.
3. **Privacy-Preserving Embeds**: Videos are served to enrolled students via `youtube-nocookie.com`.
4. **Stateful Progress Synchronization**: A custom React player wraps the YouTube IFrame API, debouncing playback position every 5 seconds to our Neon database. When a student pauses or resumes on another device, their progress is preserved. Reaching 90% playback triggers an automated lesson completion event and emits experience points (XP).

By utilizing YouTube’s global CDN as our delivery engine, bandwidth and transcode costs dropped to exactly zero.

---

## 3. Real-Time Live Classrooms with Durable Objects

In most LMS setups, "live classes" are just an embedded Zoom or Google Meet iframe. Students lose the context of their notes, chat messages disappear into third-party silos, and teachers have no automated attendance records.

To solve this natively, I built an interactive classroom powered by a custom **Cloudflare Durable Object** (`ClassroomRoom`):

```
+----------------------------------------------------------------------------+
|                          ClassroomRoom Durable Object                      |
|                                                                            |
|  +--------------------+     WebSocket     +-----------------------------+  |
|  | Student Clients    | <===============> | Presence & Heartbeat Engine |  |
|  +--------------------+                   +-----------------------------+  |
|                                                          |                 |
|  +--------------------+     WebSocket     +-----------------------------+  |
|  | Teacher Controls   | <===============> | Moderation & Stage Manager  |  |
|  +--------------------+                   +-----------------------------+  |
|                                                          |                 |
|  +----------------------------------------------------------------------+  |
|  | SQLite Storage: Active Chat Ledger, Hand Raises, Attendance Log      |  |
|  +----------------------------------------------------------------------+  |
+----------------------------------------------------------------------------+
                                     | (Session End)
                                     v
                        Neon PostgreSQL (class_attendance)
```

Each live session instantiates an isolated `ClassroomRoom` actor running at the Cloudflare edge close to the teacher.

### What the Durable Object Manages:
- **WebSocket Presence**: Real-time join/leave tracking with heartbeat pings every 30 seconds.
- **Moderated In-App Chat**: Threaded student questions, emoji reactions, and instant teacher moderation (mute, delete, pin).
- **Hand-Raising Queue**: Students click a button to raise their hand; the teacher receives an ordered queue on their stage controls.
- **Automated Attendance**: The DO accumulates exact join and leave timestamps inside its colocated edge SQLite storage. When the teacher ends the class, a single batch query synchronizes the attendance records to our primary Neon Postgres database.
- **Synchronized Broadcast Stage**: For video, the teacher broadcasts via an unlisted YouTube Live stream. The DO distributes the video ID to all connected students. The student watches the stream in-app while interacting through the low-latency DO WebSocket rail.
- **Replay with Live Chat Sync**: When the stream ends, YouTube reuses the live video ID for the archived VOD. The DO's chat ledger is preserved so students watching the replay see questions appear at the exact second they were originally asked.

---

## 4. In-House AI Tutor: Workers AI + Vectorize RAG

Students learning complex scientific topics often struggle late at night when teachers are unavailable. However, connecting an application to OpenAI or Anthropic APIs carries continuous token costs that scale linearly with active students.

To deliver an always-available tutor within our $0 commitment, I built a Retrieval-Augmented Generation (RAG) pipeline entirely on Cloudflare's free tiers:

```
[Teacher Publishes Lesson]
          |
          v
[Fetch YouTube TimedText Captions (No API Key)]
          |
          v
[Semantic Chunking (300-token windows + 50-token overlap)]
          |
          v
[Workers AI: @cf/baai/bge-base-en-v1.5] ──> [Vectorize Index: lessons_v1]
```

When an enrolled student asks a question:

```
[Student Prompt (Bangla or English)]
          |
          v
[Language Detection & Translation via @cf/m2m100-1.2b]
          |
          v
[Vector Search in Vectorize (course_id scoped)]
          |
          v
[Workers AI Inference with Lesson Context]
          |
          v
[Response with Exact-Second Video Citation (?start=142s)]
```

### Key Engineering Details:
- **Zero-Key Ingestion**: When a lesson is published, an asynchronous background job fetches auto-captions directly from YouTube's public `timedtext` API, parsing raw XML into timestamped transcript segments.
- **Cross-Lingual Retrieval**: If a student asks in Bengali, `@cf/m2m100-1.2b` translates the query to English for optimal semantic vector matching against the captions. The synthesized answer is then translated back to natural Bengali.
- **Actionable Citations**: Hallucinations are strictly penalized. The tutor is prompted to answer only from retrieved lesson chunks and must provide timestamp citations. Clicking a citation jumps the video player to the exact second where the instructor explained that concept.
- **Budget Guards**: Enforced via sliding-window rate limiters in Workers KV (maximum 20 queries per student per day) to ensure the platform operates within the free 10,000 Neurons/day allowance.

---

## 5. Gamification Loop: XP, Streaks & Weekly Leagues

Retention in self-paced online education is notoriously low. To keep students engaged daily, I built a Duolingo-style gamification engine:

1. **Declarative XP Ledger**: An immutable `xp_events` table captures every meaningful academic action: completing a lesson (+15 XP), acing a quiz (+50 XP), submitting an assignment on time (+30 XP), or answering a peer's question in the doubt forum (+10 XP).
2. **Daily Streaks with Freezes**: A daily cron checks student activity. Missing a day consumes a "Streak Freeze" (awarded once per week). If no freeze is available, students can complete a streak repair challenge within 24 hours.
3. **Automated League Cohorts**: Students are grouped into 30-person weekly cohorts across Bronze, Silver, Gold, and Diamond leagues. A scheduled Workers Cron Trigger runs every Sunday at midnight, promoting the top 20% and relegating the bottom 10%.
4. **Canvas Micro-Celebrations**: To avoid pulling in multi-megabyte animation dependencies, I wrote a lightweight, zero-dependency HTML5 canvas confetti engine (`CelebrationOverlay`) that renders 60 FPS confetti bursts when leveling up or hitting streak milestones.

---

## 6. Performance Engineering & Database Hardening

Running Next.js on Cloudflare Workers edge runtime requires strict discipline around memory and database connections. During phase R0, I executed a series of critical performance sweeps:

### 1. The `SELECT *` Elimination Sweep
In serverless environments, fetching unneeded columns wastes memory, CPU parsing time, and network bandwidth. I refactored all 13 service files from broad `db.select().from(table)` queries to explicit column projections:

```ts
// Before: Pulled full JSONB columns, timestamps, and unused foreign keys
const lessons = await db.select().from(lessonsTable).where(eq(lessonsTable.courseId, courseId))

// After: Explicitly projecting only what the student directory needs
const lessons = await db
  .select({
    id: lessonsTable.id,
    title: lessonsTable.title,
    durationS: lessonsTable.durationS,
    videoProvider: lessonsTable.videoProvider,
    isPublished: lessonsTable.isPublished,
  })
  .from(lessonsTable)
  .where(eq(lessonsTable.courseId, courseId))
```

This reduced edge response payloads by up to 60% and noticeably lowered cold-start latency.

### 2. Edge Caching with Surrogate Tags
Using the native Cloudflare Cache API (`caches.default`), public marketing pages and course catalog listings are cached at edge POPs globally. 

When an instructor edits a course curriculum or updates pricing, our cache invalidation service (`invalidateTags`) emits cache purge tags, immediately evicting stale edge entries while leaving the rest of the cache warm.

### 3. Request Deduplication & Webhook Gates
Network retries and double-clicks can create ghost enrollments or duplicated XP. I introduced an edge `request_dedupe` table leveraging Postgres unique compound indexes over `(user_id, action_kind, time_bucket)`. Any replayed mutation within a 10-minute window safely returns the original response without executing duplicate database writes.

---

## 7. Local Market Realities: bKash & WhatsApp

Building for Bangladesh means acknowledging local user behavior rather than imposing Western checkout flows.

While I engineered complete data models for bKash tokenized payments, course bundles, and automated receipts (`IJ-YYYY-NNNNNN`), real-world testing showed that many students still prefer direct, conversational confirmation with their instructor.

To support both:
- Built a **manual bKash verification workflow** with receipt uploads and administrative approval queues.
- Built a direct **WhatsApp Concierge Enrollment Flow**: Clicking "Enroll via WhatsApp" automatically generates a pre-filled, encrypted payload containing the student's ID, course slug, and timestamp, opening an instant chat with the teacher. 

Once the instructor verifies the payment, a single click approves the student, automatically provisioning their access and firing a welcome email.

---

## 8. Design System 2.0: Academic Modernism

The visual identity of InsideJibon was completely overhauled to align with what I call **Academic Modernism**:

- **Role-Scoped Accents**: Rather than overwhelming the user with arbitrary colors, each role gets an intentional semantic accent: Emerald for Students, Indigo for Teachers, Slate for Admins, and Rose for Parents.
- **First-Class Bengali Typography**: Implemented Google Fonts' `Hind Siliguri` and `Noto Sans Bengali` with `font-display: swap` and precise line-height normalization to prevent layout shifts when switching between Bengali and English.
- **Universal ⌘K Command Palette**: A keyboard-first command center enabling students and teachers to jump to any course, search doubts, toggle dark mode, or switch languages in under three keystrokes.
- **2,100+ Bilingual i18n Keys**: Maintained strict 1:1 symmetry between English and Bengali dictionaries, verified by automated pre-commit scripts.

---

## 9. Battle Scars: 4 Production Gotchas and Fixes

Shipping this architecture taught me several hard lessons that you won't find in framework documentation:

### 1. OpenNext Durable Object Bundling
`@opennextjs/cloudflare` by default only exports its internal Durable Objects (for incremental static regeneration and queue tags). Our custom `ClassroomRoom` DO was omitted from the generated `.open-next/worker.js`, causing Cloudflare to reject deployments with missing binding errors.
*The Fix:* I authored a custom post-build script (`build-classroom-room.mjs`) that compiles the DO from source with esbuild, stubs unresolvable Node server-only packages, and splices the export directly into the final worker bundle.

### 2. PostgreSQL STABLE vs. IMMUTABLE Index Trap
To deduplicate payment attempts in 10-minute windows, I initially wrote a unique index using `floor(extract(epoch from created_at)/600)`. PostgreSQL refused to create the index because `extract()` over `timestamptz` is only `STABLE` (due to timezone variability), not `IMMUTABLE`.
*The Fix:* Switched to `date_bin(interval '10 minutes', created_at, '2000-01-01')`, which is strictly immutable and allowed the unique index to compile cleanly.

### 3. Invalid SQL Grouping in Serverless Crons
A weekly leaderboard aggregation query selected `courses.id` alongside `MAX(xp)` without an explicit `GROUP BY courses.id`. On local SQLite this passed quietly, but Neon's strict PostgreSQL engine rejected the query with 500 errors. 
*The Fix:* Rewrote the leaderboard generator into explicit Common Table Expressions (CTEs) with strict group keys, validated directly against live production schemas.

### 4. Cloudflare Cron Weekday Numbering
Cloudflare Workers Cron Triggers use `1–7` for days of the week where `1 = Sunday`, differing from standard Linux cron syntax (`0 = Sunday`). A scheduled Sunday league promotion cron was running on Monday morning until I corrected the expression syntax in `wrangler.jsonc`.

---

## 10. Summary

The InsideJibon remaster proved something important: you do not need enterprise venture funding or expensive third-party SaaS stacks to build a high-performance, real-time, AI-augmented educational platform.

By deeply understanding edge primitives — Cloudflare Workers, Durable Objects, Vectorize, and Workers AI — and respecting the practical constraints of emerging markets, a solo student engineer can deliver software that rivals multi-million dollar platforms.

The complete codebase is open and documented on [GitHub](https://github.com/Shourov735/InsideJibon), and the live platform is accessible at [insidejibon.shourov.workers.dev](https://insidejibon.shourov.workers.dev).
