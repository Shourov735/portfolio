import type { ReactNode } from "react"

export type CalloutType = "constraint" | "architecture" | "security" | "benchmark"

interface EngineeringCalloutProps {
  type: CalloutType
  title?: string
  children: ReactNode
}

const CALLOUT_CONFIG: Record<
  CalloutType,
  { label: string; border: string; bg: string; text: string; icon: string }
> = {
  constraint: {
    label: "OPERATIONAL CONSTRAINT",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10 dark:bg-amber-950/20",
    text: "text-amber-700 dark:text-amber-300",
    icon: "⚠",
  },
  architecture: {
    label: "ARCHITECTURAL INVARIANT",
    border: "border-[var(--color-primary)]/30",
    bg: "bg-[var(--color-primary)]/10",
    text: "text-[var(--color-primary-strong)]",
    icon: "◈",
  },
  security: {
    label: "SECURITY & THREAT MODEL",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10 dark:bg-purple-950/20",
    text: "text-purple-700 dark:text-purple-300",
    icon: "🔒",
  },
  benchmark: {
    label: "VERIFIED BENCHMARK",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10 dark:bg-cyan-950/20",
    text: "text-cyan-700 dark:text-cyan-300",
    icon: "⚡",
  },
}

export function EngineeringCallout({ type, title, children }: EngineeringCalloutProps) {
  const conf = CALLOUT_CONFIG[type] || CALLOUT_CONFIG.architecture

  return (
    <aside
      className={`my-6 rounded-2xl border ${conf.border} ${conf.bg} p-5 text-sm shadow-xs transition-all`}
      role="region"
      aria-label={title || conf.label}
    >
      <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-wider font-semibold">
        <span aria-hidden="true">{conf.icon}</span>
        <span className={conf.text}>{title || conf.label}</span>
      </div>
      <div className="text-sm leading-relaxed text-[var(--color-text)] space-y-2">
        {children}
      </div>
    </aside>
  )
}
