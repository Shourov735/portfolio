import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { StatsBand } from "@/components/stats-band"
import { Skills } from "@/components/skills"
import { Spotlight } from "@/components/spotlight"
import { Projects } from "@/components/projects"
import { Notes } from "@/components/notes"
import { NowLearning } from "@/components/now-learning"
import { Timeline } from "@/components/timeline"
import { Education } from "@/components/education"
import { Achievements } from "@/components/achievements"
import { ResumeCTA } from "@/components/resume-cta"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <StatsBand />
      <Skills />
      <Spotlight />
      <Projects />
      <Notes />
      <NowLearning />
      <Timeline />
      <Education />
      <Achievements />
      <ResumeCTA />
      <Contact />
    </>
  )
}