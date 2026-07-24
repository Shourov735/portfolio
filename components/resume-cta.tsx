import { ScrollReveal } from "@/components/scroll-reveal"

export function ResumeCTA() {
  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="resume">
      <div className="container-main">
        <ScrollReveal>
          <div className="flex items-center justify-between gap-6 border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-[30px] max-md:flex-col max-md:items-stretch">
            <div>
              <p className="eyebrow">Resume</p>
              <h2 className="text-[clamp(2rem,4vw,3.1rem)] font-bold leading-[1.08] text-[var(--color-text)]">
                Want the quick version?
              </h2>
              <p className="text-[var(--color-muted)] mt-1">
                Download my resume for a summary of skills, projects, and background.
              </p>
            </div>
            <a
              href="/assets/resume/Md-Shourov-Resume.pdf"
              download
              className="btn-primary shrink-0"
            >
              Download Resume
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}