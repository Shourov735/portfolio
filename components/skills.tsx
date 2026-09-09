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
            <h2>Languages, frameworks, and engineering tools.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              A balanced breakdown across systems programming, full-stack web, mobile ecosystems, and cloud
              infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors">
                <h3 className="font-display text-xl text-[var(--color-text)] tracking-tight mb-5">
                  {group.category}
                </h3>

                <ul className="grid gap-2 list-none p-0 m-0">
                  {group.items.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-text)] font-medium">{skill.name}</span>
                      <span className="text-[11px] font-mono text-[var(--color-muted)] tabular-nums">
                        {skill.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
