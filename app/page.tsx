import { Hero } from "@/components/hero"
import { StatsBand } from "@/components/stats-band"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { About } from "@/components/about"
import { Timeline } from "@/components/timeline"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { Notes } from "@/components/notes"
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
      <Skills />
      <About />
      <Timeline />
      <Education />
      <Achievements />
      <Notes />
      <NowLearning />
      <ResumeCTA />
      <Contact />
    </>
  )
}

