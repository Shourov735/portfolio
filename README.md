# Md. Shourov — Portfolio

A modern, content-driven developer portfolio built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. All content (projects, skills, timeline, education, notes, and more) lives in a single JSON file, so updating the site requires zero component changes.

🔗 **Live site:** [portfolio-lemon-eight-22.vercel.app](https://portfolio-lemon-eight-22.vercel.app)

## Tech Stack

| Layer     | Technology                                                    |
| --------- | ------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, RSC)                                  |
| Language  | TypeScript                                                    |
| Styling   | Tailwind CSS v4                                               |
| Motion    | Framer Motion (`ScrollReveal` animations)                     |
| Content   | Single JSON source of truth (`data/content.json`)             |
| Icons     | React Icons                                                   |
| SEO       | Static metadata, `sitemap.ts`, `robots.ts`, OG image          |
| Analytics | `@vercel/analytics`                                           |
| Email     | Contact form via `app/api/contact` route handler              |

## Features

- **Fully content-driven** — projects, stats, skills, featured projects, notes, now-learning, timeline, education, achievements, testimonials, and contact details all come from `data/content.json`.
- **Featured project spotlight** — renders a curated `featuredProject` array in a dedicated section.
- **Project grid** — category filters + live search across projects (`components/projects.tsx`).
- **Auto-generated project detail pages** — each project gets its own SEO-friendly page at `/projects/[slug]`, generated statically from the content file.
- **Dark/light theme** with persistent toggle (`ThemeProvider`).
- **Scroll reveal animations** with reduced-motion support.
- **Responsive** layout for mobile, tablet, and desktop.
- **Contact API** — `app/api/contact` route handler with `CONTACT_WEBHOOK_URL` support.
- **SEO** — `sitemap.xml`, `robots.txt`, Open Graph metadata, 404 page.

## Getting Started

```bash
npm install

# Development
npm run dev

# Production build
npm run build
npm run start

# Lint / format
npm run lint
npm run format
```

Open [http://localhost:3000](http://localhost:3000) after `npm run dev`.

## Project Structure

```text
.
├── app/
│   ├── api/contact/           # Contact form route handler (POST)
│   ├── projects/[slug]/       # Auto-generated project detail pages
│   ├── layout.tsx             # Root layout, metadata, fonts, theme
│   ├── page.tsx               # Home page composition
│   ├── robots.ts              # robots.txt
│   └── sitemap.ts             # sitemap.xml
├── components/                # Section components (hero, projects, skills, …)
│   ├── scroll-reveal.tsx      # Framer Motion reveal wrapper
│   ├── theme-provider.tsx     # Dark/light theme
│   └── …                      # about, contact, education, footer, header, etc.
├── data/
│   └── content.json           # ⭐ Single source of truth for all content
├── lib/
│   ├── content.ts             # getContent(), getProject(), slugify(), …
│   └── types.ts               # TypeScript interfaces for content
├── public/
│   └── assets/images/         # Project/profile images
├── assets/images/             # Original (unoptimized) source images
├── next.config.ts
├── tailwindcss via postcss.config.mjs
└── package.json
```

## Managing Content

Everything is driven by `data/content.json`. Edit it to update:

- **Projects** — title, summary, image, category, tags, and links
- **Featured projects** — `featuredProject` array (rendered in the spotlight section)
- **Stats, skills, now-learning** — the numbers and skill bars
- **Timeline, education, achievements, testimonials** — background sections
- **Notes** — blog/notes placeholders

### Adding a Project

1. Add a new object to `projects` in `data/content.json` following the existing shape.
2. Drop the image in `public/assets/images/` and reference it as `/assets/images/<file>.jpg`.
3. A detail page is generated automatically — the slug is derived from the title (see `slugify()` in `lib/content.ts`), e.g. `Mosque Library Management` → `/projects/mosque-library-management`.
4. Rebuild with `npm run build` — new pages appear in `sitemap.xml`.

## Projects

### Featured

| Project | Description | Links |
| ------- | ----------- | ----- |
| **Mosque Library Management** | Full-stack app for managing mosque libraries — Islamic book catalog, member management, committee roles, multilingual (EN/BN). | [Live Demo](https://mosque-library-management.vercel.app) |
| **Nabodigonto** | Web presence for the Nabodigonto Social Welfare Organization. | [Live](https://nabodigonto.vercel.app/) · [Mirror](https://nabodigonto-sandy.vercel.app/) |

### All Projects

| Project | Description | Links |
| ------- | ----------- | ----- |
| **Mosque Library Management** | Mosque library catalog, members, and committee management with EN/BN support. | [Live Demo](https://mosque-library-management.vercel.app) |
| **Nabodigonto** | Social welfare organization website. | [Live](https://nabodigonto.vercel.app/) · [Mirror](https://nabodigonto-sandy.vercel.app/) |
| **Portfolio Website** | This very site — a data-driven Next.js portfolio. | [GitHub](https://github.com/Shourov735/portfolio) · [Live](https://portfolio-lemon-eight-22.vercel.app) |
| **TetriC** | Console-based Tetris in C with multiplayer, game modes, and high scores. | [GitHub](https://github.com/Shourov735/TetriC) |
| **Codeforces Solutions** | Competitive programming solutions. | [GitHub](https://github.com/Shourov735/Codeforces) · [Profile](https://codeforces.com/profile/Shourov735) |
| **LeetCode Solutions** | Data structures & algorithms solutions. | [GitHub](https://github.com/Shourov735/LeetCode) |
| **image-comparison** | Interactive image comparison tool. | [GitHub](https://github.com/Shourov735/image-comparison) |

> Tip: run `npm run build` after editing `data/content.json` to keep the sitemap and generated pages in sync.

## Contact Form

The form posts to `/api/contact` (`app/api/contact/route.ts`). To forward submissions to a webhook, set the environment variable:

```text
CONTACT_WEBHOOK_URL=https://your-webhook-url.example
```

Good options: a Discord webhook, Make/Zapier webhook, or a Google Apps Script endpoint.

## Deployment

The site is ready for **Vercel**:

1. Push the repository to GitHub.
2. Import it into Vercel (framework preset: Next.js — no extra config needed).
3. Add `CONTACT_WEBHOOK_URL` in Project Settings → Environment Variables (optional).
4. Deploy.

## Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build (SSG)       |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |
| `npm run format`| Format with Prettier         |
