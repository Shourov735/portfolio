"use client"

import React, { useRef, useState, useCallback } from "react"

interface BorderGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glowColor?: string
}

export function BorderGlow({
  children,
  className = "",
  glowColor = "var(--color-primary)",
  ...props
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [opacity, setOpacity] = useState(0)

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handlePointerEnter = useCallback(() => {
    setOpacity(1)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setOpacity(0)
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Radial cursor spotlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: position
            ? `radial-gradient(380px circle at ${position.x}px ${position.y}px, color-mix(in srgb, ${glowColor} 18%, transparent), transparent 70%)`
            : "none",
        }}
      />
      {children}
    </div>
  )
}
