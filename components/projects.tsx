"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AlgorithmicProofBento } from "@/components/algorithmic-proof-bento"

const ORDERED_CATEGORIES = ["All", "Web", "Systems", "Mobile", "Open Source", "Algorithms"]
const FLAGSHIP_TITLES = new Set(["Nabodigonto", "InsideJibon", "ARVAANA"])

export function Projects() {
  const projects = getContent().projects
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })

    const existingCats = Array.from(new Set(projects.map((p) => p.category)))
    const sortedCats = ["All", ...ORDERED_CATEGORIES.filter((c) => c !== "All" && existingCats.includes(c))]
    // Add any categories not in ordered list
    existingCats.forEach((c) => {
      if (!sortedCats.includes(c)) sortedCats.push(c)
    })

    return sortedCats.map((cat) => ({ name: cat, count: counts[cat] || 0 }))
  }, [projects])

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const matchFilter = filter === "All" || p.category === filter
        const haystack = `${p.title} ${p.summary} ${p.category} ${p.tags.join(" ")}`.toLowerCase()
        return matchFilter && haystack.includes(search.toLowerCase())
      }),
    [filter, search, projects]
  )

  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="projects">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Projects Directory</p>
            <h2>Interactive engineering index &amp; source code.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              Explore systems architectures, desktop engines, mobile apps, and algorithmic repositories with direct GitHub source access.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:max-w-[380px]">
              <label htmlFor="project-search" className="sr-only">
                Search projects
              </label>
              <input
                id="project-search"
                type="search"
                placeholder="Search by tech, name, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-2 focus:outline-[var(--color-primary)]/40 transition-[border-color] duration-160"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {categories.map((cat) => {
                const isActive = filter === cat.name
                return (
                  <button
                    key={cat.name}
                    onClick={() => setFilter(cat.name)}
                    aria-pressed={isActive}
                    className={`relative min-h-[36px] rounded-full px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-colors duration-160 cursor-pointer inline-flex items-center gap-1.5 border ${
                      isActive
                        ? "border-[var(--color-primary)] text-[var(--color-bg)] font-semibold"
                        : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeFilterTab"
                        className="absolute inset-0 rounded-full bg-[var(--color-primary)] -z-10"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                    <span
                      className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-[var(--color-bg)] text-[var(--color-primary)] font-bold"
                          : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <p
            className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider mt-3"
            aria-live="polite"
          >
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
            {filter !== "All" ? ` in ${filter}` : ""}
            {search ? ` matching "${search}"` : ""}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const slug = slugify(project.title)
              const isFlagship = FLAGSHIP_TITLES.has(project.title)
              const isAlgorithmic = project.category === "Algorithms"
              const isPR = project.title === "image-comparison"

              return (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group flex flex-col h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-xs overflow-hidden hover:-translate-y-1 hover:border-[var(--color-primary)]/60 hover:shadow-md transition-all duration-200"
                >
                  {/* Visual Header */}
                  <Link
                    href={`/projects/${slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-[var(--color-surface-muted)] border-b border-[var(--color-line)]/60"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} system interface and architecture`}
                        width={400}
                        height={250}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[var(--color-surface-muted)] to-[var(--color-surface)]">
                        <span className="text-2xl font-black tracking-widest text-[var(--color-muted)] opacity-30">
                          {project.title.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[var(--color-accent)] text-[10px] font-extrabold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[var(--color-surface)]/95 backdrop-blur-xs border border-[var(--color-line)] shadow-xs">
                        {project.category}
                      </span>
                      {isFlagship && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-[var(--color-primary)]/90 text-white font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Flagship
                        </span>
                      )}
                      {isPR && (
                        <span className="text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-[var(--color-primary)]/15 text-[var(--color-primary-strong)] border border-[var(--color-primary)]/30 font-semibold">
                          Maven PR
                        </span>
                      )}
                      {isAlgorithmic && (
                        <span className="text-[10px] font-mono uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]">
                          Archive
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="font-display text-lg md:text-xl text-[var(--color-text)] tracking-tight leading-snug">
                        <Link href={`/projects/${slug}`} className="link-underline">
                          {project.title}
                        </Link>
                      </h3>

                      <p className="text-[var(--color-muted)] mt-2 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[10px] font-mono text-[var(--color-muted)] self-center">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[var(--color-line)] text-xs">
                      <Link
                        href={`/projects/${slug}`}
                        className="font-mono uppercase tracking-wider text-[var(--color-primary-strong)] hover:opacity-80 inline-flex items-center gap-1 font-semibold"
                      >
                        <span>{isAlgorithmic ? "View Solutions" : isPR ? "PR Breakdown" : "Case Study"}</span>
                        <span aria-hidden="true">→</span>
                      </Link>

                      <div className="flex items-center gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono uppercase tracking-wider text-[var(--color-muted)] hover:text-[var(--color-text)] inline-flex items-center gap-0.5"
                          >
                            <span>{link.label === "Live Demo" ? "Live" : link.label}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 border border-dashed border-[var(--color-line)] rounded-xl text-center bg-[var(--color-surface)] mt-6">
            <p className="text-[var(--color-muted)] font-medium">
              No projects found matching &ldquo;{search}&rdquo; in category &ldquo;{filter}&rdquo;.
            </p>
            <button
              onClick={() => {
                setFilter("All")
                setSearch("")
              }}
              className="mt-3 text-xs font-bold text-[var(--color-primary-strong)] hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Dedicated Open-Source & Algorithmic Proof Bento Strip */}
        <AlgorithmicProofBento />
      </div>
    </section>
  )
}
