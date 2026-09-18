# AGENTS.md — AI Agent Guidelines & Engineering Standards

Welcome to the **Md. Shourov** portfolio codebase repository (`portfolio`). This file contains critical architectural principles, factual ground rules, coding conventions, and operational workflows for any AI agent or automated coding assistant working on this project.

---

## 1. Core Operating Principles for AI Agents

### 1.1 Respect My Time & Pragmatic Validation
Do **not** run expensive or unnecessary commands just for the sake of validation:
- Do **not** run `npm run build`, formatting, linting, or other expensive checks after every small change.
- For insignificant or isolated changes, use the minimum validation necessary.
- Run `format`, `lint`, and especially `build` only when they are actually relevant to the changes.
- For larger changes, structural changes, dependency changes, configuration changes, or changes that could affect the production build, run the appropriate checks.
- Use good engineering judgment rather than blindly running every check after every edit.
- The goal is to maintain correctness **without wasting development time or system resources**.

### 1.2 Commit and Push Rules
- Commit after a **substantial set of related changes** has been completed, unless explicitly asked to commit.
- Do not create unnecessary commits for tiny or insignificant changes.
- If explicitly asked to commit, follow that instruction even if the change is small.
- Keep commits meaningful and logically grouped using Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
- **Push after every commit.**

### 1.3 Consistency Is a Core Requirement
When asked to make a change in one place, do **not** assume that changing only that location is sufficient. You must identify all other parts of the portfolio that are logically associated with the change and keep them consistent.

> **Every change should be treated as a consistency problem, not merely a file-editing problem.**

For example, when adding a new project, check whether the project should also be reflected in:
- The portfolio project directory and spotlight sections.
- Project counts or statistics (e.g. stats band, hero badges).
- GitHub profile README (`Shourov735`).
- Resume/CV-related content (`assets/resume/resume.html`, `public/assets/resume/resume.html`).
- Skills or technology sections, if applicable.
- Featured projects or project lists.
- Navigation, filters, categories, or metadata.
- SEO metadata (`app/layout.tsx`, `app/sitemap.ts`, `public/llms.txt`), or structured data.
- Any other files or content that depend on the project's information.

Do not blindly modify every location. **Inspect the repository and determine which locations are actually affected.** Search for related references, duplicated information, counts, metadata, and dependent content that may now be outdated.

### 1.4 Investigate Before Adding Information
When asked to add a new project, experience, achievement, technology, link, or other factual information, do not immediately write it based only on the small amount of information provided. Gather enough information to represent it accurately:
- If a link is provided: visit and inspect the link, investigate the project/product/site carefully, and collect relevant details about its purpose, features, technologies, implementation, and deployment.
- Take screenshots or visual inspect when helpful to understand the project or verify presentation.
- Inspect relevant repository pages, documentation, live deployments, or other sources when appropriate.
- If important information is missing or cannot be reliably determined: ask for clarification; **never invent details**. Clearly distinguish verified facts from provided assumptions.

### 1.5 Before Editing, Inspect the Repository
Before implementing a non-trivial change:
1. Understand the existing project structure.
2. Find the components/files related to the requested change.
3. Search for duplicated or dependent information.
4. Check how similar existing content is implemented.
5. Identify all places that may need to remain synchronized.
6. Then implement the change consistently.

Do not make assumptions about where information belongs when the repository can answer the question.

### 1.6 Keep Information Consistent
Avoid situations where the same information appears differently in different parts of the portfolio:
- If the number of projects changes, verify every place where that number is displayed or implied.
- If a project name, URL, description, technology, status, or other important detail changes, search for other occurrences and update the relevant ones.
- Do not leave stale references behind.

### 1.7 Prefer Minimal, Targeted Changes
Make the small set of changes necessary to accomplish the requested task while preserving consistency. Consistency-related changes are not considered unrelated — if the requested change requires updates elsewhere, make those updates.

### 1.8 General Mindset
Think beyond the exact sentence of a request:
- When told *"Add X"*, interpret it as: *"Add X correctly, investigate what X is, and update every relevant part of the portfolio so the entire repository remains accurate and consistent."*
- When told *"Change X"*, interpret it as: *"Change X and identify any dependent information that must also change."*

---

## 2. Project & Tech Stack Overview

- **Framework:** Next.js 16 (App Router) using Turbopack
- **Language:** TypeScript (strict mode enabled)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 with semantic CSS variables defined in `app/globals.css`
- **Animation:** Framer Motion (`ScrollReveal` component with `prefers-reduced-motion` support)
- **Deployment:** Vercel (Edge runtime & Serverless API routes)
- **Data Model:** Content-driven architecture where domain data is completely decoupled from presentation logic

---

## 3. Absolute Factual Invariants (Strict Ground Rules)

Any agent working in this repository **must strictly preserve** these core facts. Never alter or hallucinate these values:

