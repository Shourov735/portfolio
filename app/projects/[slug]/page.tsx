import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { getContent, slugify } from "@/lib/content"

export function generateStaticParams() {
  return getContent().projects.map((p) => ({ slug: slugify(p.title) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getContent().projects.find((p) => slugify(p.title) === slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Case Study | Md. Shourov`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Case Study | Md. Shourov`,
      description: project.summary,
      images: project.image ? [{ url: project.image }] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projects = getContent().projects
  const currentIndex = projects.findIndex((p) => slugify(p.title) === slug)

  if (currentIndex === -1) {
    notFound()
  }

  const project = projects[currentIndex]
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <div className="section">
      <div className="container-main max-w-[960px]">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-[var(--color-muted)] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-primary-strong)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#projects" className="hover:text-[var(--color-primary-strong)] transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text)] font-bold truncate max-w-[280px]">
            {project.title}
          </span>
        </nav>

        {/* Case Study Card */}
        <article className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] shadow-md overflow-hidden">
          {/* Cover Media */}
          {project.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-muted)] border-b border-[var(--color-line)]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.1em] uppercase px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20">
                {project.category}
              </span>
              <span className="text-xs font-bold text-[var(--color-primary-strong)] px-3 py-1 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                Engineering Case Study
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
              {project.title}
            </h1>

            <p className="text-base md:text-lg text-[var(--color-muted)] mt-4 leading-relaxed max-w-[800px]">
              {project.summary}
            </p>

            {/* Quick Meta Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-5 rounded-xl bg-[var(--color-surface-muted)]/60 border border-[var(--color-line)] text-xs">
              <div>
                <span className="block text-[var(--color-muted)] font-bold uppercase tracking-wider mb-1">
                  Category
                </span>
                <span className="text-[var(--color-text)] font-extrabold">{project.category}</span>
              </div>
              <div>
                <span className="block text-[var(--color-muted)] font-bold uppercase tracking-wider mb-1">
                  Role / Scope
                </span>
                <span className="text-[var(--color-text)] font-extrabold">Full-Stack Architect</span>
              </div>
              <div>
                <span className="block text-[var(--color-muted)] font-bold uppercase tracking-wider mb-1">
                  Primary Stack
                </span>
                <span className="text-[var(--color-text)] font-extrabold truncate block">
                  {project.tags.slice(0, 2).join(", ")}
                </span>
              </div>
              <div>
                <span className="block text-[var(--color-muted)] font-bold uppercase tracking-wider mb-1">
                  Availability
                </span>
                <span className="text-emerald-500 font-extrabold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Deployed / Public
                </span>
              </div>
            </div>

            {/* Architecture Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="my-8 p-6 md:p-8 rounded-xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-muted)]/50">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="text-lg">⚡</span>
                  <h2 className="text-lg md:text-xl font-bold text-[var(--color-text)]">
                    System Architecture & Key Technical Highlights
                  </h2>
                </div>
                <ul className="grid gap-3">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--color-muted)] leading-relaxed"
                    >
                      <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="my-8">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text)] mb-3">
                Technologies & Tools Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[var(--color-line)]">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={link.label === "Live Demo" ? "btn-primary" : "btn-secondary"}
                >
                  <span>{link.label}</span>
                  <span className="text-sm">↗</span>
                </a>
              ))}
              <Link href="/#projects" className="btn-ghost">
                ← All Projects
              </Link>
            </div>
          </div>
        </article>

        {/* Previous / Next Project Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {prevProject ? (
            <Link
              href={`/projects/${slugify(prevProject.title)}`}
              className="p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all text-left group"
            >
              <span className="text-[11px] font-bold text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] uppercase tracking-wider block mb-1">
                ← Previous Project
              </span>
              <span className="text-sm md:text-base font-bold text-[var(--color-text)] line-clamp-1">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${slugify(nextProject.title)}`}
              className="p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/50 hover:shadow-md transition-all text-right group sm:col-start-2"
            >
              <span className="text-[11px] font-bold text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] uppercase tracking-wider block mb-1">
                Next Project →
              </span>
              <span className="text-sm md:text-base font-bold text-[var(--color-text)] line-clamp-1">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  )
}

