"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function NowLearning() {
  const items = getContent().now

  return (
    <section className="section" id="now">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Active Focus</p>
            <h2>Currently learning, exploring, and building.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              Deep dives and technical investigations I am pursuing outside daily coursework and production systems.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary-strong)]">
                    In Progress
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--color-text)]">{item.title}</h3>
                <p className="text-[var(--color-muted)] mt-2.5 text-sm leading-relaxed">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

