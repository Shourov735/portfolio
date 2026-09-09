import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getContent, slugify } from "@/lib/content"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { AUTHOR_JSONLD, PUBLISHER_JSONLD, buildWebPageSchema } from "@/lib/jsonld"

export function generateStaticParams() {
  return getContent().projects.map((p) => ({ slug: slugify(p.title) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getContent().projects.find((p) => slugify(p.title) === slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const title = `${project.title} — Engineering Case Study`
  const description = project.summary
  const pageUrl = absoluteUrl(`/projects/${slug}`)
  const imageUrl = absoluteUrl(project.image ?? "/opengraph-image")
  const images = [
    {
      url: imageUrl,
      alt: `${project.title} — Case Study Preview by Md Shourov`,
    },
  ]

  return {
    title,
    description,
    keywords: project.tags,
    authors: [{ name: "Md Shourov", url: SITE_URL }],
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
      siteName: "Md Shourov Portfolio",
      locale: "en_US",
      images,
      authors: [SITE_URL],
      tags: project.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
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

  const imageUrl = absoluteUrl(project.image ?? "/opengraph-image")

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.title} — Case Study`,
    description: project.summary,
    image: imageUrl,
    url: absoluteUrl(`/projects/${slug}`),
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString(),
    author: AUTHOR_JSONLD,
    publisher: PUBLISHER_JSONLD,
    keywords: project.tags.join(", "),
    articleSection: project.category,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/projects/${slug}`),
    },
    about: project.tags,
  }

  const webPageSchema = buildWebPageSchema({
    path: `/projects/${slug}`,
    name: `${project.title} — Engineering Case Study`,
    description: project.summary,
    primaryImage: imageUrl,
  })

  return (
    <div className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="container-main max-w-[960px]">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { name: "Md Shourov", href: "/" },
              { name: "Projects", href: "/#projects" },
              { name: project.title },
            ]}
          />
        </div>

        {/* Case Study Card */}
        <article className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] shadow-md overflow-hidden">
          {/* Cover Media */}
          {project.image && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-muted)] border-b border-[var(--color-line)]">
              <Image
                src={project.image}
                alt={`${project.title} - Engineering Case Study by Md Shourov`}
                width={960}
                height={540}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-[var(--color-accent)] text-[11px] font-mono uppercase tracking-[0.16em] font-medium">
                {project.category}
              </span>
              <span aria-hidden="true" className="text-[var(--color-line)]">
                ·
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Case Study
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-[var(--color-text)] tracking-tight text-balance">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-muted)] mt-5 leading-relaxed max-w-[60ch] text-balance">
              {project.summary}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 my-10 py-6 border-y border-[var(--color-line)]">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
                  Category
                </p>
                <p className="text-[var(--color-text)] font-semibold">{project.category}</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
                  Role
                </p>
                <p className="text-[var(--color-text)] font-semibold">Full-Stack Architect</p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
                  Primary Stack
                </p>
                <p className="text-[var(--color-text)] font-semibold truncate">
                  {project.tags.slice(0, 2).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] mb-1.5">
                  Status
                </p>
                <p className="text-[var(--color-primary-strong)] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  Deployed / Public
                </p>
              </div>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <section className="my-10" aria-labelledby="architecture-heading">
                <h2
                  id="architecture-heading"
                  className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-5 tracking-tight"
                >
                  Architecture & Highlights
                </h2>
                <ul className="grid gap-3">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed"
                    >
                      <span aria-hidden="true" className="text-[var(--color-primary)] mt-1.5 shrink-0">
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="my-10" aria-labelledby="stack-heading">
              <h3
                id="stack-heading"
                className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-3 font-medium"
              >
                Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--color-surface-muted)] text-[var(--color-text)] border border-[var(--color-line)] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--color-line)]">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={link.label === "Live Demo" ? "btn-primary" : "btn-secondary"}
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
              <Link href="/#projects" className="btn-ghost">
                ← All Projects
              </Link>
            </div>
          </div>
        </article>

        {/* Previous / Next Project Navigation */}
        <nav aria-label="Project navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {prevProject ? (
            <Link
              href={`/projects/${slugify(prevProject.title)}`}
              className="p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all text-left group"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] block mb-1.5">
                ← Previous
              </span>
              <span className="text-sm md:text-base font-semibold text-[var(--color-text)] line-clamp-1">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${slugify(nextProject.title)}`}
              className="p-5 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all text-right group sm:col-start-2"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-primary-strong)] block mb-1.5">
                Next →
              </span>
              <span className="text-sm md:text-base font-semibold text-[var(--color-text)] line-clamp-1">
                {nextProject.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  )
}
