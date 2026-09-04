import { ScrollReveal } from "@/components/scroll-reveal"

export function About() {
  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="about">
      <div className="container-main grid grid-cols-[minmax(260px,0.75fr)_1.25fr] gap-12 items-start max-md:grid-cols-1">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Engineering Philosophy</p>
            <h2>Focused on fundamentals, systems execution, and steady growth.</h2>
            <p className="text-[var(--color-muted)] mt-3 text-sm leading-relaxed">
              Bridging the gap between competitive algorithmic rigor and production-ready software systems.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] shadow-sm p-7 md:p-8">
            <p className="text-[var(--color-muted)] text-base leading-relaxed mb-4">
              I am a Software Engineering student at the <strong className="text-[var(--color-text)]">Institute of Information Technology (IIT), University of Dhaka</strong>, based in Gazipur, Bangladesh. My work centers on distributed web systems, offline-first mobile applications, database architecture, and resilient edge deployments.
            </p>
            <p className="text-[var(--color-muted)] text-base leading-relaxed mb-6">
              Over 1,500 problems solved in competitive programming have trained me to reason deeply under strict performance and memory constraints. I channel that rigor into engineering real-world software—such as architecting the flagship double-signed treasury system for <strong className="text-[var(--color-text)]">Nabodigonto</strong>, where I was subsequently appointed as <strong className="text-[var(--color-text)]">IT Secretary</strong>.
            </p>
            <div className="pt-4 border-t border-[var(--color-line)]/70">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-text)] mb-3">
                Core Engineering Tenets:
              </h3>
              <ul className="grid gap-3 list-none p-0 m-0">
                {[
                  "Design for reliability first: resilient schema migrations, blind audits, and edge caching.",
                  "Offline parity: build mobile experiences that remain 100% functional without network connectivity.",
                  "Clean design patterns: apply GoF principles (Strategy, State, Observer, Factory) for maintainable codebases.",
                  "Continuous open-source contribution and community mentorship.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[var(--color-muted)] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

