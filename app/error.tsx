"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const [retrying, setRetrying] = useState(false)

  useEffect(() => {
    console.error("Unhandled route error:", error)
  }, [error])

  const isChunkError =
    error.name === "ChunkLoadError" ||
    error.message?.includes("Loading chunk") ||
    error.message?.includes("Failed to fetch dynamically imported module")

  const handleRetry = () => {
    setRetrying(true)
    if (isChunkError) {
      window.location.reload()
      return
    }
    reset()
    setTimeout(() => setRetrying(false), 500)
  }

  return (
    <div className="section pt-16 md:pt-20">
      <div className="container-main">
        <Breadcrumbs items={[{ name: "Md. Shourov", href: "/" }, { name: "Error" }]} />

        <div className="mt-16 max-w-2xl">
          <p className="eyebrow text-amber-600 dark:text-amber-400">
            {isChunkError ? "Update Available" : "Application Error"}
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-[var(--color-text)] leading-[1.02] tracking-tight text-balance">
            {isChunkError ? "A newer version of the site is ready." : "Something interrupted this view."}
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--color-muted)] leading-relaxed max-w-[60ch]">
            {isChunkError
              ? "A newly deployed bundle or network glitch prevented a script from loading. Reloading will fetch the latest assets."
              : "An unexpected runtime exception was encountered while rendering this page. You can attempt to recover the state or return to the homepage."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              disabled={retrying}
              className="btn-primary cursor-pointer disabled:opacity-60"
            >
              {retrying ? "Reloading..." : isChunkError ? "Reload Page" : "Try Again"}
            </button>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
            <Link href="/#contact" className="btn-ghost">
              Contact Shourov
            </Link>
          </div>

          {error.digest && (
            <div className="mt-10 pt-6 border-t border-[var(--color-line)]">
              <details className="text-xs font-mono text-[var(--color-muted)] cursor-pointer">
                <summary className="hover:text-[var(--color-text)] transition-colors select-none">
                  Diagnostic Reference ({error.digest})
                </summary>
                <div className="p-3 mt-2 rounded bg-[var(--color-surface-muted)] text-[var(--color-text)] overflow-x-auto">
                  <code>{error.message || "Unknown error"}</code>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
