import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { BlogList } from "@/components/blog/blog-list"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SITE_URL, absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "Engineering Notes",
  description:
    "Long-form writing on software engineering, edge systems, and student engineering practice by Md Shourov (Shourov735), IIT, University of Dhaka.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Engineering Notes — Md Shourov",
    description:
      "Long-form writing on software engineering, edge systems, and student engineering practice by Md Shourov.",
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "Md Shourov Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Notes — Md Shourov",
    description:
      "Long-form writing on software engineering, edge systems, and student engineering practice by Md Shourov.",
  },
}

export default async function BlogIndex() {
  const [posts, tagCounts] = await Promise.all([getAllPosts(), getAllTags()])
  const tags = tagCounts.map((t) => t.tag)
  const featured = posts[0]
  const rest = posts.slice(1)

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Engineering Notes by Md Shourov",
    description: "A chronological index of long-form engineering writing.",
    itemListElement: posts.map((post, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="section pt-16 md:pt-20">
        <div className="container-main">
          <Breadcrumbs items={[{ name: "Md Shourov", href: "/" }, { name: "Engineering Notes" }]} />

          <header className="mt-10 max-w-3xl">
            <p className="eyebrow">Engineering Notes</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-[var(--color-text)] text-balance">
              Field notes on building software.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-[60ch] text-balance">
              Long-form writing on the engineering work I do — Next.js architecture, edge systems, and the
              discipline of shipping code that survives its second author. Updated as I learn.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="https://medium.com/@Shourov735"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Read on Medium ↗
              </a>
            </div>
          </header>

          {featured && (
            <section className="mt-16 md:mt-20" aria-label="Latest post">
              <p className="eyebrow-muted">Latest</p>
              <div className="mt-4">
                <PostCard post={featured} featured />
              </div>
            </section>
          )}

          <section className="mt-20" aria-labelledby="all-posts-heading">
            <h2
              id="all-posts-heading"
              className="font-display text-3xl md:text-4xl tracking-tight text-[var(--color-text)]"
            >
              All posts
            </h2>
            <div className="mt-8">
              <BlogList posts={rest} tags={tags} />
            </div>
          </section>

          <ScrollReveal>
            <div className="divider-fade my-20" />
            <p className="text-center text-sm text-[var(--color-muted)] font-mono">
              Also published on{" "}
              <a
                href="https://medium.com/@Shourov735"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                Medium
              </a>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}
