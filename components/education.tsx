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
              Formal degree coursework at the Institute of Information Technology, University of Dhaka.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="mt-5 pt-4 border-t border-[var(--color-line)] overflow-x-auto">
                    <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-2 font-medium">
                      Admission Test Results
                    </p>
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
                          <tr key={r.university} className="border-b border-[var(--color-line)]/50">
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
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
