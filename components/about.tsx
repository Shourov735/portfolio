import { ScrollReveal } from "@/components/scroll-reveal"

export function About() {
  return (
    <section className="section bg-[var(--color-surface-muted)]/72" id="about">
      <div className="container-main grid grid-cols-[minmax(260px,0.75fr)_1.25fr] gap-12 items-start max-md:grid-cols-1">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">Engineering Philosophy</p>
            <h2>Focused on fundamentals, systems execution, and steady growth.</h2>
            <p className="text-[var(--color-muted)] mt-3 text-sm leading-relaxed max-w-[44ch]">
              Bridging competitive algorithmic rigor with production-ready software systems.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-[var(--color-line)] rounded-2xl bg-[var(--color-surface)] p-7 md:p-9">
            <p className="text-[var(--color-muted)] text-base md:text-[1.0625rem] leading-relaxed mb-5">
              I am an undergraduate reading for my Bachelor of Science in Software Engineering (BSSE) at the{" "}
              <strong className="text-[var(--color-text)] font-semibold">
                Institute of Information Technology (IIT), University of Dhaka (IIT DU)
              </strong>
              , based in Gazipur &amp; Dhaka, Bangladesh. Known across developer platforms as{" "}
              <strong className="text-[var(--color-text)] font-semibold">Shourov735</strong>, my engineering
              focus centers on distributed edge systems, offline-first mobile architecture, database modeling,
              and resilient full-stack platforms.
            </p>
            <p className="text-[var(--color-muted)] text-base md:text-[1.0625rem] leading-relaxed">
              Over 1,500 problems solved in competitive programming have trained me to reason deeply under
              strict performance and memory constraints. I channel that rigor into engineering real-world
              software — such as architecting the flagship double-signed treasury system for{" "}
              <strong className="text-[var(--color-text)] font-semibold">Nabodigonto</strong>, where I was
              subsequently appointed as{" "}
              <strong className="text-[var(--color-text)] font-semibold">IT Secretary</strong>.
            </p>
            <div className="pt-6 mt-7 border-t border-[var(--color-line)]">
              <h3 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4 font-medium">
                Core Engineering Tenets
              </h3>
              <ul className="grid gap-3 list-none p-0 m-0">
                {[
                  "Design for reliability first: resilient schema migrations, blind audits, and edge caching.",
                  "Offline parity: build mobile experiences that remain 100% functional without network connectivity.",
                  "Apply GoF patterns (Strategy, State, Observer, Factory) for maintainable codebases.",
                  "Continuous open-source contribution and community mentorship.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] text-[var(--color-muted)] leading-relaxed"
                  >
                    <span aria-hidden="true" className="text-[var(--color-accent)] shrink-0 mt-0.5 font-mono">
                      ▸
                    </span>
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
