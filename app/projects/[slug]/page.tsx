import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { getContent, slugify } from "@/lib/content"
import { getPostBySlug } from "@/lib/blog"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import { AUTHOR_JSONLD, PUBLISHER_JSONLD, buildWebPageSchema } from "@/lib/jsonld"
import { SpecHeader } from "@/components/case-study/spec-header"
import { TableOfContents, type TocItem } from "@/components/reading/table-of-contents"
import { MobileTocDrawer } from "@/components/reading/mobile-toc-drawer"
import { ArchitectureExplorer } from "@/components/reading/architecture-explorer"
import { TradeoffMatrix } from "@/components/reading/tradeoff-matrix"
import { CrossLinkCard } from "@/components/reading/cross-link-card"
import { SequentialNav } from "@/components/reading/sequential-nav"

export function generateStaticParams() {
  return getContent().projects.map((p) => ({ slug: slugify(p.title) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getContent().projects.find((p) => slugify(p.title) === slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const title = project.metaTitle ?? `${project.title} — Case Study`
  const description = project.metaDescription || project.summary
  const pageUrl = absoluteUrl(`/projects/${slug}`)
  const imageUrl = absoluteUrl(project.image ?? "/opengraph-image")
  const images = [
    {
      url: imageUrl,
      alt: `${project.title} — Case Study Preview by Md. Shourov`,
    },
  ]

  return {
    title,
    description,
    keywords: project.tags,
    authors: [{ name: "Md. Shourov", url: SITE_URL }],
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
      siteName: "Md. Shourov Portfolio",
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

  const relatedPost = project.relatedBlogSlug ? await getPostBySlug(project.relatedBlogSlug) : null

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

  // Has interactive architecture explorer
  const hasInteractiveExplorer = [
    "nabodigonto",
    "insidejibon",
    "arvaana",
    "quiz-management-and-examination-system",
    "quiz-management",
    "image-comparison",
    "remocomp",
  ].includes(slug)

  // Deterministic TOC matching heading IDs with scroll-mt-24
  const tocItems: TocItem[] = [
    project.problem ? { id: "problem-heading", text: "The Problem" } : null,
    project.technicalApproach ? { id: "approach-heading", text: "Technical Approach" } : null,
    hasInteractiveExplorer ? { id: "interactive-architecture", text: "Interactive Explorer" } : null,
    project.visualEvidence ? { id: "evidence-heading", text: project.visualEvidence.title } : null,
    project.highlights && project.highlights.length > 0
      ? { id: "architecture-heading", text: "Key Architecture Highlights" }
      : null,
    project.challenges && project.challenges.length > 0
      ? { id: "challenges-heading", text: "Engineering Challenges" }
      : null,
    project.keyDecisions && project.keyDecisions.length > 0
      ? { id: "decisions-heading", text: "Key Engineering Decisions" }
      : null,
    project.adrs && project.adrs.length > 0
      ? { id: "architecture-decisions", text: "Trade-Off Analysis (ADRs)" }
      : null,
    project.result ? { id: "result-heading", text: "Result & Outcome" } : null,
    { id: "stack-heading", text: "Technologies & Tools" },
  ].filter(Boolean) as TocItem[]

  return (
    <div className="section pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { name: "Md Shourov", href: "/" },
              { name: "Projects", href: "/#projects" },
              { name: project.title },
            ]}
          />
        </div>

        {/* Mobile TOC Drawer */}
        <MobileTocDrawer items={tocItems} />

        {/* Responsive Asymmetric 2-Column Grid */}
        <div className="lg:grid lg:grid-cols-[1fr_280px] gap-12 items-start">
          {/* Main Reading Column */}
          <div className="min-w-0 max-w-3xl">
            <article className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] shadow-md overflow-hidden">
              {/* Cover Media */}
              {project.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-muted)] border-b border-[var(--color-line)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} — architectural layout and system interface preview`}
                    width={960}
                    height={540}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 960px"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-[var(--color-accent)] text-[11px] font-mono uppercase tracking-[0.16em] font-medium">
                    {project.category}
                  </span>
                  <span aria-hidden="true" className="text-[var(--color-line)]">
                    ·
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    Engineering Case Study
                  </span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-[var(--color-text)] tracking-tight text-balance">
                  {project.title}
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[var(--color-muted)] mt-5 leading-relaxed max-w-[60ch] text-balance">
                  {project.summary}
                </p>

                {/* High-Density TL;DR Spec Header */}
                <SpecHeader project={project} />

                {/* The Problem */}
                {project.problem && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="problem-heading">
                    <h2
                      id="problem-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      The Problem
                    </h2>
                    <p className="text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed max-w-[68ch]">
                      {project.problem}
                    </p>
                  </section>
                )}

                {/* Technical Approach */}
                {project.technicalApproach && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="approach-heading">
                    <h2
                      id="approach-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      Technical Approach
                    </h2>
                    <p className="text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed max-w-[68ch]">
                      {project.technicalApproach}
                    </p>
                  </section>
                )}

                {/* Interactive Architecture Explorer */}
                <ArchitectureExplorer slug={slug} />

                {/* Visual Evidence / Diagram / Terminal Session */}
                {project.visualEvidence && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="evidence-heading">
                    <h2
                      id="evidence-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      {project.visualEvidence.title}
                    </h2>
                    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface-muted)] p-4 md:p-6 overflow-x-auto shadow-xs">
                      {project.visualEvidence.type === "terminal" ? (
                        <div className="bg-[#0b1120] text-[#38bdf8] p-4 rounded-lg shadow-inner overflow-x-auto">
                          <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-700/60 text-xs text-slate-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 font-mono text-[11px] text-slate-400">
                              tetric-network-multiplayer — posix-tcp-socket
                            </span>
                          </div>
                          <pre className="text-[#38bdf8] font-mono text-xs whitespace-pre leading-snug">
                            {project.visualEvidence.content.join("\n")}
                          </pre>
                        </div>
                      ) : (
                        <div className="space-y-3 py-1">
                          {project.visualEvidence.content.map((step, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 text-xs md:text-sm font-mono text-[var(--color-text)]"
                            >
                              <span className="text-[var(--color-primary-strong)] font-bold shrink-0">
                                [Step {idx + 1}]
                              </span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {project.visualEvidence.caption && (
                      <p className="text-xs text-[var(--color-muted)] mt-2.5 font-mono">
                        {project.visualEvidence.caption}
                      </p>
                    )}
                  </section>
                )}

                {/* Architecture Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="architecture-heading">
                    <h2
                      id="architecture-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-5 tracking-tight"
                    >
                      Key Highlights & Architecture
                    </h2>
                    <ul className="grid gap-3">
                      {project.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="text-[var(--color-primary)] mt-1.5 shrink-0 font-bold"
                          >
                            ▸
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Engineering Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="challenges-heading">
                    <h2
                      id="challenges-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      Engineering Challenges
                    </h2>
                    <ul className="grid gap-3">
                      {project.challenges.map((challenge, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed"
                        >
                          <span aria-hidden="true" className="text-amber-500 mt-1 shrink-0 font-bold font-mono">
                            !
                          </span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Key Engineering Decisions */}
                {project.keyDecisions && project.keyDecisions.length > 0 && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="decisions-heading">
                    <h2
                      id="decisions-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      Key Engineering Decisions
                    </h2>
                    <ul className="grid gap-3">
                      {project.keyDecisions.map((decision, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="text-[var(--color-primary)] mt-1 shrink-0 font-bold font-mono"
                          >
                            ✓
                          </span>
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Architecture Decision Records (ADRs) */}
                <TradeoffMatrix adrs={project.adrs} />

                {/* Result & Outcome */}
                {project.result && (
                  <section className="my-10 scroll-mt-24" aria-labelledby="result-heading">
                    <h2
                      id="result-heading"
                      className="font-display text-2xl md:text-3xl text-[var(--color-text)] mb-4 tracking-tight"
                    >
                      Result & Outcome
                    </h2>
                    <p className="text-[0.95rem] md:text-base text-[var(--color-muted)] leading-relaxed max-w-[68ch]">
                      {project.result}
                    </p>
                  </section>
                )}

                {/* Technologies & Tools */}
                <section className="my-10 scroll-mt-24" aria-labelledby="stack-heading">
                  <h3
                    id="stack-heading"
                    className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-3 font-medium"
                  >
                    Technologies & Tools
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

                {/* Companion Deep-Dive Blog Banner */}
                {relatedPost && (
                  <CrossLinkCard
                    type="to-blog"
                    title={relatedPost.title}
                    href={`/blog/${relatedPost.slug}`}
                    description={relatedPost.description}
                  />
                )}

                {/* Bottom Action Links */}
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

            {/* Sequential Bottom Navigation with Keyboard Shortcuts */}
            <SequentialNav
              prev={
                prevProject
                  ? {
                      title: prevProject.title,
                      href: `/projects/${slugify(prevProject.title)}`,
                      category: prevProject.category,
                    }
                  : null
              }
              next={
                nextProject
                  ? {
                      title: nextProject.title,
                      href: `/projects/${slugify(nextProject.title)}`,
                      category: nextProject.category,
                    }
                  : null
              }
              typeLabel="Case Study"
            />
          </div>

          {/* Desktop Sticky Rail */}
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </aside>
        </div>
      </div>
    </div>
  )
}
