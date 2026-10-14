"use client"

import Link from "next/link"
import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"
import { BorderGlow } from "@/components/border-glow"
import { NabodigontoAuditPreview } from "@/components/previews/nabodigonto-audit-preview"
import { InsideJibonPipelinePreview } from "@/components/previews/insidejibon-pipeline-preview"
import { ArvaanaVariantPreview } from "@/components/previews/arvaana-variant-preview"

export function Spotlight() {
  const projects = getContent().featuredProject

  return (
    <section className="section" id="spotlight">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Featured Work</p>
            <h2>Flagship engineering projects &amp; production systems.</h2>
            <p className="text-[var(--color-muted)] max-w-[640px] mt-2 text-base">
              A curated selection of high-impact platforms, from double-signed treasury protocols to bilingual
              EdTech and zero-FOUC luxury e-commerce.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-12">
          {projects.map((project, index) => {
            const slug = slugify(project.title)
            const isReversed = index % 2 !== 0

            return (
              <ScrollReveal key={project.title}>
                <BorderGlow className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-primary)] transition-colors duration-200 shadow-sm">
                  <article
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 ${
                      isReversed ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Visual Interactive Preview Column */}
                    <div className="lg:col-span-6 relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-muted)] shadow-xs">
                      {project.title === "Nabodigonto" && <NabodigontoAuditPreview />}
                      {project.title === "InsideJibon" && <InsideJibonPipelinePreview />}
                      {project.title === "ARVAANA" && <ArvaanaVariantPreview />}
                      {!["Nabodigonto", "InsideJibon", "ARVAANA"].includes(project.title) && (
                        <div className="p-8 text-center text-sm font-mono text-[var(--color-muted)]">
                          {project.title} Preview
                        </div>
                      )}
                    </div>

                    {/* Metadata & Narrative Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[var(--color-accent)] text-[11px] font-mono uppercase tracking-[0.16em] font-medium">
                            {project.category}
                          </span>
                          <span aria-hidden="true" className="text-[var(--color-line)]">
                            ·
                          </span>
                          {index === 0 ? (
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-primary-strong)] font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                              Flagship Project
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
                              Production System
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-3xl md:text-4xl text-[var(--color-text)] tracking-tight leading-[1.05] text-balance">
                          <Link href={`/projects/${slug}`} className="link-underline">
                            {project.title}
                          </Link>
                        </h3>

                        <p className="text-[var(--color-muted)] mt-4 leading-relaxed text-base max-w-[60ch]">
                          {project.summary}
                        </p>
                      </div>

                      {project.highlights && project.highlights.length > 0 && (
                        <div className="pt-2">
                          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-3 font-medium">
                            Key highlights
                          </p>
                          <ul className="grid gap-2.5">
                            {project.highlights.slice(0, 3).map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-sm text-[var(--color-muted)] leading-relaxed"
                              >
                                <span
                                  aria-hidden="true"
                                  className="text-[var(--color-primary)] shrink-0 mt-0.5"
                                >
                                  ▸
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--color-line)]/70">
                        <Link href={`/projects/${slug}`} className="btn-primary">
                          Read case study →
                        </Link>

                        {project.links.slice(0, 1).map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  </article>
                </BorderGlow>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
