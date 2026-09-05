<div align="center">

# 🌐 Md. Shourov — Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-shourov735.vercel.app-FF5722?style=for-the-badge&logo=vercel&logoColor=white)](https://shourov735.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&pause=1000&color=6366F1&center=true&vCenter=true&width=700&lines=Modern+Content-Driven+Portfolio;Static+Site+Generation+(SSG)+with+Next.js+16+App+Router;Single+JSON+Source+of+Truth+for+Effortless+Updates;Dark%2FLight+Mode+%E2%80%A2+Fluid+Motion+%E2%80%A2+SEO+Optimized)](https://shourov735.vercel.app/)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-architecture--data-flow">Architecture</a> •
  <a href="#-projects-showcase">Projects Showcase</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-managing-content">Managing Content</a> •
  <a href="#-connect">Connect</a>
</p>

</div>

---

## 📖 Overview

This repository powers the personal portfolio of **Md. Shourov**, a Software Engineering undergraduate at the **Institute of Information Technology (IIT), University of Dhaka**, and **IT Secretary** at *Nabodigonto Social Welfare Organization*.

Architected with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, this portfolio is strictly **content-driven**. All domain content—projects, featured spotlights, skill proficiency levels, timeline milestones, academic achievements, reading notes, and contact details—is decoupled from React presentation logic and centrally defined within [`data/content.json`](data/content.json). Adding, modifying, or categorizing projects requires **zero component modifications**.

