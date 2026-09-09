import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function NowLearning() {
  const items = getContent().now

  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="now">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Active Focus</p>
            <h2>Currently learning, exploring, and building.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              Deep dives and technical investigations I am pursuing outside coursework and production work.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"
                  />
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-primary-strong)]">
                    In progress
                  </span>
                </div>
                <h3 className="font-display text-lg text-[var(--color-text)] tracking-tight leading-snug">
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
