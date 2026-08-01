"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function StatsBand() {
  const stats = getContent().stats

  return (
    <section className="section bg-[var(--color-surface-muted)]/72" aria-labelledby="stats-title">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading max-w-[620px]">
            <p className="eyebrow">Snapshot</p>
            <h2 id="stats-title">Numbers that show the current trajectory.</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-4 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label}>
              <article className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[22px] hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180">
                <span className="block text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-none text-[var(--color-primary-strong)]">
                  {stat.value}
                </span>
                <span className="block mt-2.5 font-bold text-[var(--color-muted)]">{stat.label}</span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