🔗 **Production Deployment:** [shourov735.vercel.app](https://shourov735.vercel.app)

---

## ✨ Key Features

- ⚡ **Zero-Overhead Content-Driven Architecture:** Complete site content lives in [`data/content.json`](data/content.json) enforced by strictly typed TypeScript interfaces (`lib/types.ts`).
- 🚀 **Static Site Generation (SSG) with Dynamic Param Routes:** Each project automatically generates an optimized, indexable detail page at `/projects/[slug]` with custom metadata and architectural highlights.
- 🎯 **Curated Featured Spotlight:** A dedicated spotlight section showcases flagship web, system, and enterprise projects with direct production and repository links.
- 🔍 **Real-Time Client-Side Filter & Search:** Fast, responsive category filtering (All, Web, Systems, Mobile, Open Source, Algorithms) with instant full-text search across titles, summaries, and technology tags.
- 🌓 **Persistent Theme Engine:** Seamless Dark and Light theme switching with localStorage persistence and OS preference detection (`prefers-color-scheme`).
- 🎬 **Fluid Framer Motion Transitions:** Non-blocking `ScrollReveal` animations with full support for user accessibility preferences (`prefers-reduced-motion`).
- 📬 **Serverless Contact Webhook Integration:** RESTful POST endpoint at `/api/contact` supporting automated notification forwarding via `CONTACT_WEBHOOK_URL` (Discord, Zapier, Make, Slack).
- 📈 **Modern SEO & Web Standards:** Out-of-the-box `sitemap.xml`, `robots.txt`, dynamic OpenGraph tags, semantic HTML5 markup, and `@vercel/analytics` integration.

---

## 🏗️ Architecture & Data Flow

```text
               ┌──────────────────────────────┐
               │      data/content.json       │  (Single Source of Truth)
               └──────────────┬───────────────┘
                              │
               ┌──────────────▼───────────────┐
               │        lib/content.ts        │  (Typed Loaders & Slugifiers)
               │         lib/types.ts         │
               └──────┬───────────────┬───────┘
                      │               │
        ┌─────────────▼─────┐   ┌─────▼──────────────────┐
        │  app/page.tsx     │   │ app/projects/[slug]    │  (Static Pre-rendering)
        │  (Home Page)      │   │ generateStaticParams() │
        └─────────────┬─────┘   └─────┬──────────────────┘
                      │               │
  ┌───────────────────┴───────────────┴─────────────────────┐
  │ Components: Hero, Spotlight, Projects, Skills, Timeline │
  └─────────────────────────────────────────────────────────┘
```

---

## 🚀 Projects Showcase

### 🌟 Featured Highlights

#### 1. [Nabodigonto (নবদিগন্ত সমাজ কল্যাণ সংস্থা)](https://nabodigonto.conversora-tech.workers.dev/) — Flagship Community & Treasury Platform
[![Live Demo](https://img.shields.io/badge/Live_Demo-nabodigonto.conversora--tech.workers.dev-00e599?style=flat-square&logo=cloudflare&logoColor=white)](https://nabodigonto.conversora-tech.workers.dev/)
[![Role](https://img.shields.io/badge/Role-IT_Secretary-6366f1?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_Prisma_%7C_Neon_Postgres_%7C_Clerk_v7_%7C_Cloudflare-black?style=flat-square)](#)

> **Impact:** Appointed as **IT Secretary** of Nabodigonto Social Welfare Organization following the architecture, development, and launch of this platform.

- **Blind Audit Protocol:** Prevents financial discrepancies by masking treasury balances until both Finance and System Admin submit independent reconciliation entries.
- **Dynamic 3D Flip Member ID Cards:** Generates digital PVC-style identity cards with dynamic QR verification codes (`/verify/[token]`) and bulk PVC printing layouts.
- **Dues Tracking & Verified Receipts:** Automated self-service monthly dues ledger with cryptographic SHA-256 verified PDF audit statements.
- **Modern Cloud Stack:** Next.js 16, React 19, Prisma 7, Neon Serverless PostgreSQL / Cloudflare D1, Clerk Auth, deployed serverless on Cloudflare Workers via OpenNext.

---

#### 2. [InsideJibon](https://insidejibon.insidejibon.workers.dev/) — Next-Gen EdTech Web Platform
[![Live Demo](https://img.shields.io/badge/Live_Demo-insidejibon.insidejibon.workers.dev-f38020?style=flat-square&logo=cloudflare&logoColor=white)](https://insidejibon.insidejibon.workers.dev/)
[![Repository](https://img.shields.io/badge/Repo-InsideJibon-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Shourov735/InsideJibon)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16_%7C_Drizzle_ORM_%7C_Neon_Postgres_%7C_Cloudflare_R2-black?style=flat-square)](#)

- **Comprehensive Course & Exam Engine:** Full learning lifecycle covering course enrollment, video lecture playlists, student submissions, and automated quizzes.
- **Bilingual Experience:** Built-in English and Bengali internationalization (EN/BN) across student classrooms and administrative portals.
- **High-Performance Edge Architecture:** Next.js 16, React 19, Drizzle ORM, Neon PostgreSQL, Cloudflare R2 lecture storage, deployed globally on Cloudflare Workers.

---

#### 3. [Quiz Management & Examination System](https://github.com/Shourov735/Quiz-Management-and-Examination-System) — Mini-SPL Academic Project
[![Repository](https://img.shields.io/badge/Repo-Quiz--Management--System-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Shourov735/Quiz-Management-and-Examination-System)
[![Academic Project](https://img.shields.io/badge/Academic_Project-Mini--SPL_%2F_Design_Patterns-blue?style=flat-square)](#)
[![Stack](https://img.shields.io/badge/Stack-Java_17_%7C_JavaFX_21_%7C_SQLite_%7C_GoF_Patterns-ed8b00?style=flat-square&logo=openjdk&logoColor=white)](#)

- **Rigorous GoF Design Patterns & SOLID:** Architected with Strategy (custom scoring algorithms), State (Draft → Published → Active → Completed lifecycle), Factory Method (polymorphic question types), and Observer (event-driven exam timers).
- **Dual Role Dashboards:** Dedicated operational screens for **Teachers** (question bank, quiz rules, statistical score distributions) and **Students** (timed quiz engine, anti-cheat screen management, instant solution reviews).
- **Relational Persistence:** SQLite persistence with automated schema migration, database seeders, and comprehensive JUnit 5 test suites.

---

#### 4. [Mosque Library Management](https://mosquelibrary.vercel.app/) — Community Library Web App
[![Live Demo](https://img.shields.io/badge/Live_Demo-Mosque_Library-0070f3?style=flat-square&logo=vercel&logoColor=white)](https://mosquelibrary.vercel.app/)
[![Stack](https://img.shields.io/badge/Stack-Next.js_%7C_TypeScript_%7C_Tailwind_%7C_Prisma_%7C_PostgreSQL-black?style=flat-square)](#)

- **Islamic Literature Catalog:** Categorized directory for Quran, Hadith, Tafsir, Fiqh, and Islamic History with live borrowing availability status.
- **Circulation & Committee Desk:** Member loan lifecycle management, return tracking, overdue notifications, and bilingual (EN/BN) interface support.

---

### 📂 All Portfolio Projects

| Project | Category | Tech Stack | Description | Links |
| :--- | :--- | :--- | :--- | :--- |
| **Nabodigonto** | Web | Next.js 16, Cloudflare Workers, Prisma, Clerk | Community & financial audit platform with 3D member ID cards and double-signed treasury ledger. | [Live Demo](https://nabodigonto.conversora-tech.workers.dev) · [GitHub](https://github.com/Shourov735/nabodigonto) |
| **InsideJibon** | Web | Next.js 16, Drizzle ORM, Neon Postgres, Cloudflare R2 | Scalable bilingual EdTech management platform with interactive exams and cloud learning materials. | [Live Demo](https://insidejibon.insidejibon.workers.dev) · [GitHub](https://github.com/Shourov735/InsideJibon) |
| **Quiz Management System** | Systems | Java 17, JavaFX 21, SQLite, GoF Patterns | Desktop examination software developed for IIT DU Mini-SPL implementing 5 GoF patterns and SQLite. | [GitHub](https://github.com/Shourov735/Quiz-Management-and-Examination-System) |
| **Quran Reading Tracker** | Mobile | React Native, Expo, TypeScript, AsyncStorage | Offline-first Android mobile app with dual independent pipelines for Arabic recitation and Bangla translation. | [GitHub](https://github.com/Shourov735/QuranReadingTracker) |
| **Mosque Library Management** | Web | Next.js, TypeScript, Tailwind, Prisma, PostgreSQL | Full-stack mosque library system with Islamic catalog, borrowing tracking, and committee roles. | [Live Demo](https://mosquelibrary.vercel.app) |
| **image-comparison** | Open Source | Java, Algorithms, JUnit 5, Maven Central | Contributed algorithmic refactor (PR #255) to Maven Central library, replacing recursive grouping with iterative `ArrayDeque`. | [GitHub Fork](https://github.com/Shourov735/image-comparison) · [PR #255](https://github.com/romankh3/image-comparison/pull/255) |
| **TetriC** | Systems | C, Sockets, Game Development, Non-blocking I/O | Console-based Tetris in C featuring matrix rotation, local 2-player, and TCP network multiplayer gameplay. | [GitHub](https://github.com/Shourov735/TetriC) |
| **Portfolio Website** | Web | Next.js 16, TypeScript, Tailwind CSS v4, Framer | This responsive, content-driven portfolio site with SSG project routing and automated sitemaps. | [GitHub](https://github.com/Shourov735/portfolio) · [Live](https://shourov735.vercel.app) |
| **Codeforces Solutions** | Algorithms | C++, C, Graph Theory, Number Theory | Archive of 150+ competitive programming contest solutions with time and space complexity optimizations. | [GitHub](https://github.com/Shourov735/Codeforces) · [Profile](https://codeforces.com/profile/Shourov735) |
| **LeetCode Solutions** | Algorithms | C++, Data Structures, Dynamic Programming | Clean, idiomatic solutions focusing on reusable DSA patterns, trees, graphs, and dynamic programming. | [GitHub](https://github.com/Shourov735/LeetCode) · [Profile](https://leetcode.com/u/Shourov735/) |

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (Turbopack)](https://nextjs.org/) | App Router, Server Components, Static Site Generation (SSG) |
| **Runtime / Library** | [React 19](https://react.dev/) | React Server Components, Modern hooks architecture |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Fully typed schema validation and compile-time guarantees |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern CSS variable design tokens and utility-first styling |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) | `ScrollReveal` animations with reduced-motion fallback |
| **Data Layer** | Single JSON Architecture | Centralized [`data/content.json`](data/content.json) parsed via typed getters |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | Feather & Tabler icon collections |
| **SEO & Meta** | Next.js Metadata API | Auto-generated `sitemap.xml`, `robots.txt`, dynamic OpenGraph |
| **Analytics** | [`@vercel/analytics`](https://vercel.com/analytics) | Privacy-friendly real-time audience performance insights |
| **Form Handling** | Next.js Route Handlers | Serverless `/api/contact` endpoint supporting webhook dispatch |

---

## 📁 Directory Layout

```text
.
├── app/
│   ├── api/contact/route.ts      # Contact form serverless route handler (POST)
│   ├── projects/[slug]/page.tsx  # Dynamic SSG project detail routes (generateStaticParams)
│   ├── globals.css               # Design tokens, themes, Tailwind CSS v4 imports
│   ├── layout.tsx                # Root HTML layout, metadata, fonts, ThemeProvider
│   ├── page.tsx                  # Landing page composing modular sections
│   ├── not-found.tsx             # Styled 404 page
│   ├── robots.ts                 # Dynamic robots.txt generation
│   └── sitemap.ts                # Automated XML sitemap generation
├── components/                   # Isolated, reusable presentation components
│   ├── about.tsx                 # About me biographical overview
│   ├── achievements.tsx          # Key accomplishments and awards
│   ├── back-to-top.tsx           # Floating smooth scroll-to-top button
│   ├── contact.tsx               # Interactive contact form with API integration
│   ├── education.tsx             # Academic background, merit ranks, and coursework
│   ├── footer.tsx                # Site footer and copyright information
│   ├── header.tsx                # Responsive navigation bar with theme toggle
│   ├── hero.tsx                  # Hero banner with avatar and resume CTA
│   ├── notes.tsx                 # Searchable tech blog notes
│   ├── now-learning.tsx          # Current technical focus and learning interests
│   ├── projects.tsx              # Projects grid with category filters and live search
│   ├── scroll-reveal.tsx         # Framer Motion wrapper for scroll animations
│   ├── skills.tsx                # Visual skill proficiency bars by category
│   ├── spotlight.tsx             # Featured projects highlight showcase
│   ├── stats-band.tsx            # Key statistics counter band
│   ├── theme-provider.tsx        # Client-side dark/light theme context provider
│   └── timeline.tsx              # Career & education chronological timeline
├── data/
│   └── content.json              # ⭐ Single source of truth for all content
├── lib/
│   ├── content.ts                # getContent(), getProject(), slugify(), slug getters
│   └── types.ts                  # Strict TypeScript interfaces for content schema
├── public/
│   └── assets/images/            # High-resolution project covers and profile assets
└── next.config.ts                # Next.js compiler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `v20.0.0` or higher (tested on Node `v24.x`)
- **npm:** `v10.0.0` or higher

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/Shourov735/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the site.

### Build & Quality Verification

```bash
# Run ESLint validation
npm run lint

# Format codebase with Prettier
npm run format

# Run optimized production SSG build
npm run build

# Preview production build locally
npm run start
```

---

## 📝 Managing Content

All website content is managed through [`data/content.json`](data/content.json). You do **not** need to touch React components to add or modify information.

### Adding a New Project in 3 Steps

1. **Add the project object** to the `projects` array in [`data/content.json`](data/content.json):
   ```json
   {
     "title": "My New Project",
     "summary": "Concise summary of what the project accomplishes.",
     "image": "/assets/images/my-project.jpg",
     "category": "Web",
     "tags": ["Next.js", "TypeScript", "Tailwind CSS"],
     "links": [
       { "label": "Live Demo", "url": "https://demo.example.com" },
       { "label": "GitHub", "url": "https://github.com/Shourov735/my-project" }
     ],
     "highlights": [
       "Key architectural innovation or feature highlight",
       "High-performance database query optimization"
     ]
   }
   ```
2. **Add the image:** Place a `600x400` or `16:10` image into `public/assets/images/my-project.jpg`.
3. **Build:** Run `npm run build`. Next.js will automatically generate `/projects/my-new-project` and include it in `sitemap.xml`.

---

## 📬 Contact Webhook Configuration

The contact form posts submissions to `/api/contact`. To forward messages to Discord, Slack, or Zapier, set the environment variable in `.env.local` or your Vercel project settings:

```env
CONTACT_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

---

## 🌐 Deployment

The project is zero-configuration ready for deployment on **Vercel**:

1. Push your changes to GitHub:
   ```bash
   git push origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. The framework preset will automatically detect **Next.js**.
4. (Optional) Set `CONTACT_WEBHOOK_URL` in **Project Settings → Environment Variables**.
5. Click **Deploy**.

---

<div align="center">

## 🤝 Connect with Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/md-shourov-89125a337)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Shourov735)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=flat-square&logo=googlechrome&logoColor=white)](https://shourov735.vercel.app/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:mdshourov735@gmail.com)
[![X / Twitter](https://img.shields.io/badge/X-000000?style=flat-square&logo=x&logoColor=white)](https://x.com/Shourov735)
[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=flat-square&logo=telegram&logoColor=white)](https://t.me/Shourov735)

<br/>

> *"Learning by building, improving one project at a time."*

Crafted with dedication by **Md. Shourov** • Institute of Information Technology (IIT), University of Dhaka

</div>
