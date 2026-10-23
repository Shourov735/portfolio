"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import {
  getAllSearchableItems,
  scoreSearchItem,
  type SearchableItem,
  type SearchCategory,
} from "@/lib/search-index"

type FilterPill = "All" | "Projects" | "Blog" | "Skills" | "Academic" | "FAQ & Now" | "Actions"

const PILL_CATEGORY_MAP: Record<FilterPill, SearchCategory[] | null> = {
  All: null,
  Projects: ["Projects & Case Studies"],
  Blog: ["Engineering Blog"],
  Skills: ["Technical Skills"],
  Academic: ["Academic & Achievements"],
  "FAQ & Now": ["Philosophy & FAQ", "Currently Studying (Now)"],
  Actions: ["Navigation & Sections", "Quick Actions & Socials"],
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null
  return <CommandDialog onClose={onClose} />
}

function CommandDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [activePill, setActivePill] = useState<FilterPill>("All")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const allItems = useMemo(() => getAllSearchableItems(), [])

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2200)
  }, [])

  // Execute item action
  const executeItem = useCallback(
    (item: SearchableItem) => {
      if (item.actionType === "copy-email") {
        if (navigator?.clipboard) {
          navigator.clipboard.writeText("mdshourov735@gmail.com")
          showToast("✓ Copied mdshourov735@gmail.com to clipboard")
        }
        return
      }

      if (item.actionType === "download-resume") {
        window.open(item.href || "/assets/resume/Md-Shourov-Resume.pdf", "_blank")
        onClose()
        return
      }

      if (item.actionType === "toggle-theme") {
        toggleTheme()
        showToast(`Switched theme to ${theme === "dark" ? "light" : "dark"} mode`)
        return
      }

      if (item.actionType === "external" && item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer")
        onClose()
        return
      }

      if (item.href) {
        if (item.href.startsWith("/#") || item.href.startsWith("#")) {
          const hash = item.href.replace(/^\/?#/, "")
          const target = document.getElementById(hash)
          if (target) {
            target.scrollIntoView({ behavior: "smooth" })
            window.history.pushState(null, "", `#${hash}`)
          } else {
            router.push(`/#${hash}`)
          }
        } else {
          router.push(item.href)
        }
        onClose()
      }
    },
    [onClose, router, showToast, theme, toggleTheme]
  )

  // Filtered and scored results
  const results = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
    const allowedCategories = PILL_CATEGORY_MAP[activePill]

    let pool = allItems
    if (allowedCategories) {
      pool = pool.filter((item) => allowedCategories.includes(item.category))
    }

    if (tokens.length === 0) {
      return pool.map((item) => ({ item, score: 1, matchSnippet: undefined }))
    }

    const scored = pool
      .map((item) => {
        const { score, matchSnippet } = scoreSearchItem(item, tokens)
        return { item, score, matchSnippet }
      })
      .filter((res) => res.score > 0)
      .sort((a, b) => b.score - a.score)

    return scored
  }, [allItems, query, activePill])

  // Count items per pill
  const pillCounts = useMemo(() => {
    const counts: Record<FilterPill, number> = {
      All: allItems.length,
      Projects: 0,
      Blog: 0,
      Skills: 0,
      Academic: 0,
      "FAQ & Now": 0,
      Actions: 0,
    }

    for (const item of allItems) {
      if (item.category === "Projects & Case Studies") counts.Projects++
      else if (item.category === "Engineering Blog") counts.Blog++
      else if (item.category === "Technical Skills") counts.Skills++
      else if (item.category === "Academic & Achievements") counts.Academic++
      else if (
        item.category === "Philosophy & FAQ" ||
        item.category === "Currently Studying (Now)"
      )
        counts["FAQ & Now"]++
      else counts.Actions++
    }

    return counts
  }, [allItems])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (results.length || 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + results.length) % (results.length || 1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (results[selectedIndex]) {
        executeItem(results[selectedIndex].item)
      }
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    }
  }

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>("[data-selected='true']")
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

  const pills: FilterPill[] = ["All", "Projects", "Blog", "Skills", "Academic", "FAQ & Now", "Actions"]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Universal Portfolio Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 md:pt-20 px-3 md:px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-[640px] bg-[var(--color-surface)] border border-[var(--color-line)] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-[var(--color-text)] max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--color-line)] px-4 py-3.5">
          <span className="text-[var(--color-primary-strong)] font-mono text-base mr-3 select-none">
            🔍
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects, code, blogs, skills, marks, tenets..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-0 outline-none text-sm md:text-base font-sans placeholder:text-[var(--color-muted)] text-[var(--color-text)]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("")
                setSelectedIndex(0)
                inputRef.current?.focus()
              }}
              className="text-xs font-mono uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] mr-2 cursor-pointer"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)] hover:text-[var(--color-text)] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills Row */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[var(--color-line)] overflow-x-auto bg-[var(--color-surface-muted)]/40 no-scrollbar">
          {pills.map((pill) => {
            const isSelected = activePill === pill
            const count = pillCounts[pill]
            return (
              <button
                key={pill}
                type="button"
                onClick={() => {
                  setActivePill(pill)
                  setSelectedIndex(0)
                }}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)] font-semibold shadow-2xs"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-line)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
                }`}
              >
                <span>{pill}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[var(--color-bg)] text-[var(--color-primary)] font-bold" : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Toast Feedback Banner */}
        {toastMessage && (
          <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] border-b border-[var(--color-primary)]/20 px-4 py-2 text-xs font-mono font-medium animate-in fade-in duration-150">
            {toastMessage}
          </div>
        )}

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-10 text-center text-sm font-mono text-[var(--color-muted)]">
              <p>No results found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1.5 opacity-80">Try searching for &ldquo;ArrayDeque&rdquo;, &ldquo;Durable Objects&rdquo;, &ldquo;Merit 3&rdquo;, or &ldquo;SQLite&rdquo;</p>
            </div>
          ) : (
            results.map((res, idx) => {
              const item = res.item
              const isSelected = selectedIndex === idx

              return (
                <div
                  key={item.id}
                  data-selected={isSelected}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                    isSelected
                      ? "bg-[var(--color-surface-muted)] text-[var(--color-text)] border-[var(--color-primary)]/40 shadow-xs ring-1 ring-[var(--color-primary)]/30"
                      : "bg-[var(--color-surface)] text-[var(--color-text)] border-transparent hover:bg-[var(--color-surface-muted)]/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <p className="text-sm font-semibold font-sans text-[var(--color-text)] truncate">
                        {item.title}
                      </p>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-primary-strong)] font-medium shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {item.secondaryActions?.map((sec) => (
                        <a
                          key={sec.label}
                          href={sec.href}
                          target={sec.href.startsWith("http") ? "_blank" : undefined}
                          rel={sec.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] hover:border-[var(--color-primary)] transition-colors inline-flex items-center gap-0.5"
                        >
                          <span>{sec.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {item.subtitle && (
                    <p className="text-xs font-mono text-[var(--color-muted)] truncate">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Dynamic Match Context Snippet */}
                  {res.matchSnippet && (
                    <div className="text-[11px] font-mono text-[var(--color-primary-strong)] bg-[var(--color-primary)]/8 px-2 py-1 rounded border border-[var(--color-primary)]/20 mt-1 truncate">
                      <span className="opacity-70 mr-1.5 font-bold">Match:</span>
                      <span>{res.matchSnippet}</span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="border-t border-[var(--color-line)] p-2.5 px-4 bg-[var(--color-surface-muted)]/50 flex items-center justify-between text-[11px] font-mono text-[var(--color-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>
            {query
              ? `${results.length} ${results.length === 1 ? "result" : "results"}`
              : `${allItems.length} searchable items`}
          </span>
        </div>
      </div>
    </div>
  )
}
