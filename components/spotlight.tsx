"use client"

import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Spotlight() {
  const projects = getContent().featuredProject

  return (
    <section className="section" id="spotlight">
      <div className="container-main">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Featured Projects</p>
            <h2>A closer look at the work I&apos;m proud of.</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-7 max-md:grid-cols-1">
          {projects.map((project) => (
            <ScrollReveal key={project.title}>
              <div className="grid grid-cols-[0.85fr_1.15fr] gap-7 items-center border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-lg overflow-hidden max-md:grid-cols-1">
                <div className="min-h-[320px] bg-[var(--color-surface-muted)] max-md:order-first">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="w-full h-full min-h-[320px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-[30px_30px_30px_0] max-md:p-[0_24px_26px]">
                  <p className="eyebrow">Featured Project</p>
                  <h3 className="text-xl font-bold text-[var(--color-text)]">{project.title}</h3>
                  <p className="text-[var(--color-muted)] mt-3">{project.summary}</p>
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
                  <div className="flex flex-wrap gap-3 mt-[18px]">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-extrabold text-[var(--color-primary-strong)] hover:underline underline-offset-4"
                      >
                        {link.label} →
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
