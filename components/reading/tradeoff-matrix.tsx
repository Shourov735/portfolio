import type { ArchitectureDecision } from "@/lib/types"

interface TradeoffMatrixProps {
  adrs?: ArchitectureDecision[]
}

export function TradeoffMatrix({ adrs }: TradeoffMatrixProps) {
  if (!adrs || adrs.length === 0) return null

  return (
    <section className="my-12 scroll-mt-24" id="architecture-decisions" aria-labelledby="adrs-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Architecture Decision Records (ADRs)
        </span>
      </div>
      <h2
        id="adrs-heading"
        className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight"
      >
        Trade-Off Analysis & Architectural Rationale
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {adrs.map((adr, index) => (
          <div
            key={index}
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]/70 p-5 md:p-6 shadow-xs hover:border-[var(--color-line)] transition-all"
          >
            {/* Decision vs Rejected */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[var(--color-line)]">
              {/* Decision Chosen */}
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-xs shrink-0 mt-0.5">
                  ✓
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-0.5">
                    Decision Made
                  </span>
                  <p className="text-sm font-semibold text-[var(--color-text)] leading-snug">
                    {adr.decision}
                  </p>
                </div>
              </div>

              {/* Rejected Alternative */}
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-mono text-xs shrink-0 mt-0.5">
                  ✕
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold block mb-0.5">
                    Alternative Rejected
                  </span>
                  <p className="text-sm font-medium text-[var(--color-muted)] line-through decoration-rose-500/40 leading-snug">
                    {adr.rejected}
                  </p>
                </div>
              </div>
            </div>

            {/* Why it Won & Trade-off Accepted */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs md:text-[13px] leading-relaxed">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] font-medium block mb-1">
                  Why It Won (Technical Rationale)
                </span>
                <p className="text-[var(--color-text)]">{adr.rationale}</p>
              </div>

              {adr.tradeOff && (
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-medium block mb-1">
                    Trade-Off Accepted
                  </span>
                  <p className="text-[var(--color-muted)]">{adr.tradeOff}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
