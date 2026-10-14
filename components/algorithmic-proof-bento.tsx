"use client"

import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BorderGlow } from "@/components/border-glow"

export function AlgorithmicProofBento() {
  return (
    <div className="mt-12 pt-12 border-t border-[var(--color-line)]" id="algorithmic-proof">
      <ScrollReveal>
        <div className="section-heading mb-8">
          <p className="eyebrow">Open-Source & Algorithmic Proof</p>
          <h3 className="font-display text-2xl md:text-3xl text-[var(--color-text)] tracking-tight">
            Production upstream engineering & problem-solving rigor.
          </h3>
          <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-sm leading-relaxed">
            Direct verification of algorithmic competence—from eliminating call-stack overflows in a production Maven Central library to solving 150+ competitive programming challenges.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Card 1: Upstream Maven Central Contribution */}
        <div className="lg:col-span-7">
          <ScrollReveal>
            <BorderGlow className="h-full border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] p-6 md:p-8 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors shadow-sm">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary-strong)] border border-[var(--color-primary)]/20 font-semibold">
                    Upstream Open Source
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
                    romankh3/image-comparison · PR #255
                  </span>
                </div>

                <h4 className="font-display text-xl md:text-2xl text-[var(--color-text)] tracking-tight leading-snug">
                  Iterative Diff Traversal &amp; Coordinate Packing
                </h4>

                <p className="text-sm text-[var(--color-muted)] mt-2.5 leading-relaxed">
                  Contributed to <strong className="text-[var(--color-text)] font-semibold">romankh3/image-comparison</strong>, an open-source visual regression QA library published on Maven Central. Refactored the core region identification algorithm to eliminate recursion depth limits.
                </p>

                {/* Architecture comparison box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5 p-4 rounded-xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-line)] text-xs font-mono">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-rose-500 font-bold">
                      Before Refactoring
                    </p>
                    <p className="text-[var(--color-muted)] leading-relaxed">
                      Recursive flood-fill traversal risked <span className="text-[var(--color-text)]">StackOverflowError</span> on high-resolution 4K images; millions of transient Point objects taxed GC.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                      After Refactoring
                    </p>
                    <p className="text-[var(--color-muted)] leading-relaxed">
                      Iterative <span className="text-[var(--color-text)]">ArrayDeque BFS</span> with primitive coordinate checks. 100% test pass rate (66/66) and zero PMD violations.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {["Java 11", "ArrayDeque BFS", "Maven Central", "66/66 JUnit Tests", "PMD Clean"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-[var(--color-line)] text-xs font-mono uppercase tracking-wider">
                <a
                  href="https://github.com/romankh3/image-comparison/pull/255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  View Upstream PR #255 ↗
                </a>
                <a
                  href="https://github.com/Shourov735/image-comparison"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  GitHub Fork ↗
                </a>
                <Link
                  href="/projects/image-comparison"
                  className="text-[var(--color-primary-strong)] hover:underline inline-flex items-center gap-1 self-center"
                >
                  Case Study →
                </Link>
              </div>
            </BorderGlow>
          </ScrollReveal>
        </div>

        {/* Bento Card 2: 150+ Competitive Programming Proof */}
        <div className="lg:col-span-5">
          <ScrollReveal>
            <BorderGlow className="h-full border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] p-6 md:p-8 flex flex-col justify-between hover:border-[var(--color-primary)] transition-colors shadow-sm">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-semibold">
                    Competitive Track Record
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
                    Codeforces &amp; LeetCode
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-4xl md:text-5xl text-[var(--color-text)] tracking-tight">
                    150+
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-primary-strong)] font-semibold">
                    Problems Solved
                  </span>
                </div>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                  Rigorous algorithmic practice under strict 1.0–2.0s runtime constraints and 256MB memory ceilings, translating directly into performant system architectures.
                </p>

                <div className="space-y-2 mb-5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] font-medium">
                    Core Algorithmic Domains
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Graph Theory (BFS/DFS/Dijkstra)",
                      "Dynamic Programming",
                      "Greedy & Invariants",
                      "Number Theory",
                      "Segment Trees",
                    ].map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] font-medium">
                    Primary Languages
                  </p>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--color-surface-muted)] text-[var(--color-primary-strong)] border border-[var(--color-line)]">
                      C++ (Fast I/O &amp; STL)
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-[var(--color-surface-muted)] text-[var(--color-primary-strong)] border border-[var(--color-line)]">
                      Java 17
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-line)] grid grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href="https://codeforces.com/profile/Shourov735"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center truncate py-2"
                >
                  Codeforces ↗
                </a>
                <a
                  href="https://leetcode.com/u/Shourov735/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center truncate py-2"
                >
                  LeetCode ↗
                </a>
              </div>
            </BorderGlow>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
