"use client"

import { useState } from "react"

type WorkspaceNode = {
  id: string
  path: string
  category: "App" | "Worker" | "Package"
  runtime: string
  headline: string
  details: string
  highlights: string[]
}

const WORKSPACE_NODES: WorkspaceNode[] = [
  {
    id: "api",
    path: "services/api",
    category: "Worker",
    runtime: "Hono.js · Cloudflare D1 · Prisma",
    headline: "Modular Edge API & Atomic D1 Batching",
    details:
      "Hosts 9 isolated domain engines (members, dues, payments, collect, expenses, cms, verify, webhooks) using atomic D1 batch() transactions.",
    highlights: ["End-to-End Hono RPC", "Atomic D1 batch() Writes", "Zod Contract Validation"],
  },
  {
    id: "media",
    path: "services/media-service",
    category: "Worker",
    runtime: "Cloudflare R2 · pdf-lib · Fontkit",
    headline: "Serverless Bengali PDF & ID Card Engine",
    details:
      "Dedicated Worker generating custom Bengali typography PDFs, payment receipts, and member ID cards with magic-byte file verification on R2.",
    highlights: ["Custom Bengali Font Rendering", "Presigned R2 Uploads", "Magic-Byte Security"],
  },
  {
    id: "notify",
    path: "services/notification",
    category: "Worker",
    runtime: "Cloudflare Queues · Cron Triggers",
    headline: "4-Channel Asynchronous Dispatch Pipeline",
    details:
      "Queue consumer and scheduled cron worker dispatching transactional alerts across SMS, Email, Web Push, and Mobile Push with retry backoff.",
    highlights: ["OneCodeSoft SMS & Resend", "VAPID Web Push", "Firebase Cloud Messaging"],
  },
  {
    id: "portal",
    path: "apps/web-portal",
    category: "App",
    runtime: "React 19 · TanStack Router · Clerk",
    headline: "Role-Based Member & Executive Portal",
    details:
      "Authenticated SPA for membership workflows, dues tracking, automated payment receipts, and role-based executive management.",
    highlights: ["TanStack Router + Query", "Networkless JWT Auth", "Role-Based Access Control"],
  },
  {
    id: "public",
    path: "apps/web-public",
    category: "App",
    runtime: "Vite · React 19 · Tailwind v4",
    headline: "Zero-Auth Public Web & Offline Snapshot",
    details:
      "Decoupled public portal serving organization news, bilingual constitution, committee directory, and QR card verification with offline fallback.",
    highlights: ["Zero Clerk Bundle Overhead", "Offline Snapshot Resilience", "QR Token Verification"],
  },
  {
    id: "packages",
    path: "packages/contracts & db",
    category: "Package",
    runtime: "TypeScript · Zod · Prisma D1",
    headline: "Shared Monorepo Contracts & Mobile Sync",
    details:
      "Unifies canonical database schemas, Zod validation schemas, and type-safe RPC clients shared across web apps, Workers, and the Expo mobile app.",
    highlights: ["100k+ LOC Type Safety", "Shared across Web & Expo", "Single Source of Truth"],
  },
]

const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Hono RPC & Atomic D1 Batch",
    service: "services/api",
    status: "Committed (12ms)",
    desc: "Validates payload via shared Zod contract and executes an atomic Cloudflare D1 batch() transaction updating member dues and ledger records.",
  },
  {
    step: "02",
    title: "Bengali PDF Receipt on R2",
    service: "services/media-service",
    status: "Rendered & Stored",
    desc: "Generates a bilingual payment receipt using pdf-lib + @pdf-lib/fontkit custom Bengali glyph shaping and stores the artifact in Cloudflare R2.",
  },
  {
    step: "03",
    title: "Multi-Channel Queue Fanout",
    service: "services/notification-service",
    status: "4 Channels Dispatched",
    desc: "Consumes Cloudflare Queue event and dispatches confirmation via OneCodeSoft SMS, Resend Email, VAPID Web Push, and Expo/FCM Mobile Push.",
  },
]

