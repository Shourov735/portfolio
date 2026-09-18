"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function AdmissionResults() {
  const content = getContent() as unknown as {
    admissionResults?: Array<{ university: string; marks: string; merit: string }>
  }
  const results = content.admissionResults || []

  if (!results.length) return null

  return (
    <section className="section py-10 md:py-14" id="academic-merit">
      <div className="container-main max-w-[860px]">
        <ScrollReveal>
          <div className="border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 pb-4 border-b border-[var(--color-line)]">
              <div>
                <p className="eyebrow mb-1">Academic Milestone</p>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-text)] tracking-tight">
                  University Admission Test Results
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                Session 2023–2024
              </span>
            </div>

            <p className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed mb-6">
              National competitive admission test records across leading public science and engineering
              universities in Bangladesh.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-line)] text-[var(--color-muted)] font-mono uppercase text-[11px] tracking-wider">
                    <th className="text-left py-2.5 pr-4 font-medium">Institution</th>
                    <th className="text-left py-2.5 px-4 font-medium">Score</th>
                    <th className="text-right py-2.5 pl-4 font-medium">National Merit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)]/50">
                  {results.map((r) => (
                    <tr
                      key={r.university}
                      className="hover:bg-[var(--color-surface-muted)]/50 transition-colors"
                    >
                      <td className="py-3 pr-4 text-[var(--color-text)] font-medium">{r.university}</td>
                      <td className="py-3 px-4 text-[var(--color-muted)] font-mono text-xs">{r.marks}</td>
                      <td className="py-3 pl-4 text-right text-[var(--color-primary-strong)] font-mono font-semibold">
                        {r.merit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
