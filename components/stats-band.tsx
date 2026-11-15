import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StatCounter } from "@/components/stat-counter"
import type { Stat } from "@/lib/types"

export function StatsBand({ stats: initialStats }: { stats?: Stat[] } = {}) {
  const stats = initialStats || getContent().stats

  return (
    <section className="section" aria-labelledby="stats-title">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading max-w-[640px]">
            <p className="eyebrow">Snapshot</p>
            <h2 id="stats-title">Numbers that show the trajectory.</h2>
          </div>
        </ScrollReveal>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-xl overflow-hidden shadow-xs">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label}>
              <div className="bg-[var(--color-surface)] p-6 md:p-7 h-full flex flex-col justify-between">
                <dd className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-[var(--color-text)] tracking-tight tabular-nums">
                  <StatCounter value={stat.value} />
                </dd>
                <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mt-3">
                  {stat.label}
                </dt>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
