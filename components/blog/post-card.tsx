import Link from "next/link"
import { TagPill } from "./tag-pill"
import { formatDate } from "@/lib/blog-utils"
import type { BlogPostSummary } from "@/lib/types"

type PostCardProps = {
  post: BlogPostSummary
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article
      className={`group relative h-full flex flex-col border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-200 ${
        featured ? "p-7 md:p-8" : "p-6"
      }`}
    >
      <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] font-mono">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
      </div>

      <h3
        className={`mt-4 font-display tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary-strong)] transition-colors ${
          featured ? "text-2xl md:text-3xl leading-[1.15]" : "text-xl leading-[1.2]"
        }`}
      >
        <Link href={`/blog/${post.slug}`} className="link-underline">
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-[var(--color-muted)] text-sm md:text-[0.95rem] leading-relaxed flex-1">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-5 pt-5 border-t border-[var(--color-line)]/70">
          {post.tags.slice(0, 4).map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
