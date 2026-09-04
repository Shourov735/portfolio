"use client"

import { useState, useMemo } from "react"
import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Projects() {
  const projects = getContent().projects
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    const cats = ["All", ...Array.from(new Set(projects.map((p) => p.category)))]
    return cats.map((cat) => ({ name: cat, count: counts[cat] || 0 }))
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
            <h2>Selected engineering repositories & software work.</h2>
            <p className="text-[var(--color-muted)] max-w-[620px] mt-2 text-base">
              Filter by domain, explore technical architectures, or jump straight into the GitHub source code and live deployments.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:max-w-[380px]">
              <input
                type="search"
                placeholder="Search by tech, name, or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] text-[var(--color-text)] px-4 py-2.5 text-sm transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_var(--color-primary)/15] focus:outline-0"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setFilter(cat.name)}
                  className={`min-h-[36px] border rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-160 cursor-pointer inline-flex items-center gap-1.5 ${
                    filter === cat.name
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary-strong)] shadow-xs"
                      : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      filter === cat.name
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const slug = slugify(project.title)

            return (
              <ScrollReveal key={project.title}>
                <article className="group flex flex-col h-full border border-[var(--color-line)] rounded-xl bg-[var(--color-surface)] shadow-sm overflow-hidden hover:-translate-y-1 hover:border-[var(--color-primary)]/50 hover:shadow-lg transition-all duration-200">
                  {/* Visual Header */}
                  <a href={`/projects/${slug}`} className="block relative aspect-[16/10] overflow-hidden bg-[var(--color-surface-muted)]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[var(--color-surface-muted)] to-[var(--color-surface)]">
                        <span className="text-2xl font-black tracking-widest text-[var(--color-muted)] opacity-30">
                          {project.title.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[var(--color-accent)] text-[10px] font-extrabold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-xs border border-[var(--color-line)] shadow-xs">
                      {project.category}
                    </span>
                  </a>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary-strong)] transition-colors">
                        <a href={`/projects/${slug}`}>
                          {project.title}
                        </a>
                      </h3>

                      <p className="text-[var(--color-muted)] mt-2 text-xs md:text-sm leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[var(--color-surface-muted)] text-[var(--color-muted)] border border-[var(--color-line)]/50"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-[10px] font-bold text-[var(--color-muted)] self-center">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-[var(--color-line)]/60 text-xs">
                      <a
                        href={`/projects/${slug}`}
                        className="font-bold text-[var(--color-primary-strong)] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Case Study</span>
                        <span>→</span>
                      </a>

                      <div className="flex items-center gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-[var(--color-muted)] hover:text-[var(--color-text)] hover:underline inline-flex items-center gap-0.5"
                          >
                            <span>{link.label === "Live Demo" ? "Live" : link.label}</span>
                            <span className="text-[10px]">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
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
      </div>
    </section>
  )
}

