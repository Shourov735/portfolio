import { notFound } from "next/navigation"
import Link from "next/link"
import { getContent, slugify } from "@/lib/content"

export function generateStaticParams() {
  return getContent().projects.map((p) => ({ slug: slugify(p.title) }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = getContent().projects
  const project = projects.find((p) => slugify(p.title) === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="section">
      <div className="container-main max-w-[840px]">
        <Link href="/#projects" className="text-[var(--color-muted)] font-bold hover:text-[var(--color-primary-strong)] transition-colors mb-6 inline-block">
          ← Back to projects
        </Link>

        <div className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm overflow-hidden">
          {project.image && (
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              className="w-full aspect-video object-cover bg-[var(--color-surface-muted)]"
            />
          )}
          <div className="p-8">
            <span className="text-[var(--color-accent)] text-xs font-extrabold tracking-[0.08em] uppercase">
              {project.category}
            </span>
            <h1 className="text-3xl font-bold text-[var(--color-text)] mt-2">{project.title}</h1>
            <p className="text-lg text-[var(--color-muted)] mt-4">{project.summary}</p>

            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center min-h-7 px-3 py-1 rounded-full text-sm font-bold bg-[var(--color-surface-muted)] text-[var(--color-muted)]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 p-6 border border-[var(--color-line)] rounded-lg bg-[var(--color-surface-muted)]/50">
              <p className="text-[var(--color-muted)] italic">
                Full case study coming soon. For now, check out the code and links below.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}