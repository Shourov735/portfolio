import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Hero() {
  return (
    <section className="section pt-12 md:pt-16" id="home">
      <div className="container-main grid grid-cols-[1.15fr_minmax(320px,0.85fr)] gap-14 items-center max-md:grid-cols-1 max-md:pt-4">
        <div>
          <ScrollReveal>
            <div className="inline-flex items-center gap-2.5 mb-7">
              <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--color-primary-strong)]">
                Available · Open to engineering roles
              </span>
            </div>

            <p className="eyebrow">Software Engineering @ IIT, University of Dhaka</p>

            <h1 className="font-display text-[clamp(2.75rem,6.4vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-[var(--color-text)] m-0 max-w-[820px] text-balance">
              Md Shourov.
            </h1>

            <p className="text-[clamp(1.25rem,2.4vw,1.875rem)] font-display text-[var(--color-primary-strong)] mt-4 max-w-[640px] text-balance">
              Building edge-native web platforms, offline-first mobile apps, and systems that ship.
            </p>

            <p className="text-[clamp(1rem,1.4vw,1.0625rem)] text-[var(--color-muted)] max-w-[600px] mt-6 leading-relaxed">
              Software Engineering undergraduate (BSSE) at the Institute of Information Technology, University
              of Dhaka. IT Secretary at Nabodigonto. 150+ problems solved across Codeforces and LeetCode.
              Known online as <span className="text-[var(--color-text)] font-medium">Shourov735</span>.
            </p>

            <div className="flex flex-wrap gap-3 mt-9 max-md:flex-col">
              <Link href="/#projects" className="btn-primary">
                See the work
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read the blog
              </Link>
              <a href="/assets/resume/Md-Shourov-Resume.pdf" download className="btn-ghost">
                Resume ↓
              </a>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-10 text-[12px] font-mono uppercase tracking-wider text-[var(--color-muted)]">
              {[
                { label: "GitHub", href: "https://github.com/Shourov735" },
                { label: "LinkedIn", href: "https://linkedin.com/in/md-shourov-613934358" },
                { label: "YouTube", href: "https://www.youtube.com/@MD._SHOUROV_" },
                { label: "Codeforces", href: "https://codeforces.com/profile/Shourov735" },
                { label: "LeetCode", href: "https://leetcode.com/u/Shourov735/" },
                { label: "Email", href: "mailto:mdshourov735@gmail.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="link-underline hover:text-[var(--color-text)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="relative grid place-items-center max-md:min-h-[340px] max-md:order-first">
          <ScrollReveal>
            <div className="relative group">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full opacity-40 blur-md group-hover:opacity-70 transition duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                }}
              />
              <Image
                src="/assets/images/profile.png"
                alt="Md Shourov — Software Engineering Student, IIT University of Dhaka"
                width={400}
                height={400}
                priority
                className="relative w-[min(400px,82vw)] aspect-square object-cover rounded-full shadow-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
