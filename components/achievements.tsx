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
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              National contest participations, leadership appointments, and university level programming
              achievements.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors">
                <div
                  aria-hidden="true"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[var(--color-text)] text-[var(--color-bg)] mb-5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider">★</span>
                </div>
                <h3 className="font-display text-lg text-[var(--color-text)] leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted)] mt-3 text-sm leading-relaxed">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
