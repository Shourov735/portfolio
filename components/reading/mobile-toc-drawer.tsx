"use client"

import { useState, useEffect } from "react"
import type { TocItem } from "./table-of-contents"

interface MobileTocDrawerProps {
  items: TocItem[]
}

export function MobileTocDrawer({ items }: MobileTocDrawerProps) {
  const [open, setOpen] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeTitle, setActiveTitle] = useState<string>(items[0]?.text || "Contents")

  useEffect(() => {
    if (!items || items.length === 0) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))))
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          visible.sort(
            (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
          )
          const matched = items.find((i) => i.id === visible[0].target.id)
          if (matched) setActiveTitle(matched.text)
        }
      },
      { rootMargin: "-80px 0% -60% 0%", threshold: [0, 1] }
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

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  const scrollTo = (id: string) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  if (!items || items.length === 0) return null

  return (
    <div className="lg:hidden mb-6">
      {/* Collapsible Mobile Bar */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-xs text-xs font-mono text-[var(--color-text)] transition-colors cursor-pointer"
        aria-expanded={open}
        aria-controls="mobile-toc-dialog"
      >
        <div className="flex items-center gap-2 line-clamp-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
          <span className="text-[var(--color-muted)] uppercase tracking-wider text-[10px]">Jump to:</span>
          <span className="font-semibold truncate text-[var(--color-text)]">{activeTitle}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[var(--color-muted)] tabular-nums">{readingProgress}%</span>
          <span className="text-[var(--color-muted)] transition-transform duration-200">
            {open ? "✕" : "↓"}
          </span>
        </div>
      </button>

      {/* Expanded Dialog / Sheet */}
      {open && (
        <div
          id="mobile-toc-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Table of contents navigation"
          className="mt-2 p-4 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] shadow-lg animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-line)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)] font-semibold">
              Table of Contents
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] p-1 cursor-pointer"
            >
              Close
            </button>
          </div>

          <ul className="space-y-1 max-h-60 overflow-y-auto py-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left py-2 px-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    activeTitle === item.text
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] font-semibold"
                      : "text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
