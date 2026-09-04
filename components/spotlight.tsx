"use client"

import { getContent, slugify } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Spotlight() {
  const projects = getContent().featuredProject

  return (
    <section className="section" id="spotlight">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Featured Work</p>
            <h2>Flagship engineering projects & production systems.</h2>
            <p className="text-[var(--color-muted)] max-w-[640px] mt-2 text-base">
              A curated selection of high-impact platforms, from double-signed treasury protocols to bilingual EdTech and systems software.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-10">
          {projects.map((project, index) => {
            const slug = slugify(project.title)
            const isReversed = index % 2 !== 0

            return (
              <ScrollReveal key={project.title}>
                <article className="group border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] shadow-md overflow-hidden hover:border-[var(--color-primary)]/50 hover:shadow-xl transition-all duration-300">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 ${
                      isReversed ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    {/* Visual Media Column */}
                    <div className="lg:col-span-6 relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-muted)] group-hover:border-[var(--color-primary)]/40 transition-colors">
                      <a href={`/projects/${slug}`} className="block overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          className="w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </a>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2.5">
                          <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                            {project.category}
                          </span>
                          <span className="text-xs font-bold text-[var(--color-primary-strong)] px-2.5 py-0.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                            Featured Project
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text)] tracking-tight">
                          <a href={`/projects/${slug}`} className="hover:text-[var(--color-primary-strong)] transition-colors">
                            {project.title}
                          </a>
                        </h3>

                        <p className="text-[var(--color-muted)] mt-3 leading-relaxed text-sm md:text-base">
                          {project.summary}
                        </p>
                      </div>

                      {/* Architecture & Key Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text)] mb-2">
                            Key Highlights:
                          </p>
                          <ul className="grid gap-2">
                            {project.highlights.slice(0, 3).map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--color-muted)] leading-normal"
                              >
                                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--color-line)]/70">
                        <a
                          href={`/projects/${slug}`}
                          className="btn-primary text-xs px-4 py-2"
                        >
                          Case Study →
                        </a>

                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary text-xs px-3.5 py-2 inline-flex items-center gap-1.5"
                          >
                            <span>{link.label}</span>
                            <span className="text-xs">↗</span>
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
      </div>
    </section>
  )
}

