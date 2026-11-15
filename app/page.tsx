import { Hero } from "@/components/hero"
import { StatsBand } from "@/components/stats-band"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { LatestPosts } from "@/components/blog/latest-posts"
import { CurrentlyLooking } from "@/components/currently-looking"
import { NowLearning } from "@/components/now-learning"
import { ResumeCTA } from "@/components/resume-cta"
import { Contact } from "@/components/contact"
import { getContent } from "@/lib/content"
import type { ProjectCardSummary } from "@/lib/types"

export default function Home() {
  const content = getContent()

  // Map only the fields needed by homepage cards to avoid serializing heavy ADRs & case study text
  const projectSummaries: ProjectCardSummary[] = content.projects.map((p) => ({
    title: p.title,
    summary: p.summary,
    category: p.category,
    tags: p.tags,
    image: p.image,
    links: p.links,
    tech: p.tech,
    highlights: p.highlights,
  }))

  const featuredSummaries = content.featuredProject.map((p) => ({
    title: p.title,
    summary: p.summary,
    category: p.category,
    tags: p.tags,
    image: p.image,
    links: p.links,
    tech: p.tech,
    highlights: p.highlights,
    systemType: p.systemType,
  }))

  return (
    <>
      <Hero />
      <StatsBand stats={content.stats} />
      <Spotlight projects={featuredSummaries} />
      <Projects projects={projectSummaries} />
      <CurrentlyLooking />
      <Skills groups={content.skills} />
      <About />
      <Education items={content.education} />
      <LatestPosts />
      <NowLearning />
      <ResumeCTA />
      <Contact />
    </>
  )
}
