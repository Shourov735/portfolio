"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface NavItem {
  title: string
  href: string
  category?: string
}

interface SequentialNavProps {
  prev?: NavItem | null
  next?: NavItem | null
  typeLabel?: string
}

export function SequentialNav({ prev, next, typeLabel = "Project" }: SequentialNavProps) {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return

      // 1. Modifiers guard
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return

      // 2. Modal / Dialog open guard (Command Palette, Mobile TOC Drawer, etc.)
      if (document.querySelector('[role="dialog"]') !== null) return

      // 3. Active element tag and role guards
      const active = document.activeElement
      if (active) {
        const tagName = active.tagName.toUpperCase()
        if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tagName)) return
        if (active.getAttribute("role") === "tab") return
        if (tagName === "PRE" || active.closest("pre") !== null) return
      }

      // 4. Safe navigation
      if (e.key === "ArrowLeft" && prev) {
        router.push(prev.href)
      } else if (e.key === "ArrowRight" && next) {
        router.push(next.href)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prev, next, router])

  if (!prev && !next) return null

  return (
    <nav
      aria-label={`${typeLabel} sequential navigation`}
      className="mt-12 pt-8 border-t border-[var(--color-line)]"
    >
      <div className="flex items-center justify-between mb-4 text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)]">
        <span>Sequential Navigation</span>
        <span className="hidden sm:inline-flex items-center gap-1 opacity-70">
          Use <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-line)]">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-muted)] border border-[var(--color-line)]">→</kbd> keys
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="p-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-primary)] transition-all text-left group shadow-xs"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] mb-1.5">
              <span aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>Previous {typeLabel}</span>
            </div>
            <span className="text-sm md:text-base font-semibold text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-primary-strong)] transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            href={next.href}
            className="p-5 rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 hover:border-[var(--color-primary)] transition-all text-right group shadow-xs sm:col-start-2"
          >
            <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] mb-1.5">
              <span>Next {typeLabel}</span>
              <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
            <span className="text-sm md:text-base font-semibold text-[var(--color-text)] line-clamp-1 group-hover:text-[var(--color-primary-strong)] transition-colors">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
