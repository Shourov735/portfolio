import Image from "next/image"
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
            <p className="text-[var(--color-accent)] text-[0.82rem] font-extrabold tracking-[0.12em] uppercase mb-2">
              Software Engineering @ IIT, University of Dhaka · IT Secretary @ Nabodigonto
            </p>
            <h1 className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-extrabold leading-[1.08] text-[var(--color-text)] m-0 max-w-[780px]">
              Md Shourov
            </h1>
            <p className="text-[clamp(1.2rem,2.2vw,1.75rem)] font-bold text-[var(--color-primary-strong)] mt-2">
              Software Engineering Student &amp; Developer
            </p>
            <p className="text-[clamp(1rem,1.6vw,1.15rem)] text-[var(--color-muted)] max-w-[660px] mt-4 leading-relaxed">
              Undergraduate reading Software Engineering (BSSE) at the{" "}
              <strong className="text-[var(--color-text)]">
                Institute of Information Technology (IIT), University of Dhaka (IIT DU)
              </strong>{" "}
              and serving as <strong className="text-[var(--color-text)]">IT Secretary</strong> at
              Nabodigonto. Known online as <strong className="text-[var(--color-text)]">Shourov735</strong>{" "}
              and <strong className="text-[var(--color-text)]">mdshourov</strong>, architecting edge-native
              web platforms with Next.js, Cloudflare Workers, and PostgreSQL, building offline-first mobile
              apps in React Native, and practicing algorithmic problem solving.
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
                { label: "LinkedIn", href: "https://linkedin.com/in/md-shourov-613934358" },
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
              <Image
                src="/assets/images/profile.jpg"
                alt="Md Shourov - Software Engineering Student at IIT, University of Dhaka"
                width={370}
                height={370}
                priority
                className="relative w-[min(370px,82vw)] aspect-square object-cover rounded-xl border border-[var(--color-line)] shadow-xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
