import { getAllPostsWithContent } from "@/lib/blog"
import { SITE_NAME, absoluteUrl } from "@/lib/site"

export async function GET() {
  const posts = await getAllPostsWithContent()

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")

  const rfc822 = (iso: string) => new Date(iso).toUTCString()

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`)
      const categories = post.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <author>mdshourov735@gmail.com (${escapeXml("Md Shourov")})</author>
${categories}
    </item>`
    })
    .join("\n")

  const lastBuildDate = posts[0] ? rfc822(posts[0].date) : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml("Long-form writing on software engineering, edge systems, and student engineering practice by Md Shourov.")}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <generator>Next.js RSS Generator</generator>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  })
}
