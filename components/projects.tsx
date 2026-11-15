"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { slugify } from "@/lib/blog-utils"
import { ScrollReveal } from "@/components/scroll-reveal"
import type { ProjectCardSummary } from "@/lib/types"

const ORDERED_CATEGORIES = ["All", "Web", "Systems", "Mobile", "Open Source", "Algorithms"]
const FLAGSHIP_TITLES = new Set(["Nabodigonto", "InsideJibon", "ARVAANA"])

export function Projects({
  projects = [],
  children,
}: {
  projects?: ProjectCardSummary[]
  children?: React.ReactNode
} = {}) {
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
              Explore systems architectures, desktop engines, mobile apps, and algorithmic repositories with
              direct GitHub source access.
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
                      <span className="absolute inset-0 rounded-full bg-[var(--color-primary)] -z-10" />
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
          {filtered.map((project) => {
            const slug = project.slug || slugify(project.title)
            const isFlagship = FLAGSHIP_TITLES.has(project.title)
            const isAlgorithmic = project.category === "Algorithms"
            const isPR = project.title === "image-comparison"

            return (
              <article
                key={project.title}
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
                      loading="lazy"
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
              </article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div
            role="status"
            aria-live="polite"
            className="p-10 md:p-12 border border-dashed border-[var(--color-line)] rounded-xl text-center bg-[var(--color-surface)] mt-6"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-muted)] flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">No matching projects found</h3>
            <p className="text-xs text-[var(--color-muted)] mt-1.5 max-w-[48ch] mx-auto">
              No projects match your active search
              {search ? (
                <span>
                  {" "}
                  for &ldquo;<strong className="text-[var(--color-text)]">{search}</strong>&rdquo;
                </span>
              ) : (
                ""
              )}
              {filter !== "All" ? (
                <span>
                  {" "}
                  in category &ldquo;<strong className="text-[var(--color-text)]">{filter}</strong>&rdquo;
                </span>
              ) : (
                ""
              )}
              .
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <span>Query: &quot;{search}&quot;</span>
                  <span aria-hidden="true">×</span>
                </button>
              )}
              {filter !== "All" && (
                <button
                  type="button"
                  onClick={() => setFilter("All")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-[var(--color-surface-muted)] border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                >
                  <span>Category: {filter}</span>
                  <span aria-hidden="true">×</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setFilter("All")
                  setSearch("")
                }}
                className="btn-primary text-xs py-1.5 px-3.5 cursor-pointer ml-1"
              >
                Reset all filters
              </button>
            </div>

            <p className="text-[11px] font-mono text-[var(--color-muted)] mt-4">
              Try searching for &ldquo;Cloudflare&rdquo;, &ldquo;TypeScript&rdquo;, &ldquo;Workers&rdquo;, or
              &ldquo;SQLite&rdquo;
            </p>
          </div>
        )}

        {children}
      </div>
    </section>
  )
}
