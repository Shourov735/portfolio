import type { MetadataRoute } from "next"
import { getContent, slugify } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const content = getContent()
  const base = "https://shourov735.vercel.app"

  const projectPages = content.projects.map((p) => ({
    url: `${base}/projects/${slugify(p.title)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    ...projectPages,
  ]
}

