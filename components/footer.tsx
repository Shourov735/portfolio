import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="container-main py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] max-md:grid-cols-1">
        <div>
          <Link href="/" aria-label="Md Shourov home" className="inline-flex items-center">
            <Logo size={36} text="Md. Shourov" badge="BSSE @ IIT DU" />
          </Link>
          <p className="mt-4 max-w-[420px] text-sm text-[var(--color-muted)] leading-relaxed">
            Software Engineering student at IIT, University of Dhaka, and IT Secretary at Nabodigonto.
            Building edge-native web platforms, offline-first mobile apps, and writing about the work.
          </p>
        </div>

        <nav aria-label="Site sections">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Site
          </h2>
          <ul className="grid gap-2 text-sm">
            <li>
              <Link
                href="/#projects"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                Engineering Notes
              </Link>
            </li>
            <li>
              <Link
                href="/#skills"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Elsewhere">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Elsewhere
          </h2>
          <ul className="grid gap-2 text-sm">
            <li>
              <a
                href="https://github.com/Shourov735"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/md-shourov-613934358"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://medium.com/@Shourov735"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                Medium
              </a>
            </li>
            <li>
              <a
                href="https://x.com/Shourov735"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)]"
              >
                X (Twitter)
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Get in touch
          </h2>
          <a
            href="mailto:mdshourov735@gmail.com"
            className="text-sm text-[var(--color-text)] font-mono link-underline"
          >
            mdshourov735@gmail.com
          </a>
          <p className="mt-4 text-xs text-[var(--color-muted)] leading-relaxed">
            Best for collaborations, opportunities, or technical correspondence.
          </p>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="container-main py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-muted)] font-mono">
          <p>© {year} Md Shourov · Built with Next.js, deployed on Vercel.</p>
          <p className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
