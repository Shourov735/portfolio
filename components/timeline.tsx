"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Timeline() {
  const items = getContent().timeline

  return (
    <section className="section" id="journey">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Milestones & Leadership</p>
            <h2>Engineering journey and academic evolution.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              From early competitive problem solving to university entrance, open-source work, and leadership roles.
            </p>
          </div>
        </ScrollReveal>
        <div className="relative grid gap-6 max-w-[840px] pl-2">
          <div
            className="absolute left-[26px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-line)] to-transparent"
            aria-hidden="true"
          />
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="relative ml-14 border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all duration-200">
                <span
                  className="absolute -left-[45px] top-6 w-4 h-4 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-bg)] shadow-xs"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)] mt-1">{item.title}</h3>
                <p className="text-[var(--color-muted)] mt-2 text-sm leading-relaxed">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

