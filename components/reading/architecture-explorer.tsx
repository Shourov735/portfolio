"use client"

import { useState } from "react"

interface ArchitectureExplorerProps {
  slug: string
}

export function ArchitectureExplorer({ slug }: ArchitectureExplorerProps) {
  switch (slug) {
    case "nabodigonto":
      return <NabodigontoExplorer />
    case "insidejibon":
      return <InsideJibonExplorer />
    case "arvaana":
      return <ArvaanaExplorer />
    case "quiz-management-and-examination-system":
    case "quiz-management":
      return <QuizManagementExplorer />
    case "image-comparison":
      return <ImageComparisonExplorer />
    case "remocomp":
      return <RemocompExplorer />
    default:
      return null
  }
}

// -------------------------------------------------------------
// 1. NABODIGONTO: 100k+ LOC Edge-Native Distributed Pipeline
// -------------------------------------------------------------
function NabodigontoExplorer() {
  const [activeModule, setActiveModule] = useState<"public" | "api" | "media" | "queue" | "auth">("api")

  const modules = {
    public: {
      name: "apps/web-public",
      runtime: "Vite + React 19 SPA",
      tag: "Zero-Auth Edge Delivery",
      badge: "Public Tier",
      latency: "12ms TTFB",
      summary: "Completely decoupled from authentication dependencies. Serves informational pages, program galleries, and emergency blood donor directories with zero Clerk SDK overhead.",
      specs: [
        "Eliminates 120KB+ auth runtime from public mobile visitors",
        "Offline JSON snapshot cached in browser for emergency blood lookups",
        "Edge-cached globally with instant invalidation",
      ],
    },
    api: {
      name: "services/api",
      runtime: "Hono.js on Cloudflare Workers",
      tag: "9 Modular Domains & D1 Batching",
      badge: "Core Service",
      latency: "38ms execution",
      summary: "Modular edge router partitioned into 9 domain modules (members, dues, welfare, donors, notifications, etc.). Executes multi-table mutations atomically via Cloudflare D1 batch statements.",
      specs: [
        "End-to-end type safety via packages/contracts & Hono RPC",
        "D1 batch() transactions prevent race conditions on distributed SQLite",
        "Zero long-lived TCP connection pool exhaustion risks",
      ],
    },
    media: {
      name: "services/media-service",
      runtime: "Cloudflare Worker + R2 Storage",
      tag: "Serverless Bengali PDF Engine",
      badge: "Media Worker",
      latency: "<40ms generation",
      summary: "Dedicated media processing worker. Uses pdf-lib and @pdf-lib/fontkit to perform in-memory OpenType glyph shaping for complex Bengali typography, streaming vector PDFs directly to Cloudflare R2.",
      specs: [
        "Custom Kalpurush/SolaimanLipi TrueType font embedding",
        "Dynamic digital PVC membership ID cards with QR token routes (/verify/[token])",
        "Presigned R2 uploads with magic-byte validation under 25MB RAM",
      ],
    },
    queue: {
      name: "services/notification-service",
      runtime: "Cloudflare Queues Consumer",
      tag: "4-Channel Notification Fanout",
      badge: "Async Queue",
      latency: "Background async",
      summary: "Asynchronous worker consuming Cloudflare Queues payloads. Fans out transactional messages across 4 independent delivery channels with exponential backoff and dead-letter queueing.",
      specs: [
        "Bangladeshi SMS Gateway (OneCodeSoft) for members without data access",
        "Transactional email receipts with PDF download links via Resend",
        "Real-time Web Push (VAPID) and Mobile Push (Firebase Cloud Messaging)",
      ],
    },
    auth: {
      name: "packages/auth",
      runtime: "Stateless Edge Middleware",
      tag: "Networkless JWT Verification",
      badge: "Security Layer",
      latency: "<2ms verify",
      summary: "Shared security package enforcing role-based access control across 6 organizational tiers (General Member, Volunteer, Donor, Finance Lead, Admin, IT Secretary).",
      specs: [
        "Stateless cryptographic JWT verification in V8 edge isolates",
        "Fine-grained route guard middleware shared across Hono and Next.js",
        "Zero external database trips for session token validation",
      ],
    },
  }

  const current = modules[activeModule]

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="nabo-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="nabo-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        100k+ LOC Edge-Native Distributed Monorepo &amp; Pipeline
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        {/* Module Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {(["api", "media", "queue", "public", "auth"] as const).map((key) => {
            const mod = modules[key]
            const isSelected = activeModule === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveModule(key)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-semibold shadow-xs"
                    : "bg-[var(--color-surface-muted)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40 hover:text-[var(--color-text)]"
                }`}
              >
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-0.5">
                  {mod.badge}
                </span>
                <span className="block text-xs font-mono font-medium truncate">
                  {mod.name.split("/")[1] || mod.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="p-5 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-surface-muted)] transition-all">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <span className="text-[11px] font-mono text-[var(--color-primary)] font-semibold uppercase tracking-wider">
                {current.runtime}
              </span>
              <h3 className="font-mono text-base md:text-lg font-bold text-[var(--color-text)] mt-0.5">
                {current.name} &mdash; {current.tag}
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30">
              ● {current.latency}
            </span>
          </div>

          <p className="text-xs md:text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            {current.summary}
          </p>

          <div className="pt-4 border-t border-[var(--color-line)]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-2 font-medium">
              Verified Architectural Guarantees:
            </span>
            <ul className="grid gap-2 list-none p-0 m-0">
              {current.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text)] font-mono">
                  <span className="text-emerald-500 shrink-0">✓</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 2. INSIDEJIBON: Zero-Egress Edge Pipeline & Vectorize RAG
// -------------------------------------------------------------
function InsideJibonExplorer() {
  const [activeNode, setActiveNode] = useState("vectorize")
  const [simulating, setSimulating] = useState(false)
  const [citation, setCitation] = useState<string | null>(null)

  const nodes: Record<string, { title: string; metric: string; desc: string }> = {
    ingest: {
      title: "YouTube Video Ingest (oEmbed)",
      metric: "$0 Egress Cost",
      desc: "Queries public YouTube oEmbed endpoint server-side to validate links and extract metadata with 0 API keys and zero cloud storage bills.",
    },
    worker: {
      title: "Cloudflare Workers Edge",
      metric: "<45ms Edge Response",
      desc: "Next.js 16 App Router running globally on OpenNext with Tag Cache invalidation and lightweight projection SQL queries.",
    },
    durable: {
      title: "Durable Objects Room",
      metric: "Real-Time WebSockets",
      desc: "Stateful edge actor managing student presence, live chat moderation, hand-raising, and attendance without third-party subscriptions.",
    },
    vectorize: {
      title: "Workers AI + Vectorize RAG",
      metric: "Cosine Sim 0.89",
      desc: "Indexes lecture video auto-captions in Vectorize and uses BGE embeddings to return exact-second timestamp citations for student questions.",
    },
  }

  const handleSimulate = () => {
    if (simulating) return
    setSimulating(true)
    setCitation(null)
    setTimeout(() => {
      setCitation("04:18 · 'State machine consensus in distributed systems'")
      setSimulating(false)
    }, 700)
  }

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="inside-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="inside-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        $0-Cost Zero-Egress Edge Architecture
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        {/* Node Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {Object.entries(nodes).map(([key, n]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveNode(key)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                activeNode === key
                  ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-semibold shadow-xs"
                  : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40"
              }`}
            >
              <span className="text-[10px] font-mono uppercase tracking-wider block text-[var(--color-primary)] mb-1">
                {n.metric}
              </span>
              <span className="line-clamp-1 text-[var(--color-text)] font-semibold">{n.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Node Details */}
        <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-line)]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {nodes[activeNode].title}
            </span>
            <span className="text-xs font-mono text-[var(--color-primary-strong)] font-semibold">
              {nodes[activeNode].metric}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            {nodes[activeNode].desc}
          </p>
        </div>

        {/* Live Vectorize Simulation Widget */}
        <div className="mt-5 pt-4 border-t border-[var(--color-line)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
              Test Semantic Caption Retrieval:
            </span>
            <button
              type="button"
              onClick={handleSimulate}
              disabled={simulating}
              className="btn-primary text-xs py-1.5 px-3 cursor-pointer"
            >
              {simulating ? "Querying Vectorize..." : "Ask: 'Where is consensus explained?'"}
            </button>
          </div>

          {citation && (
            <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono flex items-center justify-between text-emerald-800 dark:text-emerald-300">
              <span className="font-semibold">Timestamp Citation Found:</span>
              <span className="underline">{citation}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 3. ARVAANA: Scent Pyramid & Dynamic Volume Engine
// -------------------------------------------------------------
function ArvaanaExplorer() {
  const [selectedSize, setSelectedSize] = useState("30ML")
  const [copied, setCopied] = useState(false)

  const variants = [
    { size: "6ML", price: 450, badge: "Trial Size", label: "Pocket Flacon" },
    { size: "15ML", price: 980, badge: "Save 11%", label: "Travel Decant" },
    { size: "30ML", price: 1750, badge: "Save 17%", label: "Signature Edition" },
    { size: "50ML", price: 2650, badge: "Save 22%", label: "Collector Flacon" },
  ]

  const current = variants.find((v) => v.size === selectedSize) || variants[2]
  const whatsappPayload = `Salam ARVAANA! I would like to order: Oud Noir (${current.size} - ${current.label}) at ৳${current.price.toLocaleString("en-BD")}.`

  const copyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappPayload)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="arvaana-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="arvaana-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        Scent Pyramid & Reactive Concierge Engine
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        {/* Scent Notes Pyramid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
          <div className="p-3.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-semibold block mb-1">
              ▲ Top Notes (0-15m)
            </span>
            <p className="text-xs font-semibold text-[var(--color-text)]">Calabrian Bergamot · Wild Cardamom</p>
          </div>
          <div className="p-3.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-semibold block mb-1">
              ◆ Heart Notes (1-4h)
            </span>
            <p className="text-xs font-semibold text-[var(--color-text)]">Aged Cambodian Oud · Damascena Rose</p>
          </div>
          <div className="p-3.5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 font-semibold block mb-1">
              ■ Base Notes (8-16h)
            </span>
            <p className="text-xs font-semibold text-[var(--color-text)]">Grey Ambergris · Smoked Birch Leather</p>
          </div>
        </div>

        {/* Variant Engine */}
        <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-line)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] font-semibold">
              Select Volume Tier:
            </span>
            <span className="text-xs font-mono text-[var(--color-accent)] font-semibold">{current.badge}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {variants.map((v) => (
              <button
                key={v.size}
                type="button"
                onClick={() => setSelectedSize(v.size)}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                  selectedSize === v.size
                    ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-bold border-[var(--color-primary)]"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)]/40"
                }`}
              >
                <span className="text-xs block">{v.size}</span>
                <span className="text-[11px] font-mono opacity-80">৳{v.price}</span>
              </button>
            ))}
          </div>

          {/* WhatsApp Concierge Payload Preview */}
          <div className="pt-3 border-t border-[var(--color-line)] flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-[var(--color-muted)]">
              Payload: <span className="text-[var(--color-text)]">{whatsappPayload}</span>
            </div>
            <button
              type="button"
              onClick={copyWhatsApp}
              className="btn-secondary text-xs py-1.5 px-3 cursor-pointer"
            >
              {copied ? "✓ Copied Payload" : "Copy WhatsApp Payload"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 4. QUIZ MANAGEMENT: GoF Design Pattern Explorer
// -------------------------------------------------------------
function QuizManagementExplorer() {
  const [activePattern, setActivePattern] = useState<"strategy" | "factory" | "observer">("strategy")
  const [scoringStrategy, setScoringStrategy] = useState<"standard" | "negative" | "weighted">("negative")

  const calculateScore = () => {
    // 8 correct, 2 incorrect out of 10
    if (scoringStrategy === "standard") return "8.0 / 10.0 (+1 each, 0 penalty)"
    if (scoringStrategy === "negative") return "7.5 / 10.0 (+1 correct, -0.25 penalty)"
    return "22.0 / 26.0 (Bloom's Taxonomy weights: 3pt hard, 1pt easy)"
  }

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="quiz-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="quiz-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        GoF Design Pattern Engine (JavaFX 21 & Java 17)
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        {/* Pattern Switcher */}
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-line)] pb-3">
          {[
            { id: "strategy" as const, label: "Strategy (Scoring Algorithms)" },
            { id: "factory" as const, label: "Factory (Question Models)" },
            { id: "observer" as const, label: "Observer (Timer & Auto-Submit)" },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePattern(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activePattern === p.id
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Strategy Tab */}
        {activePattern === "strategy" && (
          <div>
            <p className="text-xs text-[var(--color-muted)] mb-3 leading-relaxed">
              The <strong>Strategy Pattern</strong> enables polymorphic scoring without modifying the exam runner thread. Select a strategy to evaluate 8 correct, 2 incorrect questions:
            </p>
            <div className="flex gap-2 mb-4">
              {(["standard", "negative", "weighted"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setScoringStrategy(mode)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider cursor-pointer ${
                    scoringStrategy === mode
                      ? "bg-[var(--color-primary)]/15 border border-[var(--color-primary)] text-[var(--color-primary-strong)] font-semibold"
                      : "bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-muted)]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="p-3.5 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-line)] font-mono text-xs text-[var(--color-text)]">
              Evaluated Result: <span className="font-bold text-[var(--color-primary-strong)]">{calculateScore()}</span>
            </div>
          </div>
        )}

        {/* Factory Tab */}
        {activePattern === "factory" && (
          <div className="p-3.5 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-line)] font-mono text-xs text-[var(--color-text)] space-y-2">
            <div className="text-[var(--color-primary-strong)] font-bold">
              {"// QuestionFactory.createQuestion(Type type, ResultSet rs)"}
            </div>
            <div>├── MCQQuestion: [Title, 4 Options, CorrectIndex]</div>
            <div>├── TrueFalseQuestion: [Statement, Boolean Answer]</div>
            <div>├── MultipleAnswerQuestion: [Prompt, Bitmask Key]</div>
            <div>└── FillInTheBlankQuestion: [Tokenized String, Normalized Answer]</div>
          </div>
        )}

        {/* Observer Tab */}
        {activePattern === "observer" && (
          <div className="p-3.5 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-line)] font-mono text-xs text-[var(--color-text)] space-y-2">
            <div className="text-[var(--color-primary-strong)] font-bold">
              {"// ExamTimerObservable & UI Subscriber Decoupling"}
            </div>
            <div>• ExamTimer thread ticks every 1000ms off the UI thread</div>
            <div>• Dispatches `Platform.runLater(() -{">"} listener.onTick(secondsRemaining))`</div>
            <div>• Triggers `listener.onTimeExpired()` to safely force auto-submission with 0 data loss</div>
          </div>
        )}
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 5. IMAGE-COMPARISON: PR #255 Recursive vs Iterative Diff Explorer
// -------------------------------------------------------------
function ImageComparisonExplorer() {
  const [mode, setMode] = useState<"before" | "after">("after")

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="img-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="img-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        PR #255: Recursive Flood-Fill vs Iterative ArrayDeque
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-line)] pb-3">
          <button
            type="button"
            onClick={() => setMode("before")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              mode === "before"
                ? "bg-rose-500/20 text-rose-700 dark:text-rose-400 font-semibold border border-rose-500/30"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Before PR #255 (Recursive joinToRegion)
          </button>
          <button
            type="button"
            onClick={() => setMode("after")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              mode === "after"
                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            After PR #255 (Iterative ArrayDeque)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-line)] font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] block mb-2 font-bold">
              Memory &amp; Call Stack Metric:
            </span>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Call Stack Depth:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "O(N) Recursion (StackOverflow Risk)" : "O(1) Flat Call Stack"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Coordinate Checks:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "new Point(x, y) allocated per pixel" : "Primitive containsPoint(x, y)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>20k-Pixel Diff Test:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "Risks JVM StackOverflowError" : "100% Passes (66/66 JUnit)"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {mode === "before" ? (
              <pre className="text-rose-400">
{`// RECURSIVE FLOOD-FILL (Original)
private void joinToRegion(int x, int y) {
    if (isJumpRejected(x, y)) return;
    matrix[y][x] = regionCount;
    for (int i = 0; i < threshold; i++) {
        joinToRegion(x + 1 + i, y);
        joinToRegion(x, y + 1 + i);
        // Deep recursion risks StackOverflowError
    }
}`}
              </pre>
            ) : (
              <pre className="text-emerald-400">
{`// ITERATIVE ARRAYDEQUE (PR #255)
ArrayDeque<Integer> positions = new ArrayDeque<>();
addToRegion(matrix, regionMarker, positions, x, y);
while (!positions.isEmpty()) {
    int pos = positions.removeLast();
    int curX = pos % matrix[0].length;
    int curY = pos / matrix[0].length;
    // Flat stack; index arithmetic y * w + x
}`}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// -------------------------------------------------------------
// 6. REMOCOMP: Three-Tier Agent Discovery Surface
// -------------------------------------------------------------
function RemocompExplorer() {
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(1)

  const tiers = {
    1: {
      name: "Tier 1: Search & Catalog Discovery",
      endpoint: "GET /ai/search?q=counter",
      tokens: "~160-200 Tokens",
      purpose: "Lightweight discovery without props. Returns name, slug, description, and keywords.",
      sample: '[\n  {\n    "slug": "odometer-counter",\n    "name": "Odometer Counter",\n    "description": "Smooth rolling number ticker"\n  }\n]',
    },
    2: {
      name: "Tier 2: Prop Schema & Contract Inspection",
      endpoint: "GET /api/v1/components/odometer-counter",
      tokens: "~120 Tokens (Isolated)",
      purpose: "Returns TypeScript prop contract, default values, bestFor, and avoidWhen constraints.",
      sample: '{\n  "slug": "odometer-counter",\n  "props": {\n    "value": "number",\n    "durationInFrames": "number",\n    "fontSize": "number"\n  }\n}',
    },
    3: {
      name: "Tier 3: Standalone Source Installation",
      endpoint: "GET /r/odometer-counter.json",
      tokens: "Source Pull Only",
      purpose: "Full shadcn-compatible JSON with raw TSX code copied into the user's project.",
      sample: '{\n  "name": "odometer-counter",\n  "dependencies": ["remotion"],\n  "files": [\n    { "name": "counter.tsx", "content": "export const Odometer..." }\n  ]\n}',
    },
  }

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="remo-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="remo-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        Three-Tier Token-Budgeted Agent Surface
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-line)] pb-3">
          {([1, 2, 3] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTier(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeTier === t
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                  : "bg-[var(--color-surface)] border border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              Tier {t}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-line)] mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {tiers[activeTier].name}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-strong)] font-semibold">
              {tiers[activeTier].tokens}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-2 font-mono">{tiers[activeTier].endpoint}</p>
          <p className="text-xs text-[var(--color-text)] leading-relaxed">{tiers[activeTier].purpose}</p>
        </div>

        <pre className="p-4 rounded-xl bg-[#0b1120] text-[#38bdf8] font-mono text-xs overflow-x-auto border border-slate-800">
          {tiers[activeTier].sample}
        </pre>
      </div>
    </section>
  )
}
