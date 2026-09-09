import Link from "next/link"
import type { BlogPostSummary } from "@/lib/types"
import { formatDate } from "@/lib/blog-utils"

type RelatedPostsProps = {
  posts: BlogPostSummary[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <aside aria-labelledby="related-heading" className="mt-20 pt-12 border-t border-[var(--color-line)]">
      <h2
        id="related-heading"
        className="font-display text-2xl md:text-3xl mb-8 text-[var(--color-text)] tracking-tight"
      >
        Continue reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors"
          >
            <time
              dateTime={post.date}
              className="text-xs text-[var(--color-muted)] font-mono uppercase tracking-wider"
            >
              {formatDate(post.date)}
            </time>
            <h3 className="mt-3 font-display text-lg leading-snug text-[var(--color-text)]">
              <Link
                href={`/blog/${post.slug}`}
                className="link-underline group-hover:text-[var(--color-primary-strong)]"
              >
                {post.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </article>
        ))}
      </div>
    </aside>
  )
}
