import React from "react"

interface LogoProps {
  size?: number
  showText?: boolean
  text?: string
  badge?: string
  subtitle?: string
  className?: string
}

export function Logo({
  size = 36,
  showText = true,
  text = "Shourov",
  badge,
  subtitle,
  className = "",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Brand Vector Icon */}
      <div
        className="relative shrink-0 transition-transform duration-200 ease-out group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 512 512"
          width={size}
          height={size}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(6,182,212,0.25)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a0f1d" />
              <stop offset="50%" stopColor="#0b162c" />
              <stop offset="100%" stopColor="#032024" />
            </linearGradient>

            <linearGradient id="logo-ribbon-top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>

            <linearGradient id="logo-ribbon-bot" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>

            <linearGradient id="logo-border-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Squircle Background Container */}
          <rect
            x="24"
            y="24"
            width="464"
            height="464"
            rx="116"
            fill="url(#logo-bg-grad)"
          />
          <rect
            x="24"
            y="24"
            width="464"
            height="464"
            rx="116"
            fill="none"
            stroke="url(#logo-border-grad)"
            strokeWidth="4"
          />

          {/* Core Radial Backlight */}
          <circle cx="256" cy="256" r="140" fill="#0d9488" opacity="0.12" />

          {/* Interlocking Dual-Ribbon S */}
          <g className="transition-all duration-300">
            {/* Top Ribbon */}
            <path
              d="M 344 140 L 204 140 C 172 140 146 166 146 198 L 146 210 C 146 238 168 262 196 268 L 306 288"
              stroke="url(#logo-ribbon-top)"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Bottom Ribbon */}
            <path
              d="M 206 224 L 316 244 C 344 250 366 274 366 302 L 366 314 C 366 346 340 372 308 372 L 168 372"
              stroke="url(#logo-ribbon-bot)"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[1.125rem] tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-180">
              {text}
            </span>
            {badge && (
              <span className="rounded bg-[var(--color-primary)]/10 px-1.5 py-0.5 text-[0.6875rem] font-mono font-semibold text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <span className="text-[0.75rem] text-[var(--color-muted)] font-medium -mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
