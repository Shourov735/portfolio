import Link from "next/link"
import { Logo } from "@/components/logo"
import { SiYoutube, SiX, SiMedium, SiCodeforces, SiLeetcode } from "react-icons/si"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Shourov735",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/md-shourov-613934358",
    icon: FaLinkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@MD._SHOUROV_",
    icon: SiYoutube,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/Shourov735",
    icon: SiX,
  },
  {
    label: "Medium",
    href: "https://medium.com/@Shourov735",
    icon: SiMedium,
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/Shourov735",
    icon: SiCodeforces,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/Shourov735/",
    icon: SiLeetcode,
  },
  {
    label: "Email",
    href: "mailto:mdshourov735@gmail.com",
    icon: MdEmail,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="container-main py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] max-md:grid-cols-1">
        {/* Brand column */}
        <div>
          <Link href="/" aria-label="Md Shourov home" className="inline-flex items-center">
            <Logo size={36} text="Md. Shourov" />
          </Link>
          <p className="mt-4 max-w-[420px] text-sm text-[var(--color-muted)] leading-relaxed">
            Software Engineering student at IIT, University of Dhaka, and IT Secretary at Nabodigonto.
            Building edge-native web platforms, offline-first mobile apps, and writing about the work.
          </p>

          {/* Social icon row */}
          <div className="flex flex-wrap gap-3 mt-6">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="
                  w-8 h-8 rounded-lg flex items-center justify-center
                  text-[var(--color-muted)] bg-[var(--color-line)]
                  hover:text-[var(--color-primary-strong)] hover:bg-[var(--color-primary)]/10
                  transition-colors duration-150
                "
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Site nav */}
        <nav aria-label="Site sections">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Site
          </h2>
          <ul className="grid gap-2 text-sm">
            {[
              { label: "Projects", href: "/#projects" },
              { label: "Engineering Notes", href: "/blog" },
              { label: "Skills", href: "/#skills" },
              { label: "Contact", href: "/#contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Elsewhere nav */}
        <nav aria-label="Elsewhere">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Elsewhere
          </h2>
          <ul className="grid gap-2 text-sm">
            {SOCIAL_LINKS.slice(0, 5).map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] transition-colors"
                >
                  <Icon size={13} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
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

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-line)]">
        <div className="container-main py-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-muted)] font-mono">
            © {year} Md Shourov · Crafting software with purpose.
          </p>

          {/* Icon row — bottom bar */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] transition-colors duration-150"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <p className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
