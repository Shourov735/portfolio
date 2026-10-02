import React from "react"

interface LogoProps {
  size?: number
  showText?: boolean
  text?: string
  badge?: string
  subtitle?: string
  className?: string
  variant?: "full" | "symbol" | "wordmark"
}

export function Logo({
  size = 32,
  showText = true,
  text = "Shourov",
  badge,
  subtitle,
  className = "",
  variant = "full",
}: LogoProps) {
  const showSymbol = variant !== "wordmark"
  const renderText = variant !== "symbol" && showText

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Brand Vector Geometric Mark */}
      {showSymbol && (
        <div
          className="relative shrink-0 flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105"
          style={{ width: size, height: size }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 512 512"
            width={size}
            height={size}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[var(--color-primary)] group-hover:text-[var(--color-primary-strong)] transition-colors duration-180"
          >
            {/* Precision Engineered S Monolith (100% C2 Rotational Symmetry) */}
            <path
              d="M 396 148 L 396 96 L 168 96 L 104 160 L 104 236 L 164 296 L 332 296 L 352 316 L 352 344 L 332 364 L 116 364 L 116 416 L 344 416 L 408 352 L 408 276 L 348 216 L 180 216 L 160 196 L 160 168 L 180 148 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}

      {/* Typography Wordmark */}
      {renderText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[1.125rem] tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-180 leading-none">
              {text}
            </span>
            {badge && (
              <span className="rounded bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[0.6875rem] font-mono font-semibold text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-[0.75rem] text-[var(--color-muted)] font-medium -mt-0.5">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  )
}

