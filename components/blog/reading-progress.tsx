"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      const article = document.querySelector("article[data-blog-content]")
      if (!article) return
      const rect = article.getBoundingClientRect()
      const total = rect.height
      const visible = Math.min(Math.max(window.innerHeight - rect.top, 0), total)
      const pct = total > 0 ? Math.min(100, Math.max(0, (visible / total) * 100)) : 0
      setProgress(pct)
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[3px] z-40 pointer-events-none"
    >
      <div
        className="h-full bg-[var(--color-primary)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