export function NabodigontoMonorepoPreview() {
  const [tab, setTab] = useState<"topology" | "pipeline" | "memberId">("topology")
  const [selectedNodeId, setSelectedNodeId] = useState<string>("api")
  const [activeStep, setActiveStep] = useState<number>(0)
  const [flipped, setFlipped] = useState(false)

  const activeNode = WORKSPACE_NODES.find((n) => n.id === selectedNodeId) ?? WORKSPACE_NODES[0]

  return (
    <div className="w-full h-full min-h-[340px] bg-[var(--color-surface-muted)]/80 p-4 md:p-5 flex flex-col justify-between font-sans select-none text-[var(--color-text)]">
      {/* Top Bar / Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-line)] pb-3 mb-3">
        <div className="flex items-center gap-1 bg-[var(--color-surface)] p-1 rounded-lg border border-[var(--color-line)]">
          <button
            type="button"
            onClick={() => setTab("topology")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "topology"
                ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Monorepo Topology
          </button>
          <button
            type="button"
            onClick={() => setTab("pipeline")}
            className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
              tab === "pipeline"
                ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-xs"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            Edge Pipeline
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
            QR Member ID
          </button>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)] hidden sm:inline-block">
          100k+ LOC · Cloudflare Edge
        </span>
      </div>

      {/* TAB 1: Monorepo Architecture Topology */}
      {tab === "topology" && (
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {WORKSPACE_NODES.map((node) => {
              const isSelected = node.id === selectedNodeId
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] shadow-xs"
                      : "bg-[var(--color-surface)] border-[var(--color-line)] hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-mono text-[10px] font-bold text-[var(--color-text)] truncate">
                      {node.path}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold ${
                        node.category === "Worker"
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : node.category === "App"
                            ? "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {node.category}
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-[var(--color-muted)] truncate">
                    {node.runtime}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Active Workspace Inspector */}
          <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs font-bold text-[var(--color-text)]">
                  {activeNode.headline}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-primary-strong)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                {activeNode.runtime}
              </span>
            </div>

            <p className="text-[11px] text-[var(--color-muted)] leading-relaxed my-1.5">
              {activeNode.details}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[var(--color-line)]">
              {activeNode.highlights.map((item) => (
                <span
                  key={item}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Distributed Edge Execution Pipeline */}
      {tab === "pipeline" && (
        <div className="flex-1 flex flex-col justify-between gap-3 py-0.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PIPELINE_STEPS.map((item, idx) => {
              const isCurrent = idx === activeStep
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-[var(--color-primary)]/15 border-[var(--color-primary)] shadow-xs"
                      : "bg-[var(--color-surface)] border-[var(--color-line)] hover:border-[var(--color-primary)]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-[var(--color-primary-strong)] font-bold">
                        STEP {item.step}
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ● {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-[var(--color-text)]">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-[10px] font-mono text-[var(--color-muted)] mt-2 pt-1.5 border-t border-[var(--color-line)]">
                    {item.service}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary-strong)] font-semibold">
                Execution Trace · {PIPELINE_STEPS[activeStep].service}
              </span>
              <span className="text-[10px] font-mono text-[var(--color-muted)]">
                Click steps above to inspect
              </span>
            </div>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">
              {PIPELINE_STEPS[activeStep].desc}
            </p>
          </div>
        </div>
      )}

      {/* TAB 3: 3D Member ID & Verification Route */}
      {tab === "memberId" && (
        <div className="flex-1 flex flex-col items-center justify-center py-1">
          <div
            onClick={() => setFlipped(!flipped)}
            className="w-full max-w-[340px] aspect-[1.75/1] rounded-xl p-4 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface-muted)] border border-[var(--color-line)] shadow-md flex flex-col justify-between cursor-pointer hover:border-[var(--color-primary)] transition-all relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none" />

            {!flipped ? (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-mono tracking-widest text-[var(--color-primary-strong)] font-bold uppercase">
                      Nabodigonto Welfare Org
                    </p>
                    <p className="font-display font-bold text-base text-[var(--color-text)]">
                      Md. Shourov
                    </p>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold">
                    VERIFIED MEMBER
                  </span>
                </div>

                <div className="flex items-end justify-between pt-2">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-mono text-[var(--color-muted)] uppercase">
                      Executive Role
                    </p>
                    <p className="text-xs font-mono font-semibold text-[var(--color-text)]">
                      IT Secretary &amp; Lead Engineer
                    </p>
                    <p className="text-[10px] font-mono text-[var(--color-muted)]">
                      Rendered via pdf-lib + R2
                    </p>
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
                    Public Edge Verification Route
                  </p>
                  <p className="text-xs font-mono text-[var(--color-text)] font-semibold mt-1">
                    /verify/nd_vfy_9f8a21c4
                  </p>
                  <p className="text-[10px] font-mono text-[var(--color-muted)] mt-1">
                    Served by apps/web-public · Validated against Cloudflare D1
                  </p>
                </div>
                <div className="border-t border-[var(--color-line)] pt-2 flex justify-between items-center text-[10px] font-mono text-[var(--color-muted)]">
                  <span>Bilingual PDF + QR Card</span>
                  <span className="text-[var(--color-primary-strong)]">D1 + R2 Backed</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-[10px] font-mono text-[var(--color-muted)] mt-2.5">
            Click card to flip between R2-rendered ID &amp; public verification route.
          </p>
        </div>
      )}
    </div>
  )
}