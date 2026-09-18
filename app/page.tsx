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

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Spotlight />
      <Projects />
      <CurrentlyLooking />
      <Skills />
      <About />
      <Education />
      <LatestPosts />
      <NowLearning />
      <ResumeCTA />
      <Contact />
    </>
  )
}
