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
            <p className="eyebrow">Roadmap</p>
            <h2>Learning journey and academic milestones.</h2>
          </div>
        </ScrollReveal>
        <div className="relative grid gap-4 max-w-[840px]">
          <div className="absolute left-[18px] top-2.5 bottom-2.5 w-[2px] bg-[var(--color-line)]" aria-hidden="true" />
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="relative ml-[54px] border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[22px]">
                <span
                  className="absolute left-[-44px] top-[26px] w-3.5 h-3.5 border-4 border-[var(--color-bg)] rounded-full bg-[var(--color-primary)] shadow-[0_0_0_2px_var(--color-primary)]"
                  aria-hidden="true"
                />
                <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.08em] uppercase">
                  {item.date}
                </span>
                <h3 className="text-[var(--color-text)] font-bold mt-1">{item.title}</h3>
                <p className="text-[var(--color-muted)] mt-3 text-sm">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}