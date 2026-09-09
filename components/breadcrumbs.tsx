import Link from "next/link"
import { absoluteUrl } from "@/lib/site"

export type BreadcrumbItem = {
  name: string
  href?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-sm ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[var(--color-muted)]">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={`${item.name}-${idx}`} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-text)] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span
                    className="text-[var(--color-text)] font-semibold truncate max-w-[320px]"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.name}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-[var(--color-line)] select-none">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
