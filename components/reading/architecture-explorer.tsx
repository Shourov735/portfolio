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
// 1. NABODIGONTO: Blind Audit Protocol & Dual-Key Signoff Flow
// -------------------------------------------------------------
function NabodigontoExplorer() {
  const [signer1, setSigner1] = useState(false)
  const [signer2, setSigner2] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const isUnblinded = signer1 && signer2

  const steps = [
    {
      title: "1. Member Dues Transaction",
      detail: "Member deposits monthly dues via mobile banking; transaction receipt enters masked staging queue.",
    },
    {
      title: "2. Cryptographic Blind Token",
      detail: "SHA-256 HMAC generated over ledger delta. Raw treasury totals are masked from public/member views.",
    },
    {
      title: "3. Dual-Key Authentication",
      detail: "Both the Finance Officer and Executive Admin must provide authenticated digital signatures to confirm reconciliation.",
    },
    {
      title: "4. Ledger Unmask & Dispersal",
      detail: "Ledger consensus reached. Running balance is unmasked publicly and immutable PDF audit certificate is minted.",
    },
  ]

  return (
    <section className="my-12 scroll-mt-24" id="interactive-architecture" aria-labelledby="nabo-arch-heading">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Interactive Architecture Explorer
        </span>
      </div>
      <h2 id="nabo-arch-heading" className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-6 tracking-tight">
        Blind Audit Protocol & Double-Signed Flow
      </h2>

      <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/80 p-5 md:p-6 shadow-xs">
        {/* Treasury Vault Display */}
        <div
          className={`p-5 rounded-xl border transition-all duration-300 ${
            isUnblinded
              ? "bg-emerald-500/10 border-emerald-500/40 dark:bg-emerald-950/20"
              : "bg-[var(--color-surface-muted)] border-[var(--color-line)]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)]">
              {isUnblinded ? "Verified Ledger Balance (Unmasked)" : "Cryptographically Blinded Treasury Vault"}
            </span>
            <span
              className={`text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                isUnblinded
                  ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
              }`}
            >
              {isUnblinded ? "● Unblinded (2/2 Signed)" : "○ Blinded (Locked)"}
            </span>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="font-display text-3xl md:text-4xl tracking-tight text-[var(--color-text)] tabular-nums transition-all">
              {isUnblinded ? "৳ 1,42,850.00" : "৳ ••••••••"}
            </span>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              {isUnblinded ? "BDT · Net Treasury Reserve" : "Zero-Knowledge Hash"}
            </span>
          </div>

          <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">
            {isUnblinded
              ? "Dual consensus verified: Both keyholder signatures verified against serverless ledger state. Treasury totals unmasked."
              : "Security invariant: Ledger values remain completely obscured until two designated keyholders cryptographically sign off."}
          </p>
        </div>

        {/* Dual Signature Controls */}
        <div className="mt-5 pt-4 border-t border-[var(--color-line)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-2.5 font-medium">
            Simulate Keyholder Sign-Off (Click to toggle):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSigner1(!signer1)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                signer1
                  ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-semibold"
                  : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono uppercase text-[10px] tracking-wider">Keyholder 1</span>
                <span>{signer1 ? "✓ Signed" : "Pending"}</span>
              </div>
              <p className="font-sans text-xs text-[var(--color-text)]">
                Finance Officer (Treasury Review)
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSigner2(!signer2)}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                signer2
                  ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-primary-strong)] font-semibold"
                  : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono uppercase text-[10px] tracking-wider">Keyholder 2</span>
                <span>{signer2 ? "✓ Signed" : "Pending"}</span>
              </div>
              <p className="font-sans text-xs text-[var(--color-text)]">
                Executive Admin (Governance Signoff)
              </p>
            </button>
          </div>
        </div>

        {/* Protocol Lifecycle Stepper */}
        <div className="mt-6 pt-5 border-t border-[var(--color-line)]">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-3 font-medium">
            Protocol State Machine:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {steps.map((st, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  activeStep === idx
                    ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)] font-semibold text-[var(--color-primary-strong)]"
                    : "bg-[var(--color-surface)] border-[var(--color-line)] text-[var(--color-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                <span className="block text-[10px] font-mono text-[var(--color-primary)] mb-1">
                  Step 0{idx + 1}
                </span>
                <span className="line-clamp-1">{st.title.split(". ")[1]}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--color-muted)] font-mono bg-[var(--color-surface-muted)] p-3 rounded-lg border border-[var(--color-line)]">
            {steps[activeStep].detail}
          </p>
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
        PR #255: Recursive DFS vs Iterative ArrayDeque BFS
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
            Before PR #255 (Recursive DFS)
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
            After PR #255 (Iterative ArrayDeque BFS)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-line)] font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-muted)] block mb-2 font-bold">
              Memory & Call Stack Metric:
            </span>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span>Call Stack Depth:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "14,280 frames (StackOverflow Risk)" : "1 frame (Flat Call Stack)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Object Allocations:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "Millions of `java.awt.Point` objects" : "Primitive (x, y) coordinates"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>4K Resolution Diff:</span>
                <span className={mode === "before" ? "text-rose-500 font-bold" : "text-emerald-500 font-bold"}>
                  {mode === "before" ? "Fails with StackOverflowError" : "100% Passes (Zero Stack Limits)"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1120] text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
            {mode === "before" ? (
              <pre className="text-rose-400">
{`// RECURSIVE DFS (Original)
private void joinToRegion(Point p, Rectangle r) {
    // ⚠️ Calls itself for every neighbour
    // Stack grows with contiguous diff size
    joinToRegion(new Point(p.x + 1, p.y), r);
    // StackOverflowError on large differences!
}`}
              </pre>
            ) : (
              <pre className="text-emerald-400">
{`// ITERATIVE ARRAYDEQUE BFS (PR #255)
Deque<int[]> queue = new ArrayDeque<>();
queue.add(new int[]{startX, startY});
while (!queue.isEmpty()) {
    int[] curr = queue.poll();
    // ✓ Evaluated in heap queue
    // Flat call-stack, zero stack exhaustion
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
