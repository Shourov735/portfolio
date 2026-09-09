import { Hero } from "@/components/hero"
import { StatsBand } from "@/components/stats-band"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Timeline } from "@/components/timeline"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { NowLearning } from "@/components/now-learning"
import { ResumeCTA } from "@/components/resume-cta"
import { Contact } from "@/components/contact"
import { LatestPosts } from "@/components/blog/latest-posts"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Spotlight />
      <Projects />
      <Skills />
      <About />
      <Timeline />
      <Education />
      <Achievements />
      <NowLearning />
      <LatestPosts />
      <ResumeCTA />
      <Contact />
    </>
  )
}
