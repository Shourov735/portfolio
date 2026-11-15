"use client"

import { useEffect, useRef, useState } from "react"

export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "-20px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

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
