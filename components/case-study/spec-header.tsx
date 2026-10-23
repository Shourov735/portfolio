"use client"

import { useState } from "react"
import Link from "next/link"
import type { Project } from "@/lib/types"

interface SpecHeaderProps {
  project: Project
}

export function SpecHeader({ project }: SpecHeaderProps) {
  const [copied, setCopied] = useState(false)

  const handleCopySummary = async () => {
    const summaryLines = [
      `# ${project.title} — Engineering Case Study`,
      `**Author:** Md. Shourov (IIT, University of Dhaka)`,
      `**System Type:** ${project.systemType || project.category}`,
      `**Role & Scope:** ${project.role || "Developer"}`,
      project.constraints && project.constraints.length > 0
        ? `**Core Constraints:** ${project.constraints.join("; ")}`
        : null,
      `**Tech Stack:** ${project.tags.join(", ")}`,
      `**Summary:** ${project.summary}`,
      project.result ? `**Outcome:** ${project.result}` : null,
      project.links.map((l) => `- [${l.label}](${l.url})`).join("\n"),
      `**Case Study URL:** https://mdshourov.vercel.app/projects/${project.slug || ""}`,
    ]
      .filter(Boolean)
      .join("\n\n")

    try {
      await navigator.clipboard.writeText(summaryLines)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const liveLink = project.links.find((l) => l.label === "Live Demo" || l.label === "Demo")
  const repoLink = project.links.find(
    (l) => l.label === "GitHub" || l.label === "Repository" || l.label.includes("PR")
  )

  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/60 backdrop-blur-sm p-5 md:p-6 shadow-xs my-8">
      {/* Top Bar with System Type and Recruiter Copy Utility */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--color-line)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] font-semibold text-[var(--color-text)]">
            {project.systemType || `${project.category} System Architecture`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopySummary}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface-muted)] hover:bg-[var(--color-line)]/50 border border-[var(--color-line)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          aria-label="Copy structured technical summary as markdown"
        >
          {copied ? (
            <>
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied Markdown Brief</span>
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              <span>Copy Recruiter Brief</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Engineering Specs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Role & Scope
          </span>
          <span className="text-sm font-semibold text-[var(--color-text)]">
            {project.role || "Lead Developer"}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Target Domain
          </span>
          <span className="text-sm font-semibold text-[var(--color-text)]">
            {project.category} · Production
          </span>
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-1">
            Core Runtime
          </span>
          <span className="text-sm font-semibold text-[var(--color-text)] truncate block">
            {project.tags.slice(0, 3).join(", ")}
          </span>
        </div>
      </div>

      {/* Hard Constraints Pill Row */}
      {project.constraints && project.constraints.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--color-line)]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] block mb-2">
            Operational & Architectural Invariants:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.constraints.map((constraint) => (
              <span
                key={constraint}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]"
              >
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                {constraint}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-2.5 mt-5 pt-4 border-t border-[var(--color-line)]">
        {liveLink && (
          <a
            href={liveLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-1.5 px-3.5"
          >
            <span>Live Deployment</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {repoLink && (
          <a
            href={repoLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-1.5 px-3.5"
          >
            <span>{repoLink.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.relatedBlogSlug && (
          <Link
            href={`/blog/${project.relatedBlogSlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[var(--color-primary-strong)] hover:underline ml-auto"
          >
            <span>Read Deep-Dive Post</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  )
}
