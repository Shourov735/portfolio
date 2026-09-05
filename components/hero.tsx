import { ScrollReveal } from "@/components/scroll-reveal"

export function Hero() {
  return (
    <section className="section" id="home">
      <div className="container-main grid grid-cols-[1.1fr_minmax(320px,0.9fr)] gap-12 items-center max-md:grid-cols-1 max-md:pt-11">
        <div>
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/8 text-[var(--color-primary-strong)] text-xs font-bold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-Stack & Mobile Engineering</span>
            </div>
            <p className="text-[var(--color-accent)] text-[0.82rem] font-extrabold tracking-[0.12em] uppercase mb-3">
              Software Engineering @ IIT, University of Dhaka · IT Secretary @ Nabodigonto
            </p>
            <h1 className="text-[clamp(2.4rem,5.2vw,4.75rem)] font-extrabold leading-[1.1] text-[var(--color-text)] m-0 max-w-[780px]">
              Architecting high-impact web platforms, offline mobile systems & clean code.
            </h1>
            <p className="text-[clamp(1.05rem,1.8vw,1.25rem)] text-[var(--color-muted)] max-w-[660px] mt-6 leading-relaxed">
              Hi, I am <strong className="text-[var(--color-text)]">Md. Shourov</strong> (@Shourov735 / mdshourov). I study Software Engineering (BSSE) at the <strong className="text-[var(--color-text)]">Institute of Information Technology (IIT), University of Dhaka (IIT DU)</strong> and serve as <strong className="text-[var(--color-text)]">IT Secretary</strong> at Nabodigonto. I engineer resilient edge-native web platforms with Next.js 16, Cloudflare Workers, and PostgreSQL, build offline-first mobile applications in React Native, and practice algorithmic problem solving.
            </p>
            <div className="flex flex-wrap gap-3 mt-7 max-md:flex-col">
              <a href="#spotlight" className="btn-primary">
                Featured Work →
              </a>
              <a href="#projects" className="btn-secondary">
                All Projects
              </a>
              <a href="/assets/resume/Md-Shourov-Resume.pdf" download className="btn-ghost">
                Download Resume ↓
              </a>
            </div>
            <div className="flex flex-wrap gap-3 mt-7">
              {[
                { label: "GitHub", href: "https://github.com/Shourov735" },
                { label: "LinkedIn", href: "https://linkedin.com/in/md-shourov-89125a337" },
                { label: "Codeforces", href: "https://codeforces.com/profile/Shourov735" },
                { label: "LeetCode", href: "https://leetcode.com/u/Shourov735/" },
                { label: "X / Twitter", href: "https://x.com/Shourov735" },
                { label: "Email", href: "mailto:mdshourov735@gmail.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-[var(--color-muted)] px-3 py-1.5 rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-strong)] hover:bg-[var(--color-surface-muted)] transition-all shadow-xs"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <div className="relative min-h-[430px] grid place-items-center max-md:min-h-[360px] max-md:order-first">
          <ScrollReveal>
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] opacity-35 blur-md group-hover:opacity-60 transition duration-300" />
              <img
                src="/assets/images/profile.jpg"
                alt="Portrait of Md. Shourov"
                className="relative w-[min(370px,82vw)] aspect-square object-cover rounded-xl border border-[var(--color-line)] shadow-xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
