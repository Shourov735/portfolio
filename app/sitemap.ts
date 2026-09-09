import type { MetadataRoute } from "next"
import { getContent, slugify } from "@/lib/content"
import { getAllPosts } from "@/lib/blog"
import { SITE_URL, absoluteUrl } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = getContent()
  const posts = await getAllPosts()
  const now = new Date()

  const projectPages: MetadataRoute.Sitemap = content.projects.map((p) => ({
    url: absoluteUrl(`/projects/${slugify(p.title)}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl(`/blog`),
      lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectPages,
    ...blogPages,
  ]
}
