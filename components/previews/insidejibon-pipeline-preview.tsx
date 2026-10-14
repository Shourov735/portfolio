"use client"

import { useState } from "react"

interface NodeInfo {
  title: string
  subtitle: string
  metric: string
  description: string
}

const NODES: Record<string, NodeInfo> = {
  ingest: {
    title: "YouTube Stream Ingest",
    subtitle: "Media Pipeline",
    metric: "0 Egress Bandwidth",
    description: "Proxies lecture streams and audio tracks without downloading heavy raw video to origin servers.",
  },
  worker: {
    title: "Cloudflare Edge Worker",
    subtitle: "Global Compute",
    metric: "<45ms Edge Response",
    description: "Serverless routing, rate-limiting, and authentication executing at 300+ edge locations worldwide.",
  },
  durable: {
    title: "Durable Objects Room",
    subtitle: "Stateful Live Sync",
    metric: "Zero-Latency Memory",
    description: "Single-point coordination actor maintaining real-time student presence and synchronized playback state.",
  },
  vectorize: {
    title: "Vectorize RAG Engine",
    subtitle: "Timestamp Citations",
    metric: "Cosine Sim 0.89",
    description: "Workers AI vector database matching conversational student questions to exact video timestamps.",
  },
}

export function InsideJibonPipelinePreview() {
  const [activeNode, setActiveNode] = useState<string>("vectorize")
  const [simulating, setSimulating] = useState(false)
  const [citation, setCitation] = useState<string | null>(null)

  const handleSimulate = () => {
    if (simulating) return
    setSimulating(true)
    setCitation(null)

    setTimeout(() => {
      setCitation("04:18 · 'State machine consensus in distributed systems'")
      setSimulating(false)
    }, 900)
  }

  const selected = NODES[activeNode]

  return (
    <div className="w-full h-full min-h-[300px] bg-[var(--color-surface-muted)]/80 p-4 md:p-5 flex flex-col justify-between font-sans select-none text-[var(--color-text)]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[var(--color-text)]">
            Zero-Egress Edge Pipeline
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)]">
          Cloudflare Stack
        </span>
      </div>

      {/* Interactive Architecture Flow Diagram */}
      <div className="relative py-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "ingest", label: "YT Stream", tag: "Ingest" },
            { id: "worker", label: "Workers Edge", tag: "Compute" },
            { id: "durable", label: "Durable Obj", tag: "Live State" },
            { id: "vectorize", label: "Vectorize RAG", tag: "AI Search" },
          ].map((n, idx) => {
            const isActive = activeNode === n.id
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setActiveNode(n.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isActive
                    ? "bg-[var(--color-surface)] border-[var(--color-primary)] shadow-xs ring-1 ring-[var(--color-primary)]/30"
                    : "bg-[var(--color-surface)]/70 border-[var(--color-line)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--color-muted)] uppercase mb-1">
                  <span>Step 0{idx + 1}</span>
                  <span className="text-[var(--color-primary-strong)] font-semibold">{n.tag}</span>
                </div>
                <p className="font-display text-xs md:text-sm font-semibold text-[var(--color-text)] truncate">
                  {n.label}
                </p>
                {isActive && (
                  <span className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                )}
              </button>
            )
          })}
        </div>

        {/* Pulsing connection line */}
        <div className="hidden sm:flex items-center justify-between px-6 my-2 text-xs text-[var(--color-primary)] font-mono opacity-60">
          <span>──➔</span>
          <span>──➔</span>
          <span>──➔</span>
        </div>
      </div>

      {/* Node Inspector Callout */}
      <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-display text-sm font-bold text-[var(--color-text)]">
                {selected.title}
              </h5>
              <span className="text-[10px] font-mono text-[var(--color-accent)] font-medium">
                {selected.subtitle}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-1 leading-relaxed">
              {selected.description}
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] border border-[var(--color-primary)]/20 font-semibold whitespace-nowrap shrink-0">
            {selected.metric}
          </span>
        </div>

        {/* Live Simulation Trigger */}
        <div className="mt-3 pt-2.5 border-t border-[var(--color-line)] flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleSimulate}
            disabled={simulating}
            className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-[var(--color-surface-muted)] hover:bg-[var(--color-line)] text-[var(--color-text)] border border-[var(--color-line)] transition-colors cursor-pointer disabled:opacity-50"
          >
            {simulating ? "Querying Vectorize..." : "Simulate RAG Query ⚡"}
          </button>

          <div className="text-[11px] font-mono text-[var(--color-primary-strong)] truncate">
            {citation ? (
              <span className="inline-flex items-center gap-1">
                <span>Citation:</span>
                <strong className="font-semibold">{citation}</strong>
              </span>
            ) : (
              <span className="text-[var(--color-muted)] text-[10px]">
                Click simulate to test timestamp retrieval
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
