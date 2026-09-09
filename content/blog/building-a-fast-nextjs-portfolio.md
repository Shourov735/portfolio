---
title: "Building a Fast Next.js Portfolio with the App Router"
description: "Practical lessons from rebuilding my portfolio on Next.js 16 — file-system content, static generation, and a custom open-graph pipeline."
date: "2026-01-15"
updated: "2026-02-02"
tags:
  - Next.js
  - Performance
  - TypeScript
  - Engineering
draft: false
---

Most personal portfolios fail for the same reason: they treat content as something to fetch, not something to compile. The page is generated, sent down the wire, and then the JavaScript hydrates just so a JSON file can re-render into the same DOM. I rebuilt mine this winter to do the opposite — content is read at build time, pre-rendered to static HTML, and the only JavaScript that ships is the part that earns its place.

Here is the architecture I ended up with, and why each decision mattered.

## A single source of truth, on disk

The first decision was structural. I keep every project, skill, note, and now blog post as a file. Project metadata lives in `data/content.json`; blog posts live in `content/blog/*.md` parsed with [`gray-matter`](https://github.com/jonschlinkert/gray-matter). The advantage is not aesthetic — it's that the entire portfolio can be regenerated, statically, with no database and no CMS.

```ts
export async function getAllSlugs(): Promise<string[]> {
  const posts = await loadAllPosts()
  return posts.filter(isPublished).map((p) => p.slug)
}
```

This function reads the filesystem once, parses frontmatter, and caches the result. Each `app/blog/[slug]/page.tsx` calls `generateStaticParams()` against it at build time, which means every post becomes a real HTML file with its own URL, its own metadata, and its own entry in `sitemap.xml`.

## Static by default, server where it has to be

The Next.js App Router lets you mix static, dynamic, and server-rendered routes in the same project. I lean hard into static:

- `/` is static. It composes a dozen components that each read from the JSON content layer.
- `/projects/[slug]` is static via `generateStaticParams()`.
- `/blog/[slug]` is static the same way.
- `/api/contact` is server-rendered because it has to POST somewhere.

The header uses one client component for the mobile menu and theme toggle. Everything else is React Server Components, which means there is no JavaScript shipped to the browser until it is needed. The bundle for a static page is essentially zero.

## What I actually measured

A `next build` of the portfolio takes about ten seconds. The largest page in production is the home page at 4.2 KB gzipped before images. With the work-box profile picture excluded, the home page has a Largest Contentful Paint around 0.8 seconds on a cold cache over a throttled 4G profile — comfortably in the green.

That is not because I did anything clever. It is because static HTML, when treated as a default and not an optimization, is genuinely faster than the alternatives. The lesson is that **the fastest request is the one that was answered at build time**.

## A small detour on open-graph images

The thing I spent the most time on was not the application logic. It was the 1200×630 social card. Most portfolios ship a square profile photo and rely on Twitter and LinkedIn to crop it badly. Instead, I generate the image at build time with `next/og`:

```tsx
import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0d1515",
          color: "#edf7f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 96 }}>Md Shourov</div>
        <div style={{ fontSize: 32, opacity: 0.7 }}>Software Engineering · IIT, University of Dhaka</div>
      </div>
    ),
    { ...size }
  )
}
```

The route lives at `app/opengraph-image.tsx`. Next renders it once at build time, caches the result, and serves it as a static asset. No image generation in the request path, no Lambda in the loop.

## The takeaway

If your portfolio is a single author writing a single voice, you do not need a CMS. You need a `data/` directory and a build step. The result is faster, simpler, and arguably more honest about how personal sites actually work.

I will write more about the blog system itself in a future post — there is a small reading-progress indicator, a tag system, and a JSON-LD layer that took longer to get right than I want to admit.
