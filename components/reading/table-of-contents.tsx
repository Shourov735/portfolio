"use client"

import { useEffect, useState } from "react"

export interface TocItem {
  id: string
  text: string
  level?: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "")
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    if (!items || items.length === 0) return

    // 1. Reading Progress calculation
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100)))
        setReadingProgress(pct)
      }
    }

    // 2. IntersectionObserver for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by top distance to pick the one closest to header
          visibleEntries.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          )
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: [0, 1],
      }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [items])

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveId(id)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 backdrop-blur-md p-5 text-sm shadow-xs transition-all"
    >
      {/* Header & Progress */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-line)]">
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] font-semibold text-[var(--color-text)]">
          On This Page
        </span>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-muted)] tabular-nums">
          <span>{readingProgress}%</span>
        </div>
      </div>

      {/* Progress Track */}
      <div
        className="w-full h-1 bg-[var(--color-line)] rounded-full overflow-hidden mb-4"
        role="progressbar"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="h-full bg-[var(--color-primary)] transition-[width] duration-150 rounded-full"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Heading Links */}
      <ul className="space-y-1.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {items.map((item) => {
          const isActive = activeId === item.id
          const isSub = item.level && item.level > 2

          return (
            <li key={item.id} className={isSub ? "ml-3" : ""}>
              <button
                type="button"
                onClick={() => scrollToHeading(item.id)}
                className={`group flex items-center text-left w-full py-1 px-2 rounded-md text-xs transition-all cursor-pointer ${
                  isActive
                    ? "font-semibold text-[var(--color-primary-strong)] bg-[var(--color-primary)]/10"
                    : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full mr-2 shrink-0 transition-all ${
                    isActive
                      ? "bg-[var(--color-primary)] scale-125"
                      : "bg-[var(--color-line)] group-hover:bg-[var(--color-muted)]"
                  }`}
                  aria-hidden="true"
                />
                <span className="line-clamp-1 leading-snug">{item.text}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Back to top button */}
      <div className="mt-4 pt-3 border-t border-[var(--color-line)]">
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center justify-between w-full text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] py-1 transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </nav>
  )
}
