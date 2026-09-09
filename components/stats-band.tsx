import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function StatsBand() {
  const stats = getContent().stats

  return (
    <section className="section" aria-labelledby="stats-title">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading max-w-[640px]">
            <p className="eyebrow">Snapshot</p>
            <h2 id="stats-title">Numbers that show the trajectory.</h2>
          </div>
        </ScrollReveal>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-xl overflow-hidden">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label}>
              <div className="bg-[var(--color-surface)] p-6 md:p-7 h-full">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex flex-col gap-2">
                  <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-[var(--color-text)] tracking-tight tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
