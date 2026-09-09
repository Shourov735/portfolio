import { TagPill } from "./tag-pill"
import { formatDate } from "@/lib/blog-utils"
import type { BlogPost } from "@/lib/types"

type PostHeaderProps = {
  post: BlogPost
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min read</span>
        {post.updated && post.updated !== post.date && (
          <>
            <span aria-hidden="true">·</span>
            <span>Updated {formatDate(post.updated)}</span>
          </>
        )}
      </div>

      <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-tight text-[var(--color-text)] text-balance">
        {post.title}
      </h1>

      <p className="mt-6 text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-[60ch] text-balance">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} size="md" />
          ))}
        </div>
      )}
    </header>
  )
}
