import type { MetadataRoute } from "next"
import { getContent, slugify } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent()
  const base = "https://shourov735.github.io/portfolio"

  const projectPages = content.projects.map((p) => ({
    url: `${base}/projects/${slugify(p.title)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...projectPages,
  ]
}
