export function ResumeCTA() {
  return (
    <section className="section" id="resume">
      <div className="container-main">
        <div className="flex items-center justify-between gap-8 border border-[var(--color-line)] rounded-2xl bg-[var(--color-text)] text-[var(--color-bg)] p-8 md:p-10 max-md:flex-col max-md:items-start">
          <div>
            <p className="font-mono uppercase tracking-[0.16em] text-[11px] text-[var(--color-bg)]/70 mb-3">
              Resume
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.04] tracking-tight text-balance">
              Want the quick version?
            </h2>
            <p className="mt-3 text-[var(--color-bg)]/72 max-w-[44ch]">
              Download my resume for a one-page summary of skills, projects, and background.
            </p>
          </div>
          <a
            href="/assets/resume/Md-Shourov-Resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-md bg-[var(--color-bg)] text-[var(--color-text)] font-semibold hover:opacity-90 transition-opacity shrink-0"
          >
            Download Resume
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
