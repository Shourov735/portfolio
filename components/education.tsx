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
              Formal degree coursework at IIT, University of Dhaka, coupled with national admission merit records.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ScrollReveal key={item.title}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm p-6 hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between">
                <div>
                  <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                    {item.duration}
                  </span>
                  <h3 className="text-lg font-bold text-[var(--color-text)] mt-3">{item.title}</h3>
                  <p className="font-semibold text-[var(--color-primary-strong)] text-sm mt-1">{item.institution}</p>
                  <p className="text-[var(--color-muted)] mt-3 text-sm leading-relaxed">{item.summary}</p>
                  {item.coursework && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.coursework.map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]/60"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {item.results && (
                  <div className="mt-5 pt-4 border-t border-[var(--color-line)]/70 overflow-x-auto">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text)] mb-2">
                      Admission Test Results
                    </p>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[var(--color-line)] text-[var(--color-text)]">
                          <th className="text-left py-1.5 pr-2 font-bold">University</th>
                          <th className="text-left py-1.5 px-2 font-bold">Marks</th>
                          <th className="text-left py-1.5 pl-2 font-bold">Merit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.results.map((r) => (
                          <tr key={r.university} className="border-b border-[var(--color-line)]/50">
                            <td className="py-1.5 pr-2 text-[var(--color-muted)] font-medium">{r.university}</td>
                            <td className="py-1.5 px-2 text-[var(--color-muted)]">{r.marks}</td>
                            <td className="py-1.5 pl-2 text-[var(--color-primary-strong)] font-bold">{r.merit}</td>
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

