"use client"

import { useState, useMemo } from "react"
import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Notes() {
  const notes = getContent().notes
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      notes.filter((n) => {
        const haystack = `${n.title} ${n.summary} ${n.tags.join(" ")}`.toLowerCase()
        return haystack.includes(search.toLowerCase())
      }),
    [search, notes]
  )

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr))
  }

  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="notes">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Blog & Notes</p>
            <h2>Short learning notes.</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 mb-[22px] max-md:flex-col max-md:items-stretch">
            <label className="grid gap-2 w-full max-w-[430px] text-sm font-bold text-[var(--color-muted)]">
              <span>Search notes</span>
              <input
                type="search"
                placeholder="Try database, C, backend..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0"
              />
            </label>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((note) => (
            <ScrollReveal key={note.title}>
              <article className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[22px] hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180">
                <time className="text-[var(--color-accent)] text-xs font-extrabold">{formatDate(note.date)}</time>
                <h3 className="text-[var(--color-text)] font-bold mt-1">{note.title}</h3>
                <p className="text-[var(--color-muted)] mt-3 text-sm">{note.summary}</p>
                <div className="flex flex-wrap gap-2 mt-[18px]">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center min-h-7 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="p-6 border border-dashed border-[var(--color-line)] rounded-lg text-center text-[var(--color-muted)]">
            No notes match that search.
          </p>
        )}
      </div>
    </section>
  )
}