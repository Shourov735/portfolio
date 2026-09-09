"use client"

import { useMemo, useState } from "react"
import { PostCard } from "./post-card"
import type { BlogPostSummary } from "@/lib/types"

type BlogListProps = {
  posts: BlogPostSummary[]
  tags: string[]
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [search, setSearch] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        !q || `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase().includes(q)
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [posts, search, activeTag])

  return (
    <>
      <div className="mb-10 flex flex-col gap-5">
        <div className="max-w-md">
          <label htmlFor="blog-search" className="sr-only">
            Search posts
          </label>
          <input
            id="blog-search"
            type="search"
            placeholder="Search posts by title, description, or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160"
          />
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2" aria-label="Filter by tag">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
                !activeTag
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]"
                  : "border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
              }`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
                  activeTag === tag
                    ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]"
                    : "border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        <p
          className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider"
          aria-live="polite"
        >
          {filtered.length} {filtered.length === 1 ? "post" : "posts"}
          {activeTag ? ` tagged "${activeTag}"` : ""}
          {search ? ` matching "${search}"` : ""}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 border border-dashed border-[var(--color-line)] rounded-xl text-center bg-[var(--color-surface)]">
          <p className="text-[var(--color-muted)] font-medium">No posts match this filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("")
              setActiveTag(null)
            }}
            className="mt-3 text-xs font-bold text-[var(--color-primary-strong)] hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
