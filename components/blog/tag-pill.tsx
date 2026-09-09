import Link from "next/link"

type TagPillProps = {
  tag: string
  href?: string
  size?: "sm" | "md"
}

export function TagPill({ tag, href, size = "sm" }: TagPillProps) {
  const sizes = {
    sm: "text-[11px] px-2 py-0.5",
    md: "text-xs px-2.5 py-1",
  }

  const className = `inline-flex items-center rounded border border-[var(--color-line)] bg-[var(--color-surface-muted)] text-[var(--color-muted)] font-mono uppercase tracking-wider ${sizes[size]}`

  if (href) {
    return (
      <Link
        href={href}
        className={`${className} hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors`}
      >
        {tag}
      </Link>
    )
  }
  return <span className={className}>{tag}</span>
}
