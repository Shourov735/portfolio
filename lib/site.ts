export const SITE_URL = "https://mdshourov.vercel.app"
export const SITE_NAME = "Md. Shourov — Software Engineering Student"
export const AUTHOR_NAME = "Md. Shourov"
export const AUTHOR_ALIASES = ["Md Shourov", "Shourov", "Shourov735", "mdshourov", "Md Shourov IIT DU"]

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`
}
