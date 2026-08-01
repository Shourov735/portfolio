"use client"

import { useEffect, useState } from "react"

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-5 bottom-5 z-50 grid w-11 h-11 place-items-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-primary-strong)] shadow-sm transition-all duration-160 ${
        show
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none translate-y-2.5"
      }`}
      type="button"
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
