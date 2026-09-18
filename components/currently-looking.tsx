"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

export function CurrentlyLooking() {
  return (
    <section className="section py-8 md:py-12" id="opportunities">
      <div className="container-main max-w-[860px]">
        <ScrollReveal>
          <div className="border border-[var(--color-primary)]/30 rounded-xl bg-gradient-to-r from-[var(--color-surface)] to-[var(--color-surface-muted)] p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-primary-strong)] font-semibold">
                  Currently Looking For
                </span>
              </div>
              <p className="text-sm md:text-base text-[var(--color-text)] font-medium leading-relaxed max-w-[54ch]">
                Software engineering internship and junior engineering opportunities where I can work on
                backend, full-stack, cloud, or systems-oriented problems.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Backend", "Full-Stack", "Cloud & Edge", "Systems"].map((area) => (
                  <span
                    key={area}
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/#contact"
              className="btn-primary shrink-0 self-start sm:self-center whitespace-nowrap text-xs"
            >
              Get in Touch →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
