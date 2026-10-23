"use client"

import { useState } from "react"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // Clean code string
  const rawCode = typeof code === "string" ? code : String(code || "")
  const lines = rawCode.trimEnd().split("\n")
  const isLong = lines.length > 28
  const displayedLines = isLong && !expanded ? lines.slice(0, 28) : lines

  // Language / Filename badge
  const displayLang = filename || language || "code"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <div className={`my-6 rounded-2xl border border-[var(--color-line)] bg-[#0b1120] text-slate-200 overflow-hidden shadow-md font-mono text-xs ${className || ""}`}>
      {/* Header Chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs text-slate-400 select-none">
        {/* macOS Window Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
            {displayLang}
          </span>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-500"
          aria-label={copied ? "Code copied to clipboard" : "Copy code"}
        >
          {copied ? (
            <>
              <svg aria-hidden="true" className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              <span>Copy</span>
            </>
          )}
          <span className="sr-only" aria-live="polite">
            {copied ? "Code copied to clipboard" : ""}
          </span>
        </button>
      </div>

      {/* Code Container */}
      <div className="relative overflow-x-auto p-4 leading-relaxed">
        <pre className="m-0 p-0 font-mono text-xs text-slate-200">
          <code>
            {displayedLines.map((line, idx) => {
              const isAdded = line.startsWith("+ ") || line.startsWith("+")
              const isRemoved = line.startsWith("- ") || line.startsWith("-")

              let lineBg = ""
              let lineText = "text-slate-300"

              if (isAdded) {
                lineBg = "bg-emerald-500/15 -mx-4 px-4 block"
                lineText = "text-emerald-300"
              } else if (isRemoved) {
                lineBg = "bg-rose-500/15 -mx-4 px-4 block"
                lineText = "text-rose-300"
              }

              return (
                <div key={idx} className={`flex items-start ${lineBg}`}>
                  {/* Line Number */}
                  <span className="w-8 shrink-0 select-none text-right pr-4 text-slate-600 tabular-nums">
                    {idx + 1}
                  </span>
                  {/* Code Line Content */}
                  <span className={`${lineText} whitespace-pre`}>
                    {line}
                  </span>
                </div>
              )
            })}
          </code>
        </pre>

        {/* Collapsible Gradient Mask & Toggle */}
        {isLong && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b1120] to-transparent flex items-end justify-center pb-3">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 shadow-lg transition-all cursor-pointer"
            >
              Expand {lines.length - 28} more lines ↓
            </button>
          </div>
        )}
      </div>

      {/* Collapse Action when expanded */}
      {isLong && expanded && (
        <div className="flex justify-center pb-3 pt-1 border-t border-slate-800/60 bg-slate-900/40">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="px-4 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Collapse code ↑
          </button>
        </div>
      )}
    </div>
  )
}
