# Phase 2: Full Portfolio Upgrade Prompt

Copy and paste the following prompt to any AI coding agent (like opencode):

---

Migrate my portfolio from a static HTML/CSS/JS site to Next.js with TypeScript and Tailwind CSS. The source is at `https://github.com/Shourov735/portfolio`. Clone it first.

## Requirements

### Tech Stack
- Next.js 14+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- next/font for Inter
- next/image for all images

### Pages & Sections
- **Home page** with all sections as server/client components
- **Projects page** (list + individual slug pages for case studies)
- **Blog page** with markdown support (MDX or contentlayer)
- **Contact page** with the existing `/api/contact` serverless function

### Content
- Import all existing data from `data/content.json` into a structured TypeScript config or CMS
- Keep the same color palette (teal #0f766e primary, orange #c2410c accent)
- Preserve dark/light theme with Tailwind `darkMode: 'class'`

### Features to Add
1. **GitHub integration** — Fetch pinned repos or contribution graph via GitHub GraphQL API on the server side
2. **Live project demos** — Deploy each project to Vercel and link from portfolio
3. **Blog with MDX** — Create `/notes` page with markdown posts, reading time, and tags
4. **Project case studies** — Each project gets its own `/projects/[slug]` page with what/why/how/learnings
5. **SEO** — Generate sitemap, robots.txt, JSON-LD structured data, proper OG images per page
6. **Image optimization** — Convert images to WebP/AVIF, use next/image with proper sizes
7. **Custom domain** — Configure with Vercel
8. **Skeleton loading** — Show loading states while content fetches
9. **Animations** — Use Framer Motion for scroll-reveal, hover effects, page transitions
10. **Analytics** — Integrate Vercel Analytics (already has `@vercel/analytics`)

### Performance Targets
- Lighthouse 95+ on all categories
- 100% accessibilty score
- Perfect mobile responsiveness

### Developer Experience
- ESLint + Prettier config
- Husky pre-commit hooks
- Component library with Storybook or similar
- Unit tests with Vitest for critical components

## Existing Code Reference
The current site has:
- `index.html` — semantic HTML shell
- `style.css` — CSS custom properties design system
- `script.js` — vanilla JS rendering with state management
- `data/content.json` — all portfolio content
- `api/contact.js` — Vercel serverless contact endpoint

## Deployment
Keep the existing `vercel.json` and add proper build configuration for Next.js.

Deploy to Vercel when done.