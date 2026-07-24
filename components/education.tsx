"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Education() {
  const items = getContent().education

  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="education">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic background.</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[22px] hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180">
                <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.08em] uppercase">
                  {item.duration}
                </span>
                <h3 className="text-[var(--color-text)] font-bold mt-1">{item.title}</h3>
                <p className="font-semibold text-[var(--color-text)] mt-1">{item.institution}</p>
                <p className="text-[var(--color-muted)] mt-2 text-sm">{item.summary}</p>
                {item.coursework && (
                  <div className="flex flex-wrap gap-2 mt-[18px]">
                    {item.coursework.map((c) => (
                      <span key={c} className="inline-flex items-center min-h-7 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-surface-muted)] text-[var(--color-muted)]">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                {item.results && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--color-line)]">
                          <th className="text-left py-2 pr-2 text-[var(--color-text)] font-bold">University</th>
                          <th className="text-left py-2 px-2 text-[var(--color-text)] font-bold">Marks</th>
                          <th className="text-left py-2 pl-2 text-[var(--color-text)] font-bold">Merit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.results.map((r) => (
                          <tr key={r.university} className="border-b border-[var(--color-line)]">
                            <td className="py-2 pr-2 text-[var(--color-muted)]">{r.university}</td>
                            <td className="py-2 px-2 text-[var(--color-muted)]">{r.marks}</td>
                            <td className="py-2 pl-2 text-[var(--color-muted)]">{r.merit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}