"use client"

import { useState } from "react"

export function NabodigontoAuditPreview() {
  const [tab, setTab] = useState<"audit" | "memberId">("audit")
  const [officer1Confirmed, setOfficer1Confirmed] = useState(true)
  const [officer2Confirmed, setOfficer2Confirmed] = useState(true)
  const [flipped, setFlipped] = useState(false)

  const isMatched = officer1Confirmed && officer2Confirmed

  return (
    <div className="w-full h-full min-h-[320px] bg-[var(--color-surface-muted)]/80 p-4 md:p-5 flex flex-col justify-between font-sans select-none text-[var(--color-text)]">
      {/* Top Bar / Tab Switcher */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3 mb-3">
        <div className="flex items-center gap-1.5 bg-[var(--color-surface)] p-1 rounded-lg border border-[var(--color-line)]">
          <button
            type="button"
            onClick={() => setTab("audit")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "audit"
                ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Dual-Admin Audit
          </button>
          <button
            type="button"
            onClick={() => setTab("memberId")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "memberId"
                ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Digital Member ID
          </button>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)] hidden sm:inline-block">
          Interactive Architecture Preview
        </span>
      </div>

      {/* Audit Protocol Tab */}
      {tab === "audit" && (
        <div className="flex-1 flex flex-col justify-between py-1">
          {/* Treasury Vault Display */}
          <div
            className={`p-4 rounded-xl border transition-all duration-300 ${
              isMatched
                ? "bg-emerald-500/10 border-emerald-500/40 dark:bg-emerald-950/20 shadow-xs"
                : "bg-[var(--color-surface)] border-[var(--color-line)]"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
                {isMatched ? "Monthly Closing Balance (Reconciled)" : "Starting Balance Pending Confirmation"}
              </span>
              <span
                className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold ${
                  isMatched
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                }`}
              >
                {isMatched ? "● Reconciled (Matched)" : "○ Awaiting Officer 2"}
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-1">
              <span className="font-display text-2xl md:text-3xl tracking-tight text-[var(--color-text)] tabular-nums transition-all">
                {isMatched ? "৳ 89,200.00" : "৳ Pending..."}
              </span>
              <span className="text-xs font-mono text-[var(--color-muted)]">
                {isMatched ? "BDT · Cash + Bank Matched" : "Two-Officer Verification"}
              </span>
            </div>

            <p className="text-[11px] text-[var(--color-muted)] mt-1.5 leading-snug">
              {isMatched
                ? "Reconciliation clean: Starting balance ৳45k + collections ৳62.5k - expenses ৳18.3k equals counted cash and bank statements."
                : "Dual-control lock: Finance Director and System Admin must independently submit matching starting balances."}
            </p>
          </div>

          {/* Dual-Officer Controls */}
          <div className="mt-4 pt-3 border-t border-[var(--color-line)]">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-2">
              Independent Officer Inputs (Click to test verification):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOfficer1Confirmed(!officer1Confirmed)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  officer1Confirmed
                    ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-medium"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase">Officer 1: Finance Lead</span>
                  <span>{officer1Confirmed ? "✓" : "○"}</span>
                </div>
                <p className="font-mono text-[11px] mt-0.5 text-[var(--color-text)]">
                  {officer1Confirmed ? "৳ 45,000.00 (Submitted)" : "Enter Starting Balance"}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setOfficer2Confirmed(!officer2Confirmed)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  officer2Confirmed
                    ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-medium"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase">Officer 2: IT Secretary</span>
                  <span>{officer2Confirmed ? "✓" : "○"}</span>
                </div>
                <p className="font-mono text-[11px] mt-0.5 text-[var(--color-text)]">
                  {officer2Confirmed ? "৳ 45,000.00 (Matched)" : "Enter Starting Balance"}
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Member ID Tab */}
      {tab === "memberId" && (
        <div className="flex-1 flex flex-col items-center justify-center py-1">
          <div
            onClick={() => setFlipped(!flipped)}
            className="w-full max-w-[340px] aspect-[1.75/1] rounded-xl p-4 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface-muted)] border border-[var(--color-line)] shadow-md flex flex-col justify-between cursor-pointer hover:border-[var(--color-primary)] transition-all relative overflow-hidden group"
          >
            {/* Ambient scanner effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />

            {!flipped ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-mono tracking-widest text-[var(--color-primary-strong)] font-bold uppercase">
                      Nabodigonto Org
                    </p>
                    <p className="font-display font-bold text-base text-[var(--color-text)]">
                      Md. Shourov
                    </p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-end justify-between pt-2">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-mono text-[var(--color-muted)] uppercase">Role</p>
                    <p className="text-xs font-mono font-semibold text-[var(--color-text)]">
                      IT Secretary &amp; Lead
                    </p>
                    <p className="text-[10px] font-mono text-[var(--color-muted)]">ID: ND-2024-001</p>
                  </div>

                  {/* QR Code Graphic */}
                  <div className="w-10 h-10 border border-[var(--color-line)] rounded bg-white p-1 grid grid-cols-3 gap-0.5">
                    <div className="bg-black rounded-xs" />
                    <div className="bg-black rounded-xs" />
                    <div className="bg-slate-300 rounded-xs" />
                    <div className="bg-black rounded-xs" />
                    <div className="bg-transparent" />
                    <div className="bg-black rounded-xs" />
                    <div className="bg-slate-400 rounded-xs" />
                    <div className="bg-black rounded-xs" />
                    <div className="bg-black rounded-xs" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-between h-full text-left">
                <div>
                  <p className="text-[9px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                    Digital Verification Route
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text)] font-semibold mt-1">
                    /verify/nd_vfy_9f8a21c4
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-muted)] mt-1">
                    Blood Group: B+ · Joined: 2024
                  </p>
                </div>
                <div className="border-t border-[var(--color-line)] pt-2 flex justify-between items-center text-[10px] font-mono text-[var(--color-muted)]">
                  <span>Executive Committee</span>
                  <span className="text-[var(--color-primary-strong)]">Verified on D1</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] font-mono text-[var(--color-muted)] mt-3">
            Click card to flip between credentials &amp; verification endpoint.
          </p>
        </div>
      )}
    </div>
  )
}