| Field / Claim | Invariant Standard | Notes / Disallowed Patterns |
| :--- | :--- | :--- |
| **Full Name** | **Md. Shourov** | Do not alter spelling, do not use informal nicknames in official metadata. |
| **GitHub Handle** | `Shourov735` | Always link to `https://github.com/Shourov735`. |
| **Canonical Domain** | `https://mdshourov.vercel.app` | **Never** use `shourov735.vercel.app` anywhere in SEO, metadata, sitemaps, or links. |
| **Education** | B.Sc. in Software Engineering (BSSE) | Institute of Information Technology (IIT), University of Dhaka (IIT DU), 2024 – Present. |
| **Problem Solving Metric** | **150+ problems solved** | **Strictly 150+**. Never claim 1,500+, 1500, or any exaggerated number. |
| **Project Directory Count** | Exactly **10 projects** | Never claim 12+, 15+, or numbers that contradict `data/content.json`. |
| **Skill Proficiency** | 3 Qualitative Tiers | Grouped strictly into **Primary**, **Working Knowledge**, and **Familiar**. **Never** add percentage bars (e.g. "C++ 80%") or fake numerical proficiency scores. |
| **Performance Claims** | Evidence-Driven & Qualitative | Never claim unverified benchmarks like "sub-100ms", "under 600ms", or "80% reduction" without verifiable test data. |
| **Flagship Project** | **Nabodigonto** | Real-world non-profit platform where Md. Shourov engineered the double-signed blind audit protocol and was appointed **IT Secretary**. |

---

## 4. Architecture & Content Decoupling

The portfolio follows a strict **Single Source of Truth** pattern:

```text
       ┌──────────────────────────────┐
       │      data/content.json       │  (Central Source of Truth)
       └──────────────┬───────────────┘
                      │
       ┌──────────────▼───────────────┐
       │        lib/content.ts        │  (Typed Loaders & Slugifiers)
       │         lib/types.ts         │  (Strict TypeScript Contracts)
       └──────┬───────────────┬───────┘
              │               │
┌─────────────▼─────┐   ┌─────▼──────────────────┐
│  app/page.tsx     │   │ app/projects/[slug]    │
│  (Landing Page)   │   │ generateStaticParams() │
└───────────────────┘   └────────────────────────┘
```

### Key Content Rules for Agents:
1. **Never Hardcode Content in Components:** Domain text (project titles, summaries, tags, stats, skills, education) belongs exclusively in `data/content.json`.
2. **Type Synchronization:** If modifying the structure of `data/content.json`, always update the corresponding interfaces in `lib/types.ts` simultaneously.
3. **Static Pre-Rendering (SSG):** All dynamic routes (`/projects/[slug]`, `/blog/[slug]`) must pre-render every path via `generateStaticParams()`.

---

## 5. UI, Layout & Styling Conventions

### Minimalist & Recruiter-Friendly Design
- **Engineering-First Identity:** Maintain a clean, credible, minimalist aesthetic. Avoid excessive decorative fluff, flashy emojis, or marketing buzzwords.
- **Theme Variables:** Always use CSS variable tokens (e.g. `var(--color-bg)`, `var(--color-surface)`, `var(--color-text)`, `var(--color-muted)`, `var(--color-line)`, `var(--color-primary)`, `var(--color-accent)`). Never hardcode arbitrary hex colors or break dark/light theme parity.
- **No Role Spams on Cards:** Do not display repetitive "Full-Stack Developer" subtitles under project card titles in `components/projects.tsx` or spotlight pills. Keep project cards clean; display role context inside the dedicated case study page (`/projects/[slug]`).
- **No Unnecessary Hype Banners:** Do not add badges such as "Real Organization → Real Engineering Responsibility → Production Deployment" to the spotlight. Let the actual technical description speak for itself.

### Homepage Section Sequence
The homepage (`app/page.tsx`) must preserve this recruiter-optimized scanning flow:
1. `<Hero />` — Identity, university, and core focus
2. `<StatsBand />` — Verified numbers (150+ problems, 10 projects, IIT DU)
3. `<Spotlight />` — Flagship production systems (Nabodigonto, InsideJibon)
4. `<Projects />` — Searchable & filterable directory of 10 projects
5. `<CurrentlyLooking />` — Compact opportunity banner (Internship / Junior roles)
6. `<Skills />` — 3-tier qualitative grouping (Primary, Working Knowledge, Familiar)
7. `<About />` — Engineering philosophy, tenets, and IIT DU background
8. `<Education />` — Academic foundation (BSSE IIT DU, University Admission with national merit test table, and HSC)
9. `<LatestPosts />` — Technical case studies and writing
10. `<NowLearning />` — Current active focus (OS Concurrency, DBMS, Design Patterns, Algorithms)
11. `<ResumeCTA />` — Downloadable PDF and HTML resume links
12. `<Contact />` — Contact form with serverless webhook forwarding

---

## 6. Blog & Project Case Studies

### Adding or Editing Blog Posts:
- Location: `content/blog/<slug>.md`
- Use valid frontmatter (`title`, `date`, `summary`, `tags`).
- Use standardized tags from `data/content.json` (`Projects`, `Architecture`, `Backend`, `Lessons Learned`, etc.).
- Maintain a first-person, authentic engineering narrative explaining technical trade-offs, architecture decisions, and code patterns.

### Adding or Updating Projects:
- Update `data/content.json` under `"projects"` (or `"featuredProject"`).
- Required case study fields:
  - `problem`: Real-world context and constraints
  - `technicalApproach`: Architecture and tech choices
  - `challenges`: Real technical hurdles encountered
  - `keyDecisions`: Key trade-offs made
  - `result`: Concrete qualitative outcomes and deployments
- Ensure all live links and GitHub repository URLs are verified and accessible.
