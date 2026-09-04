"use client"

import { useState, useMemo } from "react"
import { getContent } from "@/lib/content"
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
            <p className="eyebrow">Engineering Writings</p>
            <h2>Technical notes, architecture logs & takeaways.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              Brief write-ups documenting software engineering challenges, systems insights, and practical learnings.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8 max-w-[380px]">
            <input
              type="search"
              placeholder="Search notes by keyword or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-2.5 text-sm transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_var(--color-primary)/15] focus:outline-0"
            />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((note) => (
            <ScrollReveal key={note.title}>
              <article className="h-full flex flex-col justify-between border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200">
                <div>
                  <time className="text-[var(--color-accent)] text-xs font-extrabold uppercase tracking-wider">
                    {formatDate(note.date)}
                  </time>
                  <h3 className="text-lg font-bold text-[var(--color-text)] mt-2">{note.title}</h3>
                  <p className="text-[var(--color-muted)] mt-2.5 text-sm leading-relaxed">{note.summary}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[var(--color-line)]/60">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]/50"
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
          <div className="p-12 border border-dashed border-[var(--color-line)] rounded-xl text-center bg-[var(--color-surface)] mt-6">
            <p className="text-[var(--color-muted)] font-medium">
              No notes found matching &ldquo;{search}&rdquo;.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-xs font-bold text-[var(--color-primary-strong)] hover:underline"
            >
              Reset search
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

