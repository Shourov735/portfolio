import { ScrollReveal } from "@/components/scroll-reveal"

export function About() {
  return (
    <section className="section" id="about">
      <div className="container-main grid grid-cols-[minmax(260px,0.72fr)_1fr] gap-12 items-start max-md:grid-cols-1">
        <ScrollReveal>
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Focused on fundamentals, execution, and steady growth.</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="border border-[var(--color-line)] rounded-lg bg-[var(--color-surface)] shadow-sm p-7">
            <p className="text-[var(--color-muted)] mb-4">
              I am a Software Engineering student at the University of Dhaka, based in Gazipur, Bangladesh,
              with a strong interest in data structures, algorithms, database design, and building projects
              that sharpen real engineering skill.
            </p>
            <p className="text-[var(--color-muted)] mb-4">
              Competitive programming has trained me to reason under constraints. Project work helps me turn
              that reasoning into usable software, from console games to solution archives and full-stack web
              apps.
            </p>
            <ul className="grid gap-2.5 mt-5 list-none p-0">
              {[
                "Build practical full-stack web applications.",
                "Contribute to open-source projects and the developer community.",
                "Keep learning TypeScript, React, systems programming, and design patterns.",
              ].map((item) => (
                <li key={item} className="relative pl-6 font-semibold text-[var(--color-text)]">
                  <span
                    className="absolute left-0 top-[0.7em] w-[9px] h-[9px] rounded-full bg-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
