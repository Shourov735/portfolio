"use client"

import { useState } from "react"
import Link from "next/link"
import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

// Map technology names to portfolio projects
const SKILL_PROJECT_MAP: Record<string, string[]> = {
  "Next.js": ["Nabodigonto", "InsideJibon", "ARVAANA", "Mosque Library Management"],
  "React": ["InsideJibon", "Remocomp", "ARVAANA", "Quran Reading Tracker"],
  "TypeScript": ["InsideJibon", "Remocomp", "ARVAANA", "Quran Reading Tracker"],
  "C++": ["Codeforces Solutions", "LeetCode Solutions"],
  "Java": ["Quiz Management & Examination System", "image-comparison"],
  "Tailwind CSS": ["Nabodigonto", "InsideJibon", "Remocomp", "ARVAANA", "Mosque Library Management"],
  "PostgreSQL / Neon": ["Nabodigonto", "InsideJibon", "Mosque Library Management"],
  "Vercel": ["Nabodigonto", "InsideJibon", "ARVAANA"],
  "Cloudflare Workers & R2": ["Nabodigonto", "InsideJibon", "Remocomp"],
  "Git & GitHub": ["romankh3/image-comparison (PR #255)", "Remocomp", "TetriC"],
  "SQLite": ["Quiz Management & Examination System"],
  "React Native / Expo": ["Quran Reading Tracker"],
  "JavaScript": ["InsideJibon", "ARVAANA"],
  "Cloudflare D1": ["InsideJibon", "Remocomp"],
  "Linux / Bash": ["TetriC", "InsideJibon"],
  "JavaFX": ["Quiz Management & Examination System"],
  "Socket Programming": ["TetriC"],
  "Node.js": ["Remocomp", "InsideJibon"],
  "Maven & JUnit 5": ["Quiz Management & Examination System", "image-comparison"],
  "Prisma ORM": ["Nabodigonto", "Mosque Library Management"],
}

function SkillPill({ name }: { name: string }) {
  const [open, setOpen] = useState(false)
  const projects = SKILL_PROJECT_MAP[name]

  if (!projects || projects.length === 0) {
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]">
        {name}
      </span>
    )
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)] transition-all cursor-pointer group"
      >
        <span>{name}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] opacity-60 group-hover:opacity-100" />
      </button>

      {/* Floating cross-link popover */}
      {open && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[280px] p-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] shadow-xl z-30 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-line)] pb-1.5 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)] font-semibold">
              Used In Projects ({projects.length})
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {projects.map((proj) => {
              const isSpecialPR = proj.includes("PR #255")
              const targetSlug = isSpecialPR ? "image-comparison" : slugify(proj)
              return (
                <Link
                  key={proj}
                  href={`/projects/${targetSlug}`}
                  className="text-[11px] font-mono text-[var(--color-primary-strong)] hover:underline inline-flex items-center justify-between gap-2 py-0.5"
                >
                  <span className="truncate">{proj}</span>
                  <span className="text-[10px] text-[var(--color-muted)]">↗</span>
                </Link>
              )
            })}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[var(--color-line)]" />
        </div>
      )}
    </div>
  )
}

export function Skills() {
  const groups = getContent().skills

  return (
    <section className="section" id="skills">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Technical Competence</p>
            <h2>Skills categorized by practical experience.</h2>
            <p className="text-[var(--color-muted)] max-w-[60ch] mt-3 text-base">
              Organized by depth and frequency of use in real-world platforms and systems. Hover or tap any skill to see its implementation in production code.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <ScrollReveal key={group.category}>
              <article className="h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] p-6 hover:border-[var(--color-primary)] transition-colors flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-display text-xl text-[var(--color-text)] tracking-tight">
                      {group.category}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-primary-strong)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded border border-[var(--color-primary)]/20 font-semibold">
                      {group.items.length} techs
                    </span>
                  </div>

                  {group.description && (
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-5 min-h-[32px]">
                      {group.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-line)]">
                    {group.items.map((skill) => (
                      <SkillPill key={skill.name} name={skill.name} />
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
