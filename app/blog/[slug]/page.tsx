import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PostHeader } from "@/components/blog/post-header"
import { PostContent } from "@/components/blog/post-content"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { RelatedPosts } from "@/components/blog/related-posts"
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { formatDate, formatISODate } from "@/lib/blog-utils"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { AUTHOR_JSONLD, PUBLISHER_JSONLD, buildWebPageSchema } from "@/lib/jsonld"

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: "Post not found" }
  }

  const title = post.title
  const description = post.description
  const url = absoluteUrl(`/blog/${post.slug}`)
  const ogImage = absoluteUrl(post.cover ?? "/opengraph-image")
  const images = [
    {
      url: ogImage,
      alt: `${post.title} — Md Shourov`,
    },
  ]

  return {
    title,
    description,
    authors: [{ name: "Md Shourov", url: SITE_URL }],
    keywords: post.tags,
    alternates: {
      canonical: post.canonical ?? `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Md Shourov Portfolio",
      locale: "en_US",
      images,
      publishedTime: formatISODate(post.date),
      modifiedTime: post.updated ? formatISODate(post.updated) : formatISODate(post.date),
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post, 3)
  const canonical = post.canonical ?? absoluteUrl(`/blog/${post.slug}`)
  const ogImageUrl = absoluteUrl(post.cover ?? "/opengraph-image")

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    headline: post.title,
    description: post.description,
    image: {
      "@type": "ImageObject",
      url: ogImageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: formatISODate(post.date),
    dateModified: post.updated ? formatISODate(post.updated) : formatISODate(post.date),
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
    keywords: post.tags.join(", "),
    articleSection: "Engineering",
    wordCount: post.wordCount,
    inLanguage: "en-US",
    url: canonical,
  }

  const webPageSchema = buildWebPageSchema({
    path: `/blog/${post.slug}`,
    name: post.title,
    description: post.description,
    primaryImage: ogImageUrl,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <ReadingProgress />
      <div className="section pt-12 md:pt-16">
        <div className="container-prose">
          <Breadcrumbs
            items={[
              { name: "Md Shourov", href: "/" },
              { name: "Engineering Notes", href: "/blog" },
              { name: post.title },
            ]}
          />

          <div className="mt-8">
            <PostHeader post={post} />
          </div>

          <article
            data-blog-content
            className="border-t border-[var(--color-line)] pt-10 mt-2"
            aria-labelledby="article-heading"
          >
            <h2 id="article-heading" className="sr-only">
              {post.title}
            </h2>
            <PostContent content={post.content} />
          </article>

          <footer className="mt-16 pt-8 border-t border-[var(--color-line)] text-sm text-[var(--color-muted)]">
            <p className="font-mono uppercase tracking-wider text-xs">
              Originally published {formatDate(post.date)}
              {post.updated && post.updated !== post.date ? ` · Updated ${formatDate(post.updated)}` : ""}
            </p>
            <p className="mt-4">
              See something wrong?{" "}
              <Link href="/#contact" className="link-underline">
                Send a correction
              </Link>
              .
            </p>
          </footer>

          <RelatedPosts posts={related} />

          <nav className="mt-16 pt-10 border-t border-[var(--color-line)] flex flex-wrap items-center justify-between gap-4">
            <Link href="/blog" className="btn-ghost">
              ← All posts
            </Link>
            <Link href="/#contact" className="btn-secondary">
              Get in touch
            </Link>
          </nav>
        </div>
      </div>
    </>
  )
}
