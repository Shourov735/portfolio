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
            <p className="eyebrow">Academic Foundation</p>
            <h2>Rigorous computer science & software engineering education.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              Formal degree coursework at IIT, University of Dhaka, coupled with national admission merit
              records.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors flex flex-col">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-accent)] font-medium">
                    {item.duration}
                  </p>
                  <h3 className="font-display text-xl text-[var(--color-text)] mt-3 tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[13px] text-[var(--color-primary-strong)] mt-1.5">
                    {item.institution}
                  </p>
                  <p className="text-[var(--color-muted)] mt-4 text-sm leading-relaxed">{item.summary}</p>
                  {item.coursework && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.coursework.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {item.results && (
                  <div className="mt-5 pt-4 border-t border-[var(--color-line)]">
                    <div className="rounded-lg bg-[var(--color-surface-muted)] p-3 border border-[var(--color-line)] text-xs text-[var(--color-muted)] mb-3">
                      <p className="font-semibold text-[var(--color-text)] mb-1">
                        National Selectivity Context:
                      </p>
                      <p className="leading-relaxed">
                        Ranked 3rd nationally (Rajshahi University, Unit C-1) and Top 0.5% nationally (IIT, University of Dhaka) among 100,000+ competitive applicants.
                      </p>
                    </div>

                    <details className="group border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] overflow-hidden">
                      <summary className="flex items-center justify-between p-3 cursor-pointer text-xs font-mono uppercase tracking-wider text-[var(--color-primary-strong)] hover:bg-[var(--color-surface-muted)] transition-colors select-none">
                        <span>View National Admission Merit Breakdown</span>
                        <span
                          aria-hidden="true"
                          className="text-[var(--color-muted)] transition-transform duration-200 group-open:rotate-180"
                        >
                          ▼
                        </span>
                      </summary>
                      <div className="p-3 pt-1 border-t border-[var(--color-line)] overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-[var(--color-line)] text-[var(--color-muted)]">
                              <th className="text-left py-1.5 pr-2 font-medium">University</th>
                              <th className="text-left py-1.5 px-2 font-medium">Marks</th>
                              <th className="text-left py-1.5 pl-2 font-medium">Merit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.results.map((r) => (
                              <tr key={r.university} className="border-b border-[var(--color-line)]/50 last:border-b-0">
                                <td className="py-1.5 pr-2 text-[var(--color-muted)]">{r.university}</td>
                                <td className="py-1.5 px-2 text-[var(--color-muted)] font-mono">{r.marks}</td>
                                <td className="py-1.5 pl-2 text-[var(--color-primary-strong)] font-semibold font-mono">
                                  {r.merit}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
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
