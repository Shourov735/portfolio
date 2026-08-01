import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-black text-[var(--color-primary)] leading-none mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-3">Page not found</h2>
        <p className="text-[var(--color-muted)] mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
