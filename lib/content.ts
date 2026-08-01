import { PortfolioContent } from "./types"
import raw from "@/data/content.json"

const content = raw as unknown as PortfolioContent

export function getContent(): PortfolioContent {
  return content
}

export function getProject(slug: string) {
  return content.projects.find((p) => slugify(p.title) === slug)
}

export function getNote(slug: string) {
  return content.notes.find((n) => slugify(n.title) === slug)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export function getAllProjectSlugs() {
  return content.projects.map((p) => ({ slug: slugify(p.title) }))
}

export function getAllNoteSlugs() {
  return content.notes.map((n) => ({ slug: slugify(n.title) }))
}
