import Link from "next/link"

interface CrossLinkCardProps {
  type: "to-blog" | "to-project"
  title: string
  href: string
  description?: string
}

export function CrossLinkCard({ type, title, href, description }: CrossLinkCardProps) {
  const isToBlog = type === "to-blog"

  return (
    <aside
      className="my-10 rounded-2xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-surface-muted)] p-5 md:p-6 shadow-xs hover:border-[var(--color-primary)]/50 transition-all group"
      aria-label={isToBlog ? "Companion engineering deep-dive" : "Companion production case study"}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-[55ch]">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 rounded-full font-semibold ${
                isToBlog
                  ? "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/20"
                  : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
              }`}
            >
              {isToBlog ? "Engineering Deep-Dive Note" : "Production Architecture Case Study"}
            </span>
          </div>

          <h4 className="font-display text-base md:text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-primary-strong)] transition-colors">
            {title}
          </h4>

          {description && (
            <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--color-surface-muted)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] border border-[var(--color-line)] text-[var(--color-text)] shrink-0 transition-all shadow-xs"
        >
          <span>{isToBlog ? "Read Deep-Dive" : "Explore Case Study"}</span>
          <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </Link>
      </div>
    </aside>
  )
}
