import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function NowLearning() {
  const items = getContent().now

  return (
    <section className="section py-10 md:py-14 bg-[var(--color-surface-muted)]/72" id="now">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Now</p>
            <h2>Current technical focus.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-2 text-sm md:text-base">
              Active areas of deep study, software practice, and engineering growth.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[860px]">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-5 hover:border-[var(--color-primary)]/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse"
                  />
                  <h3 className="font-display text-base font-semibold text-[var(--color-text)] tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[var(--color-muted)] text-xs md:text-sm leading-relaxed pl-3.5 border-l border-[var(--color-line)]">
                  {item.summary}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
