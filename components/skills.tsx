import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Skills() {
  const groups = getContent().skills

  return (
    <section className="section" id="skills">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Technical Competence</p>
            <h2>Skills categorized by practical experience.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              Organized by depth and frequency of use in real-world platforms and academic systems — without
              arbitrary percentages.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl text-[var(--color-text)] tracking-tight">
                      {group.category}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary-strong)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20">
                      {group.items.length} techs
                    </span>
                  </div>

                  {group.description && (
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-5 min-h-[32px]">
                      {group.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-line)]">
                    {group.items.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)] hover:border-[var(--color-primary)]/50 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
