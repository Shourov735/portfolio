"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Skills() {
  const groups = getContent().skills

  return (
    <section className="section" id="skills">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>Technology stack with clear learning levels.</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <article className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180">
                <h3 className="text-lg font-bold mb-[18px] text-[var(--color-text)]">{group.category}</h3>
                <div className="grid gap-4">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="grid gap-[7px]">
                      <div className="flex justify-between gap-3 text-sm font-bold text-[var(--color-muted)]">
                        <span className="text-[var(--color-text)]">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div
                        className="h-2 rounded-full bg-[var(--color-surface-muted)] overflow-hidden"
                        aria-hidden="true"
                      >
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
