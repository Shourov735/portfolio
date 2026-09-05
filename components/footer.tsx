import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="container-main flex items-center justify-between gap-7 py-8 max-md:flex-col max-md:items-stretch">
        <div>
          <a
            href="#home"
            className="inline-flex items-center"
            aria-label="Md. Shourov home"
          >
            <Logo
              size={40}
              text="Md. Shourov"
              badge="BSSE @ IIT DU"
              subtitle="Software Engineer & IT Secretary"
            />
          </a>
          <p className="max-w-[460px] mt-3 text-[var(--color-muted)] text-sm">
            Building high-impact web platforms, offline-first mobile apps, and scalable systems.
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-4 max-md:justify-start">
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#notes">Notes</FooterLink>
          <FooterLink href="#resume">Resume</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-[var(--color-muted)] font-bold text-sm hover:text-[var(--color-primary-strong)] transition-colors"
    >
      {children}
    </a>
  )
}
