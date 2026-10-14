"use client"

import { useState } from "react"

interface Variant {
  size: string
  price: number
  originalPrice: number
  badge: string
  label: string
}

const VARIANTS: Variant[] = [
  { size: "6ML", price: 450, originalPrice: 450, badge: "Trial Size", label: "Pocket Flacon" },
  { size: "15ML", price: 980, originalPrice: 1100, badge: "Save 11%", label: "Travel Decant" },
  { size: "30ML", price: 1750, originalPrice: 2100, badge: "Save 17%", label: "Signature Edition" },
  { size: "50ML", price: 2650, originalPrice: 3400, badge: "Save 22%", label: "Collector Flacon" },
]

export function ArvaanaVariantPreview() {
  const [selectedSize, setSelectedSize] = useState<string>("30ML")
  const [copied, setCopied] = useState(false)

  const variant = VARIANTS.find((v) => v.size === selectedSize) || VARIANTS[2]
  const whatsappText = `Salam ARVAANA! I would like to order: Oud Noir (${variant.size} - ${variant.label}) at ৳${variant.price.toLocaleString("en-BD")}. Please confirm order availability.`

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(whatsappText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full h-full min-h-[300px] bg-[var(--color-surface-muted)]/80 p-4 md:p-5 flex flex-col justify-between font-sans select-none text-[var(--color-text)]">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-3 mb-2">
        <div>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--color-accent)] font-bold">
            ARVAANA PARFUMS
          </p>
          <h5 className="font-display text-sm md:text-base font-semibold text-[var(--color-text)]">
            Oud Noir · Extrait de Parfum
          </h5>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-semibold">
          {variant.badge}
        </span>
      </div>

      {/* Dynamic Price & Volume Engine */}
      <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block">
              Direct Price ({variant.label})
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-2xl md:text-3xl font-bold text-[var(--color-text)] tabular-nums">
                ৳{variant.price.toLocaleString("en-BD")}
              </span>
              {variant.originalPrice > variant.price && (
                <span className="text-xs font-mono line-through text-[var(--color-muted)]">
                  ৳{variant.originalPrice.toLocaleString("en-BD")}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] font-mono text-[var(--color-primary-strong)]">
            Zero-FOUC Engine
          </span>
        </div>

        {/* Volume selector pills */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[var(--color-line)]">
          {VARIANTS.map((v) => {
            const isSelected = selectedSize === v.size
            return (
              <button
                key={v.size}
                type="button"
                onClick={() => setSelectedSize(v.size)}
                className={`py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)] font-bold shadow-xs"
                    : "bg-[var(--color-surface-muted)] text-[var(--color-muted)] border-[var(--color-line)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-text)]"
                }`}
              >
                <p className="font-mono text-xs font-semibold">{v.size}</p>
                <p className="text-[9px] font-mono opacity-80">৳{v.price}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* WhatsApp Concierge Live Payload Preview */}
      <div className="mt-2 pt-2 border-t border-[var(--color-line)]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
            Encoded WhatsApp Concierge Payload:
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary-strong)] hover:underline cursor-pointer"
          >
            {copied ? "✓ Copied!" : "Copy Payload"}
          </button>
        </div>

        <div className="p-2.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-line)] text-[11px] font-mono text-[var(--color-muted)] leading-relaxed break-all">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">wa.me/concierge</span>
          <span className="opacity-70">?text={encodeURIComponent(whatsappText).slice(0, 50)}...</span>
        </div>
      </div>
    </div>
  )
}
