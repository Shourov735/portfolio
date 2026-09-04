"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

function getCategoryIcon(category: string) {
  if (category.includes("Languages")) {
    return (
      <svg className="w-5 h-5 text-[var(--color-primary-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  }
  if (category.includes("Frontend")) {
    return (
      <svg className="w-5 h-5 text-[var(--color-primary-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
  if (category.includes("Backend")) {
    return (
      <svg className="w-5 h-5 text-[var(--color-primary-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5 text-[var(--color-primary-strong)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  )
}

export function Skills() {
  const groups = getContent().skills

  return (
    <section className="section" id="skills">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Technical Competence</p>
            <h2>Languages, frameworks, and engineering tools.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              A balanced breakdown across systems programming, full-stack web, mobile ecosystems, and cloud infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--color-line)]/70">
                  <div className="p-2 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-line)]/60">
                    {getCategoryIcon(group.category)}
                  </div>
                  <h3 className="text-base font-bold text-[var(--color-text)] leading-tight">
                    {group.category}
                  </h3>
                </div>

                <div className="grid gap-3.5">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="grid gap-1.5">
                      <div className="flex justify-between items-center text-xs font-semibold text-[var(--color-muted)]">
                        <span className="text-[var(--color-text)] font-bold">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div
                        className="h-1.5 rounded-full bg-[var(--color-surface-muted)] overflow-hidden"
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

