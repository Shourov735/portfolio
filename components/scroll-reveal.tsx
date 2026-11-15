"use client"

import { useRef, useEffect } from "react"

export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }

    const rect = el.getBoundingClientRect()
    // If the element is already inside or near the initial viewport, leave it visible
    if (rect.top < window.innerHeight * 0.95) {
      return
    }

    // Only for elements strictly below the initial viewport, apply hidden state and observe
    el.style.opacity = "0"
    el.style.transform = "translateY(18px)"

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
          observer.unobserve(el)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: "opacity 520ms ease, transform 520ms ease",
      }}
    >
      {children}
    </div>
  )
}
