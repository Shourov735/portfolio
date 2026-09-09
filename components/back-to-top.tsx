"use client"

import { useEffect, useState } from "react"

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
      aria-label="Back to top"
      title="Back to top"
      className={`fixed right-5 bottom-5 z-50 grid w-11 h-11 place-items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] hover:border-[var(--color-primary)] shadow-md transition-all duration-200 ${
        show
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-2.5"
      }`}
    >
      <span aria-hidden="true" className="text-base">
        ↑
      </span>
    </button>
  )
}
