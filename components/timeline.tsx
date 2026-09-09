import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Timeline() {
  const items = getContent().timeline

  return (
    <section className="section" id="journey">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Milestones & Leadership</p>
            <h2>Engineering journey and academic evolution.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              From early competitive problem solving to university, open-source work, and leadership roles.
            </p>
          </div>
        </ScrollReveal>
        <div className="relative grid gap-6 max-w-[860px]">
          <div
            className="absolute left-[7px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-line)] to-transparent"
            aria-hidden="true"
          />
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="relative ml-8 pl-2 py-2">
                <span
                  className="absolute -left-[7px] top-3 w-3.5 h-3.5 rounded-full bg-[var(--color-primary)] ring-4 ring-[var(--color-bg)]"
                  aria-hidden="true"
                />
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-accent)] font-medium">
                  {item.date}
                </p>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-text)] mt-2 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[var(--color-muted)] mt-2 text-[0.95rem] leading-relaxed max-w-[60ch]">
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
