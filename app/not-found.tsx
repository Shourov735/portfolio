import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"

export default function NotFound() {
  return (
    <div className="section">
      <div className="container-main">
        <Breadcrumbs items={[{ name: "Md Shourov", href: "/" }, { name: "404" }]} />
        <div className="mt-16 max-w-2xl">
          <p className="eyebrow-muted">Error 404</p>
          <h1 className="font-display text-6xl md:text-7xl text-[var(--color-text)] leading-[1.02] tracking-tight text-balance">
            Page not found.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-[60ch]">
            The page you are looking for doesn&apos;t exist or has been moved. If you arrived here from
            another site, the link may be out of date.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back home
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read the blog
            </Link>
            <Link href="/#contact" className="btn-ghost">
              Report a broken link
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
