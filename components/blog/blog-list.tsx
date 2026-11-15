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
        <div
          role="status"
          aria-live="polite"
          className="p-10 md:p-12 border border-dashed border-[var(--color-line)] rounded-xl text-center bg-[var(--color-surface)]"
        >
          <div className="w-10 h-10 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-muted)] flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-[var(--color-text)]">
            No matching engineering notes found
          </h3>
          <p className="text-xs text-[var(--color-muted)] mt-1.5 max-w-[48ch] mx-auto">
            No posts match your current search
            {search ? (
              <span>
                {" "}
                for &ldquo;<strong className="text-[var(--color-text)]">{search}</strong>&rdquo;
              </span>
            ) : (
              ""
            )}
            {activeTag ? (
              <span>
                {" "}
                with tag &ldquo;<strong className="text-[var(--color-text)]">{activeTag}</strong>&rdquo;
              </span>
            ) : (
              ""
            )}
            .
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
              >
                <span>Query: &quot;{search}&quot;</span>
                <span aria-hidden="true">×</span>
              </button>
            )}
            {activeTag && (
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
              >
                <span>Tag: {activeTag}</span>
                <span aria-hidden="true">×</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setSearch("")
                setActiveTag(null)
              }}
              className="btn-primary text-xs py-1.5 px-3.5 cursor-pointer ml-1"
            >
              Reset filters
            </button>
          </div>
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
