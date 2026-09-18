import { Hero } from "@/components/hero"
import { StatsBand } from "@/components/stats-band"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { Timeline } from "@/components/timeline"
import { Achievements } from "@/components/achievements"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Education } from "@/components/education"
import { AdmissionResults } from "@/components/admission-results"
import { LatestPosts } from "@/components/blog/latest-posts"
import { CurrentlyLooking } from "@/components/currently-looking"
import { NowLearning } from "@/components/now-learning"
import { ResumeCTA } from "@/components/resume-cta"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Spotlight />
      <Projects />
      <Timeline />
      <Achievements />
      <Skills />
      <About />
      <Education />
      <AdmissionResults />
      <LatestPosts />
      <CurrentlyLooking />
      <NowLearning />
      <ResumeCTA />
      <Contact />
    </>
  )
}
