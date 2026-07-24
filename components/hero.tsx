import { ScrollReveal } from "@/components/scroll-reveal"

export function Hero() {
  return (
    <section className="section" id="home">
      <div className="container-main grid grid-cols-[1.1fr_minmax(320px,0.9fr)] gap-12 items-center max-md:grid-cols-1 max-md:pt-11">
        <div>
          <ScrollReveal>
            <p className="text-[var(--color-accent)] text-[0.78rem] font-extrabold tracking-[0.12em] uppercase mb-3">
              Software Engineering Student · University of Dhaka
            </p>
            <h1 className="text-[clamp(2.65rem,6vw,5.5rem)] font-bold leading-[1.08] text-[var(--color-text)] m-0 max-w-[760px]">
              Building practical software with algorithms, systems thinking, and curiosity.
            </h1>
            <p className="text-[clamp(1.05rem,2vw,1.28rem)] text-[var(--color-muted)] max-w-[660px] mt-6">
              Hi, I am Md. Shourov. I enjoy competitive programming, C/C++ projects,
              clean frontend experiences, and turning difficult ideas into working software.
            </p>
            <div className="flex flex-wrap gap-3 mt-7 max-md:flex-col">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-secondary">Contact Me</a>
              <a href="/assets/resume/Md-Shourov-Resume.pdf" download className="btn-ghost">
                Download Resume
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {[
                { label: "GitHub", href: "https://github.com/Shourov735" },
                { label: "LinkedIn", href: "https://linkedin.com/in/md-shourov-89125a337" },
                { label: "X / Twitter", href: "https://x.com/@Shourov735" },
                { label: "Codeforces", href: "https://codeforces.com/profile/Shourov735" },
                { label: "Facebook", href: "https://www.facebook.com/mdshourov.738" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--color-muted)] font-bold py-1.5 border-b-2 border-[var(--color-primary)]/35 hover:text-[var(--color-primary-strong)] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <div className="relative min-h-[430px] grid place-items-center max-md:min-h-[360px] max-md:order-first">
          <ScrollReveal>
            <img
              src="/assets/images/profile.jpg"
              alt="Portrait of Md. Shourov"
              className="w-[min(390px,82vw)] aspect-square object-cover rounded-lg border border-[var(--color-line)] shadow-lg"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}