"use client"

import { useState } from "react"
import dynamic from "next/dynamic"

function PreviewSkeleton({ title }: { title: string }) {
  return (
    <div
      className="p-8 min-h-[340px] flex flex-col justify-center items-center text-center animate-pulse"
      aria-label={`Loading ${title}`}
    >
      <div className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-line)] mb-3 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
      </div>
      <p className="text-xs font-mono text-[var(--color-text)] font-semibold">{title}</p>
      <p className="text-[11px] font-mono text-[var(--color-muted)] mt-1">
        Mounting interactive simulation...
      </p>
    </div>
  )
}

const NabodigontoMonorepoPreview = dynamic(
  () =>
    import("@/components/previews/nabodigonto-monorepo-preview").then((m) => m.NabodigontoMonorepoPreview),
  {
    loading: () => <PreviewSkeleton title="Nabodigonto Monorepo Architecture" />,
    ssr: false,
  }
)

const InsideJibonPipelinePreview = dynamic(
  () =>
    import("@/components/previews/insidejibon-pipeline-preview").then((m) => m.InsideJibonPipelinePreview),
  {
    loading: () => <PreviewSkeleton title="InsideJibon Edge Pipeline" />,
    ssr: false,
  }
)

const ArvaanaVariantPreview = dynamic(
  () => import("@/components/previews/arvaana-variant-preview").then((m) => m.ArvaanaVariantPreview),
  {
    loading: () => <PreviewSkeleton title="ARVAANA Product & Price Architecture" />,
    ssr: false,
  }
)

interface SpotlightPreviewFacadeProps {
  title: string
  category: string
}

export function SpotlightPreviewFacade({ title }: SpotlightPreviewFacadeProps) {
  const [isLaunched, setIsLaunched] = useState(false)

  const handlePreload = () => {
    if (title === "Nabodigonto") {
      import("@/components/previews/nabodigonto-monorepo-preview")
    } else if (title === "InsideJibon") {
      import("@/components/previews/insidejibon-pipeline-preview")
    } else if (title === "ARVAANA") {
      import("@/components/previews/arvaana-variant-preview")
    }
  }

  if (isLaunched) {
    return (
      <div className="relative">
        {title === "Nabodigonto" && <NabodigontoMonorepoPreview />}
        {title === "InsideJibon" && <InsideJibonPipelinePreview />}
        {title === "ARVAANA" && <ArvaanaVariantPreview />}
        {!["Nabodigonto", "InsideJibon", "ARVAANA"].includes(title) && (
          <div className="p-8 text-center text-sm font-mono text-[var(--color-muted)]">{title} Preview</div>
        )}
      </div>
    )
  }

  const facadeData: Record<string, { badge: string; topology: string; description: string; action: string }> =
    {
      Nabodigonto: {
        badge: "Monorepo Topology",
        topology: "services/api (Hono + D1) ⇆ services/media (R2) ⇆ apps/web-portal",
        description:
          "Interactive monorepo node explorer simulating fault-isolated Cloudflare Workers, atomic D1 batch() transactions, and serverless Bengali PDF generation.",
        action: "Launch Interactive Architecture Simulator",
      },
      InsideJibon: {
        badge: "Distributed Edge Pipeline",
        topology: "Browser Request ⇆ Cloudflare Workers KV ⇆ Cache Tier ⇆ Origin Fallback",
        description:
          "Interactive edge pipeline simulator demonstrating bilingual routing, sub-request caching, and multi-CDN failover under synthetic traffic.",
        action: "Launch Interactive Pipeline Simulator",
      },
      ARVAANA: {
        badge: "Variant & Price Engine",
        topology: "Attribute Matrix ⇆ Dynamic Pricing ⇆ Optimistic Edge Cart",
        description:
          "Interactive product simulator demonstrating zero-FOUC variant switching, real-time SKU resolution, and cart state synchronization.",
        action: "Launch Interactive Variant Simulator",
      },
    }

  const meta = facadeData[title] || {
    badge: "Architecture Simulator",
    topology: `${title} System Topology`,
    description: "Explore the live interactive system simulator and architecture breakdown.",
    action: "Launch Interactive Architecture Simulator",
  }

  return (
    <div className="p-6 md:p-8 min-h-[340px] flex flex-col justify-between bg-gradient-to-br from-[var(--color-surface-muted)] to-[var(--color-surface)] border border-[var(--color-line)] rounded-xl shadow-xs">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--color-primary-strong)] font-semibold px-2.5 py-1 rounded bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
            {meta.badge}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-muted)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Simulator Ready
          </span>
        </div>

        <div className="p-3.5 my-3 rounded-lg bg-[var(--color-bg)]/80 border border-[var(--color-line)] font-mono text-[11px] text-[var(--color-text)]">
          <p className="text-[var(--color-muted)] text-[10px] uppercase tracking-wider mb-1">
            System Topology
          </p>
          <p className="truncate text-[var(--color-primary-strong)] font-semibold">{meta.topology}</p>
        </div>

        <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-3">{meta.description}</p>
      </div>

      <div className="pt-5 mt-4 border-t border-[var(--color-line)]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsLaunched(true)}
          onMouseEnter={handlePreload}
          onFocus={handlePreload}
          className="btn-primary text-xs py-2 px-4 shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-transform duration-160 hover:scale-[1.02]"
        >
          <span>{meta.action}</span>
          <span aria-hidden="true">▶</span>
        </button>
        <span className="text-[10px] font-mono text-[var(--color-muted)] text-center sm:text-right">
          0 KB initial load · On-demand
        </span>
      </div>
    </div>
  )
}
