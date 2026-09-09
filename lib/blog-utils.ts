export function formatDate(value: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...opts,
  }).format(new Date(value))
}

export function formatISODate(value: string): string {
  return new Date(value).toISOString()
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\.mdx?$/i, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
