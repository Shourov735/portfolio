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
            <p className="eyebrow">Honors & Competitions</p>
            <h2>Competitive programming milestones & recognition.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              National contest participations, leadership appointments, and university level programming achievements.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] flex items-center justify-center mb-4 border border-[var(--color-primary)]/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-text)] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-muted)] mt-2.5 text-sm leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

