"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Achievements() {
  const items = getContent().achievements

  return (
    <section className="section" id="achievements">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Achievements</p>
            <h2>Highlights worth building on.</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[22px] hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180">
                <h3 className="text-[var(--color-text)] font-bold">{item.title}</h3>
                <p className="text-[var(--color-muted)] mt-3 text-sm">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
