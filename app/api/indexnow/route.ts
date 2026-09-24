import { NextRequest, NextResponse } from "next/server"
import { submitToIndexNow } from "@/lib/indexnow"
import { getContent, slugify } from "@/lib/content"
import { getAllSlugs } from "@/lib/blog"
import { SITE_URL, absoluteUrl } from "@/lib/site"

export async function POST(request: NextRequest) {
  // Optional security barrier via secret token for automated webhooks or Vercel cron
  const authHeader = request.headers.get("authorization")
  const expectedSecret = process.env.INDEXNOW_SECRET || process.env.CRON_SECRET

  if (expectedSecret) {
    const bearer = authHeader?.replace(/^Bearer\s+/i, "")
    const urlKey = request.nextUrl.searchParams.get("key")
    if (bearer !== expectedSecret && urlKey !== expectedSecret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
    }
  }

  let customUrls: string[] = []
  try {
    const body = await request.json().catch(() => null)
    if (body && Array.isArray(body.urls)) {
      customUrls = body.urls
    }
  } catch {
    // If empty body, proceed to submit default site URLs
  }

  let urlsToSubmit: string[] = customUrls

  if (urlsToSubmit.length === 0) {
    // Collect all canonical URLs across portfolio
    const content = getContent()
    const blogSlugs = await getAllSlugs()

    urlsToSubmit = [
      SITE_URL,
      absoluteUrl("/blog"),
      ...content.projects.map((p) => absoluteUrl(`/projects/${slugify(p.title)}`)),
      ...blogSlugs.map((slug) => absoluteUrl(`/blog/${slug}`)),
    ]
  }

  const result = await submitToIndexNow(urlsToSubmit)
  return NextResponse.json(result, { status: result.ok ? 200 : result.status })
}

export async function GET(request: NextRequest) {
  // Support GET request for simple health checks or Vercel Cron jobs
  return POST(request)
}
