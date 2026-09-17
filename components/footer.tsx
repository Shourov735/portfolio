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
      <div className="container-main py-12 grid gap-10 md:grid-cols-[1.8fr_1fr_1fr] max-md:grid-cols-1">
        {/* Brand column */}
        <div>
          <Link href="/" aria-label="Md Shourov home" className="inline-flex items-center">
            <Logo size={36} text="Md. Shourov" />
          </Link>
          <p className="mt-4 max-w-[440px] text-sm text-[var(--color-muted)] leading-relaxed">
            Software Engineering student at IIT, University of Dhaka, and IT Secretary at Nabodigonto.
            Building edge-native web platforms, offline-first mobile apps, and writing about the work.
          </p>
        </div>

        {/* Site navigation */}
        <nav aria-label="Site navigation">
          <h2 className="text-[11px] font-mono uppercase tracking-[0.16em] text-[var(--color-muted)] mb-4">
            Navigation
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

        {/* Contact column */}
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
            Available for software engineering roles, technical correspondence, and open-source collaboration.
          </p>
        </div>
      </div>

      {/* Bottom bar: Copyright left, Social icons right */}
      <div className="border-t border-[var(--color-line)]">
        <div className="container-main py-5 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs text-[var(--color-muted)] font-mono">
            © {year} Md. Shourov. All rights reserved.
          </p>

          {/* Social media icons — single dedicated location in footer */}
          <div className="flex items-center gap-3.5">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[var(--color-muted)] hover:text-[var(--color-primary-strong)] transition-colors duration-150"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
