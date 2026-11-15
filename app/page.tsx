import { Hero } from "@/components/hero"
import { StatsBand } from "@/components/stats-band"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { AlgorithmicProofBento } from "@/components/algorithmic-proof-bento"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { LatestPosts } from "@/components/blog/latest-posts"
import { CurrentlyLooking } from "@/components/currently-looking"
import { NowLearning } from "@/components/now-learning"
import { ResumeCTA } from "@/components/resume-cta"
import { Contact } from "@/components/contact"
import { getContent } from "@/lib/content"
import { slugify } from "@/lib/blog-utils"
import type { ProjectCardSummary } from "@/lib/types"

export default function Home() {
  const content = getContent()

  const projectSummaries: ProjectCardSummary[] = content.projects.map((p) => ({
    title: p.title,
    slug: slugify(p.title),
    summary: p.summary,
    category: p.category,
    tags: p.tags,
    links: p.links,
    image: p.image,
    role: p.role,
  }))

  return (
    <>
      <Hero />
      <StatsBand stats={content.stats} />
      <Spotlight />
      <Projects projects={projectSummaries}>
        <AlgorithmicProofBento />
      </Projects>
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
