"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion || !isInView) {
      return
    }

    const match = value.match(/^(\d+)(\+)?$/)
    if (!match) {
      return
    }

    const targetNumber = parseInt(match[1], 10)
    const suffix = match[2] || ""
    const duration = 1200
    const startTime = performance.now()

    let animationFrameId: number

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(ease * targetNumber)

      setDisplayValue(`${current}${suffix}`)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount)
      } else {
        setDisplayValue(value)
      }
    }

    animationFrameId = requestAnimationFrame(updateCount)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  )
}

export function StatsBand() {
  const stats = getContent().stats

  return (
    <section className="section" aria-labelledby="stats-title">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading max-w-[640px]">
            <p className="eyebrow">Snapshot</p>
            <h2 id="stats-title">Numbers that show the trajectory.</h2>
          </div>
        </ScrollReveal>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--color-line)] border border-[var(--color-line)] rounded-xl overflow-hidden shadow-xs">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label}>
              <div className="bg-[var(--color-surface)] p-6 md:p-7 h-full flex flex-col justify-between">
                <dd className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-[var(--color-text)] tracking-tight tabular-nums">
                  <StatCounter value={stat.value} />
                </dd>
                <dt className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mt-3">
                  {stat.label}
                </dt>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
