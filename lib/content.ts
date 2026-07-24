import { PortfolioContent } from "./types"
import raw from "@/data/content.json"

const content = raw as unknown as PortfolioContent

export function getContent(): PortfolioContent {
  return content
}

export function getProject(slug: string) {
  return content.projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug
  )
}

export function getNote(slug: string) {
  return content.notes.find(
    (n) => n.title.toLowerCase().replace(/\s+/g, "-") === slug
  )
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-")
}