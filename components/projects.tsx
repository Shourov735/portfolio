"use client"

import { useState, useMemo } from "react"
import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"
import { slugify } from "@/lib/content"

export function Projects() {
  const projects = getContent().projects
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")

  const categories = ["All", ...new Set(projects.map((p) => p.category))]

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
            <p className="eyebrow">Projects</p>
            <h2>Selected work and learning repositories.</h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 mb-[22px] max-md:flex-col max-md:items-stretch">
            <label className="grid gap-2 w-full max-w-[430px] text-sm font-bold text-[var(--color-muted)]">
              <span>Search projects</span>
              <input
                type="search"
                placeholder="Try C++, algorithms, game..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-[var(--color-line)] rounded-md bg-[var(--color-surface)] text-[var(--color-text)] px-3 py-3 transition-[border-color,box-shadow] duration-160 focus:border-[var(--color-primary)] focus:shadow-[0_0_0_4px_var(--color-primary)/18] focus:outline-0"
              />
            </label>
            <div className="flex flex-wrap justify-end gap-2 max-md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`min-h-[38px] border rounded-full px-3 py-2 text-sm font-bold transition-all duration-160 cursor-pointer ${
                    filter === cat
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/12 text-[var(--color-primary-strong)]"
                      : "border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-3 gap-[18px] max-md:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((project) => (
            <ScrollReveal key={project.title}>
              <a
                href={`/projects/${slugify(project.title)}`}
                className="block border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm overflow-hidden hover:-translate-y-1 hover:border-[var(--color-primary)]/55 hover:shadow-lg transition-all duration-180"
              >
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="w-full aspect-[16/10] object-cover bg-[var(--color-surface-muted)]"
                  loading="lazy"
                />
                <div className="p-[22px]">
                  <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.08em] uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-[var(--color-text)] font-bold mt-1">{project.title}</h3>
                  <p className="text-[var(--color-muted)] mt-3 text-sm">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-[18px]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center min-h-7 px-2.5 py-1 rounded-full text-xs font-bold bg-[var(--color-surface-muted)] text-[var(--color-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="p-6 border border-dashed border-[var(--color-line)] rounded-lg text-center text-[var(--color-muted)]">
            No projects match that filter yet.
          </p>
        )}
      </div>
    </section>
  )
}