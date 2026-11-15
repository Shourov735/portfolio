"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0d1515] text-[#edf7f4] font-sans flex items-center justify-center p-6 antialiased">
        <main className="max-w-md w-full bg-[#111b19] border border-[#263936] rounded-2xl p-8 text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#fb923c]/10 border border-[#fb923c]/20 text-[#fb923c] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-[#edf7f4]">
            Application Encountered an Error
          </h1>
          <p className="mt-2 text-sm text-[#a6bbb5] leading-relaxed">
            A critical error occurred while rendering the portfolio layout. You can attempt to reload the
            application.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full py-2.5 px-4 rounded-lg bg-[#2dd4bf] hover:bg-[#5eead4] text-[#0d1515] font-semibold text-sm transition-colors cursor-pointer"
            >
              Reload Application
            </button>
            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-lg bg-[#172522] hover:bg-[#263936] text-[#a6bbb5] hover:text-[#edf7f4] font-mono text-xs transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
          {error.digest && (
            <p className="mt-6 text-[10px] font-mono text-[#58706a]">Error Digest: {error.digest}</p>
          )}
        </main>
      </body>
    </html>
  )
}
