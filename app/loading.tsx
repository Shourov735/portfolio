export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading page content"
      className="section pt-16 md:pt-20 min-h-[70vh]"
    >
      <div className="container-main space-y-12 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-36 bg-[var(--color-surface-muted)] rounded" />

        {/* Header / Title skeleton */}
        <div className="space-y-4 max-w-2xl">
          <div className="h-3.5 w-24 bg-[var(--color-surface-muted)] rounded" />
          <div className="h-12 w-3/4 bg-[var(--color-surface-muted)] rounded-lg" />
          <div className="h-5 w-full bg-[var(--color-surface-muted)] rounded" />
          <div className="h-5 w-4/5 bg-[var(--color-surface-muted)] rounded" />
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-64 rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-6 space-y-4"
            >
              <div className="h-4 w-1/3 bg-[var(--color-surface-muted)] rounded" />
              <div className="h-6 w-3/4 bg-[var(--color-surface-muted)] rounded" />
              <div className="h-16 w-full bg-[var(--color-surface-muted)] rounded" />
              <div className="h-4 w-1/2 bg-[var(--color-surface-muted)] rounded pt-4" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading page content...</span>
    </div>
  )
}
