# PROJECT_CONTEXT.md — Md. Shourov Portfolio Codebase

> **Last Updated:** 2026-11-15  
> **Application Type:** Content-Driven Full-Stack Web Application (Personal Engineering Portfolio & Technical Blog)  
> **Canonical Domain:** `https://mdshourov.vercel.app`  
> **Primary Maintainer:** Md. Shourov (`Shourov735`) — Software Engineering Student at IIT, University of Dhaka (IIT DU)

---

## 1. Overview & Core Entry Points

This repository powers the personal portfolio, engineering case studies, and technical blog of Md. Shourov. It is engineered with a strict **Content-Driven Architecture** where presentation components are fully decoupled from domain data, maintaining high performance, strict accessibility (WCAG 2.1 AA), and verified recruiter-friendly narratives without marketing hype.

### Core Entry Points
- **App Shell & Metadata Layout:** [`app/layout.tsx`](file:///home/shourov/Projects/portfolio/app/layout.tsx) — Root HTML structure, fonts (Inter & JetBrains Mono), JSON-LD schemas, header/footer, and analytics.
- **Homepage:** [`app/page.tsx`](file:///home/shourov/Projects/portfolio/app/page.tsx) — Ordered narrative flow: Hero -> Stats -> Spotlight -> Projects -> Looking -> Skills -> About -> Education -> Writing -> Now -> Resume -> Contact.
- **Dynamic Project Case Studies:** [`app/projects/[slug]/page.tsx`](file:///home/shourov/Projects/portfolio/app/projects/[slug]/page.tsx) — Static pre-rendering (SSG) of 11 project case studies with Architecture Decision Records (ADRs) and interactive previews.
- **Dynamic Technical Blog:** [`app/blog/[slug]/page.tsx`](file:///home/shourov/Projects/portfolio/app/blog/[slug]/page.tsx) — Markdown-powered article reader with reading time, table of contents, and custom engineering callouts.
- **Contact API Route:** [`app/api/contact/route.ts`](file:///home/shourov/Projects/portfolio/app/api/contact/route.ts) — Serverless endpoint validating Cloudflare Turnstile tokens and forwarding verified submissions to Discord/webhooks.
- **Instant Search Indexing API:** [`app/api/indexnow/route.ts`](file:///home/shourov/Projects/portfolio/app/api/indexnow/route.ts) — IndexNow protocol endpoint for automated search engine submission (Bing/Yandex).

---

## 2. Tech Stack & Key Dependencies

- **Language & Runtime:** TypeScript 5 (`strict: true`), Node.js (ES2017+ target, `moduleResolution: "bundler"`).
- **Framework:** Next.js 16.2.11 (App Router with Turbopack, static site generation via `generateStaticParams()`).
- **UI Library:** React 19.2.4 & React DOM 19.2.4.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss: ^4`, `tailwindcss: ^4`) with semantic CSS tokens in [`app/globals.css`](file:///home/shourov/Projects/portfolio/app/globals.css).
- **Animation:** Framer Motion 12.42.2 (`ScrollReveal` component respecting `prefers-reduced-motion`).
- **Icons:** React Icons 5.7.0 (`react-icons`).
- **Content & Markdown Processing:** `gray-matter` (4.0.3), `react-markdown` (10.1.0), `remark-gfm` (4.0.1).
- **Bot Protection & Security:** Cloudflare Turnstile bot verification (`lib/turnstile.ts`).
- **Telemetry & Monitoring:** `@vercel/analytics` (2.0.1).
- **Linting & Code Quality:** ESLint 9 (`eslint-config-next: 16.2.11`), Prettier 3.9.6.

---

## 3. Architecture & Data Flow

```text
       ┌──────────────────────────────┐
       │      data/content.json       │  (Central Single Source of Truth)
       │      content/blog/*.md       │  (Technical Articles Frontmatter & Content)
       └──────────────┬───────────────┘
                      │
       ┌──────────────▼───────────────┐
       │   lib/content.ts, blog.ts    │  (Typed Loaders, Slugifiers, Aggregators)
       │         lib/types.ts         │  (Strict TypeScript Contracts)
       └──────┬───────────────┬───────┘
              │               │
┌─────────────▼─────┐   ┌─────▼─────────────────────────┐
│  app/page.tsx     │   │ app/projects/[slug]/page.tsx  │
│  (Landing Page)   │   │ app/blog/[slug]/page.tsx      │
└───────────────────┘   │ (generateStaticParams SSG)    │
                        └───────────────────────────────┘
```

1. **Content Ingestion & Separation:** Raw content is stored strictly in [`data/content.json`](file:///home/shourov/Projects/portfolio/data/content.json) and markdown files in [`content/blog/`](file:///home/shourov/Projects/portfolio/content/blog). Presentation components never hardcode copy or project details.
2. **Server-Side Type Hydration:** [`lib/content.ts`](file:///home/shourov/Projects/portfolio/lib/content.ts) and [`lib/blog.ts`](file:///home/shourov/Projects/portfolio/lib/blog.ts) expose typed accessors (`getContent()`, `getProject()`, `getAllPosts()`, `getPostBySlug()`).
3. **Static Pre-Rendering (SSG):** Dynamic pages implement `generateStaticParams()` to generate all static HTML at build time for optimal performance and SEO.
4. **Dynamic OpenGraph Edge Generation:** Dynamic OG cards are generated at the edge using `@vercel/og` via [`opengraph-image.tsx`](file:///home/shourov/Projects/portfolio/app/opengraph-image.tsx) routes.
5. **Contact Ingestion Pipeline:**
   `Form Submit` -> `POST /api/contact` -> Verify Cloudflare Turnstile token via Cloudflare Siteverify -> Honeypot check -> Dispatch structured payload to `CONTACT_WEBHOOK_URL` (Discord or webhook).

---

## 4. Annotated Project Structure

```text
.
├── .env.example                       # Environment variable templates and testing keys
├── AGENTS.md                          # Mandatory rules, invariants, and guidelines for AI agents
├── README.md                          # Repository overview and setup guide
├── app/                               # Next.js App Router root
│   ├── api/                           # Serverless API endpoints
│   │   ├── contact/route.ts           # Contact form handler (Turnstile + webhook dispatcher)
│   │   └── indexnow/route.ts          # IndexNow endpoint for instant search indexing
│   ├── blog/                          # Technical blog pages
│   │   ├── [slug]/                    # Individual article route
│   │   │   ├── opengraph-image.tsx    # Edge-generated OG preview card for blog articles
│   │   │   └── page.tsx               # Markdown reader with TOC and engineering callouts
│   │   └── page.tsx                   # Blog catalog with search and tag filters
│   ├── projects/[slug]/               # Project case studies
│   │   ├── opengraph-image.tsx        # Edge-generated OG preview card for project case studies
│   │   └── page.tsx                   # Case study detail page with ADRs and interactive previews
│   ├── globals.css                    # Tailwind CSS v4 directives and CSS variable design tokens
│   ├── layout.tsx                     # Root HTML shell, fonts, JSON-LD schemas, global nav/footer
│   ├── not-found.tsx                  # Custom 404 page
│   ├── opengraph-image.tsx            # Root edge OG image generator for homepage
│   ├── page.tsx                       # Single-page portfolio landing layout
│   ├── robots.ts                      # Dynamic robots.txt configuration
│   └── sitemap.ts                     # Dynamic XML sitemap generator
├── assets/resume/                     # Canonical resume artifacts
│   ├── Md-Shourov-Resume.pdf          # Precompiled downloadable PDF resume
│   └── resume.html                    # Source HTML resume with print stylesheets
├── components/                        # UI presentation components
│   ├── blog/                          # Blog components (post-card, reading-progress, related-posts)
│   ├── case-study/                    # Case study components (spec-header)
│   ├── previews/                      # Interactive architecture previews (Nabodigonto, InsideJibon, ARVAANA)
│   ├── reading/                       # Reading layout utilities (code-block, table-of-contents, tradeoff-matrix)
│   ├── about.tsx                      # Engineering philosophy, tenets, and IIT DU foundation
│   ├── algorithmic-proof-bento.tsx    # Competitive programming verification bento
│   ├── back-to-top.tsx                # Accessible scroll-to-top button
│   ├── border-glow.tsx                # Subtle hover glow container
│   ├── breadcrumbs.tsx                # Breadcrumb navigation with schema metadata
│   ├── command-palette.tsx            # Keyboard-driven command palette (Cmd+K / Ctrl+K)
│   ├── contact.tsx                    # Contact form with Turnstile integration
│   ├── currently-looking.tsx          # Recruiter target roles banner (Internship / Junior)
│   ├── education.tsx                  # BSSE IIT DU, HSC, and admission merit table
│   ├── footer.tsx                     # Global footer with social links and live status
│   ├── header.tsx                     # Sticky header navigation and theme switcher
│   ├── hero.tsx                       # Hero section with intro and CTA links
│   ├── logo.tsx                       # Brand mark SVG component
│   ├── notes.tsx                      # Short technical engineering notes
│   ├── now-learning.tsx               # Current active study topics (OS, DBMS, concurrency)
│   ├── projects.tsx                   # Searchable and filterable 11-project directory
│   ├── resume-cta.tsx                 # Downloadable resume CTA section
│   ├── scroll-reveal.tsx              # Framer Motion scroll animation wrapper
│   ├── skip-link.tsx                  # Accessibility skip-link
│   ├── skills.tsx                     # 3-tier qualitative skills matrix
│   ├── spotlight.tsx                  # Flagship systems showcase (Nabodigonto, InsideJibon)
│   ├── stats-band.tsx                 # Verified statistics bar (150+ solved, 11 projects)
│   └── theme-provider.tsx             # Dark/light theme context provider
├── content/blog/                      # 9 technical markdown posts with frontmatter
├── data/
│   └── content.json                   # Central single source of truth for portfolio data
├── docs/
│   └── BRAND_IDENTITY.md              # Visual brand identity standards and color guidelines
├── lib/                               # Core libraries and server-side utilities
│   ├── blog-utils.ts                  # Shared slugifier and string formatting helpers
│   ├── blog.ts                        # Server-only markdown parser, metadata extractor, tag aggregator
│   ├── content.ts                     # Typed accessor functions for data/content.json
│   ├── indexnow.ts                    # IndexNow API dispatcher
│   ├── jsonld.ts                      # Schema.org structured data generators (Person, WebSite, Article)
│   ├── search-index.ts                # Command palette client search index generator
│   ├── site.ts                        # Canonical URL constants and author metadata
│   ├── turnstile.ts                   # Cloudflare Turnstile token validation utility
│   └── types.ts                       # TypeScript interfaces for all content and domain models
├── public/                            # Static web assets
│   ├── assets/images/                 # Optimized project screenshots and profile assets
│   ├── assets/resume/                 # Public resume mirrors (HTML and PDF)
│   ├── brand/                         # Vector brand marks and wordmarks
│   ├── llms.txt                       # Machine-readable profile summary for external LLMs
│   └── site.webmanifest               # Progressive Web App manifest
├── scripts/
│   └── submit-indexnow.mjs            # CLI script to submit URLs to IndexNow
├── next.config.ts                     # NextConfig (redirects, remote image patterns, package optimizations)
├── package.json                       # Scripts and dependency declarations
├── postcss.config.mjs                 # PostCSS configuration for Tailwind CSS v4
└── tsconfig.json                      # TypeScript compiler configuration with `@/*` alias
```

---

## 5. Core Data Models & API Surface

### Domain Models ([`lib/types.ts`](file:///home/shourov/Projects/portfolio/lib/types.ts))
- **`PortfolioContent`**: Root configuration object holding `stats`, `skills`, `featuredProject`, `projects`, `notes`, `now`, `education`, `lookingFor`, `faq`, and `testimonials`.
- **`Project`**: Represents each showcased project. Key fields: `title`, `slug`, `summary`, `category`, `tags`, `links`, `role`, `problem`, `technicalApproach`, `challenges`, `keyDecisions`, `result`, `visualEvidence`, `adrs`.
- **`SkillGroup` & `Skill`**: Qualitative skill categorization grouped strictly into **Primary**, **Working Knowledge**, and **Familiar** (no numerical percentages).
- **`EducationItem` & `EducationResult`**: Academic background (BSSE at IIT DU, HSC) and admission test rankings.
- **`BlogPost` & `BlogPostSummary`**: Markdown blog metadata: `title`, `slug`, `description`, `date`, `tags`, `readingTime`, `wordCount`, `content`, `relatedProjectSlug`.
- **`ArchitectureDecision` (ADR)**: Structured decisions inside case studies: `decision`, `rejected`, `rationale`, `tradeOff`.

### API Endpoints
- **`POST /api/contact`** ([`app/api/contact/route.ts`](file:///home/shourov/Projects/portfolio/app/api/contact/route.ts))
  - **Auth / Verification:** Cloudflare Turnstile token verification (`lib/turnstile.ts`).
  - **Function:** Validates input lengths and email format, screens honeypot field (`website`), verifies Turnstile token, and sends structured JSON/Discord message to `CONTACT_WEBHOOK_URL`.
- **`POST /api/indexnow`** ([`app/api/indexnow/route.ts`](file:///home/shourov/Projects/portfolio/app/api/indexnow/route.ts))
  - **Auth:** Optional `INDEXNOW_SECRET` or `CRON_SECRET` Bearer header or URL key.
  - **Function:** Aggregates canonical URLs for all projects and articles, submitting them to the IndexNow protocol. Supports `GET` for Vercel Cron invocation.

---

## 6. Coding Conventions & Project Rules

1. **Path Aliasing:** Use `@/*` for imports mapping to the root directory (e.g. `@/components/hero`, `@/lib/content`, `@/data/content.json`).
2. **Strict Factual Invariants (Mandatory):**
   - **Full Name:** `Md. Shourov` (never use nicknames or alternative spellings in official metadata).
   - **GitHub Profile:** `https://github.com/Shourov735`.
   - **Canonical Domain:** `https://mdshourov.vercel.app` (never use `shourov735.vercel.app`).
   - **Education:** B.Sc. in Software Engineering (BSSE), Institute of Information Technology (IIT), University of Dhaka (IIT DU), 2024 – Present.
   - **Problem Solving Metric:** Strictly **150+ problems solved** (never claim 1500+ or exaggerated figures).
   - **Project Directory Count:** Exactly **11 projects** matching [`data/content.json`](file:///home/shourov/Projects/portfolio/data/content.json).
   - **Skill Tiers:** Strictly 3 qualitative tiers (**Primary**, **Working Knowledge**, **Familiar**); never use percentage bars.
   - **Flagship Project:** **Nabodigonto** (100k+ LOC non-profit monorepo platform; Md. Shourov engineered edge services and serves as IT Secretary).
   - **Zero Fabrication Policy:** Never invent cryptographic primitives, fake protocols, unverified benchmarks, or fake metrics.
3. **Single Source of Truth (SSoT):**
   - Never hardcode domain copy, project details, or statistics in React components. Update [`data/content.json`](file:///home/shourov/Projects/portfolio/data/content.json) instead.
   - When modifying [`data/content.json`](file:///home/shourov/Projects/portfolio/data/content.json), synchronize TypeScript contracts in [`lib/types.ts`](file:///home/shourov/Projects/portfolio/lib/types.ts).
4. **Styling & Theming:**
   - Always use semantic CSS variable tokens (e.g. `var(--color-bg)`, `var(--color-surface)`, `var(--color-primary)`, `var(--color-text)`).
   - Ensure both light and dark themes maintain WCAG 2.1 AA color contrast.
5. **Environment Variables (Names only):**
   - `CONTACT_WEBHOOK_URL`: Optional Discord/Slack webhook URL for form notifications.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Public client-side Turnstile site key.
   - `TURNSTILE_SECRET_KEY` / `TURNSTILE_SECRET`: Server-side secret key for Turnstile siteverify.
   - `TURNSTILE_HOSTNAMES`: Optional comma-separated list of allowed hostnames.
   - `INDEXNOW_SECRET` / `CRON_SECRET`: Optional authorization secret for `/api/indexnow`.

---

## 7. Common Commands

```bash
# Install dependencies
npm install

# Start local development server with Turbopack (http://localhost:3000)
npm run dev

# Build production application (Next.js SSG + Serverless bundle)
npm run build

# Start production server
npm run start

# Run ESLint checks
npm run lint

# Format codebase with Prettier
npm run format

# Verify formatting without modifying files
npm run format:check

# Submit canonical URLs to IndexNow
npm run indexnow

# Generate PDF resume from public/assets/resume/resume.html using headless Chrome
npm run build:resume
```

---

## 8. Instructions for External AI

- Reference the exact file paths and import aliases defined in this document.
- Follow the existing tech stack, validation libraries, and error-handling conventions.
- If you need to inspect the full code of any specific file listed in the project tree before proposing changes, ask the user to provide that file by its exact path.
