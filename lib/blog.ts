import "server-only"
import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { slugify } from "./blog-utils"
import type { BlogPost, BlogPostSummary } from "./types"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const WORDS_PER_MINUTE = 200
const isProd = process.env.NODE_ENV === "production"

type FrontmatterShape = {
  title?: unknown
  description?: unknown
  date?: unknown
  updated?: unknown
  tags?: unknown
  cover?: unknown
  draft?: unknown
  canonical?: unknown
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((v): v is string => typeof v === "string" && v.trim().length > 0)
}

function asBool(value: unknown): boolean {
  return value === true || value === "true"
}

function parseFrontmatter(data: FrontmatterShape) {
  return {
    title: asString(data.title),
    description: asString(data.description),
    date: asString(data.date),
    updated: data.updated ? asString(data.updated) : undefined,
    tags: asStringArray(data.tags),
    cover: data.cover ? asString(data.cover) : undefined,
    draft: data.draft ? asBool(data.draft) : undefined,
    canonical: data.canonical ? asString(data.canonical) : undefined,
  }
}

function wordCountOf(content: string): number {
  const trimmed = content.trim()
  if (trimmed.length === 0) return 0
  let count = 1
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed.charCodeAt(i) <= 32) count++
  }
  return count
}

function readingTimeOf(words: number): number {
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}

let cache: BlogPost[] | null = null

async function loadAllPosts(): Promise<BlogPost[]> {
  if (cache) return cache

  let entries: string[]
  try {
    entries = await fs.readdir(BLOG_DIR)
  } catch {
    return []
  }

  const mdFiles = entries.filter((f) => /\.mdx?$/i.test(f))
  const posts: BlogPost[] = []

  for (const file of mdFiles) {
    const postSlug = slugify(file)
    const fullPath = path.join(BLOG_DIR, file)
    const raw = await fs.readFile(fullPath, "utf8")
    const { data, content } = matter(raw)
    const fm = parseFrontmatter(data as FrontmatterShape)

    if (!fm.title || !fm.date || !fm.description) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[blog] Skipping ${file}: missing required frontmatter`)
      }
      continue
    }

    const post: BlogPost = {
      slug: postSlug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      updated: fm.updated,
      tags: [...fm.tags].sort((a, b) => a.localeCompare(b)),
      cover: fm.cover,
      draft: fm.draft,
      canonical: fm.canonical,
      content,
      wordCount: wordCountOf(content),
      readingTime: 0,
    }
    post.readingTime = readingTimeOf(post.wordCount)

    posts.push(post)
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  cache = posts
  return posts
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    tags: post.tags,
    cover: post.cover,
    draft: post.draft,
    canonical: post.canonical,
    readingTime: post.readingTime,
  }
}

function isPublished(post: BlogPost): boolean {
  if (isProd && post.draft === true) return false
  return true
}

export async function getAllPosts(): Promise<BlogPostSummary[]> {
  const posts = await loadAllPosts()
  return posts.filter(isPublished).map(toSummary)
}

export async function getAllPostsWithContent(): Promise<BlogPost[]> {
  const posts = await loadAllPosts()
  return posts.filter(isPublished)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadAllPosts()
  const match = posts.find((p) => p.slug === slug)
  if (!match) return null
  if (!isPublished(match)) return null
  return match
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await loadAllPosts()
  return posts.filter(isPublished).map((p) => p.slug)
}

export async function getRelatedPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const posts = await loadAllPosts()
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()))
  const candidates: { post: BlogPost; score: number }[] = []
  for (const p of posts) {
    if (!isPublished(p) || p.slug === post.slug) continue
    let score = 0
    for (const t of p.tags) {
      if (tagSet.has(t.toLowerCase())) score++
    }
    if (score > 0) candidates.push({ post: p, score })
  }
  candidates.sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
  return candidates.slice(0, limit).map((c) => toSummary(c.post))
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await loadAllPosts()
  const counts = new Map<string, number>()
  for (const post of posts) {
    if (!isPublished(post)) continue
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}
