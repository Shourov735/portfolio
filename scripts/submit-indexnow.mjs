/**
 * Standalone Node script to submit canonical portfolio URLs to IndexNow.
 * Can be run manually or during CI/CD deploy hooks:
 * node scripts/submit-indexnow.mjs
 */

import fs from "node:fs"

const SITE_URL = "https://mdshourov.vercel.app"
const DEFAULT_KEY = "847f210cbf204c80b163ce2c301be881"
const KEY = process.env.INDEXNOW_KEY || DEFAULT_KEY

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\.mdx?$/i, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function main() {
  console.log("Compiling canonical URLs for IndexNow submission...")

  const contentRaw = fs.readFileSync("./data/content.json", "utf8")
  const content = JSON.parse(contentRaw)

  const blogFiles = fs.readdirSync("./content/blog").filter((f) => f.endsWith(".md"))
  const blogSlugs = blogFiles.map((f) => f.replace(/\.md$/, ""))

  const urls = [
    SITE_URL,
    `${SITE_URL}/blog`,
    ...content.projects.map((p) => `${SITE_URL}/projects/${slugify(p.title)}`),
    ...blogSlugs.map((s) => `${SITE_URL}/blog/${s}`),
  ]

  console.log(`Found ${urls.length} canonical URLs to submit:`)
  urls.forEach((u) => console.log(`  - ${u}`))

  const payload = {
    host: "mdshourov.vercel.app",
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList: urls,
  }

  console.log("\nSubmitting to https://api.indexnow.org/indexnow...")
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    })

    console.log(`HTTP Status: ${res.status} ${res.statusText}`)
    if (res.status === 200) {
      console.log("SUCCESS: IndexNow accepted the submitted URLs.")
    } else if (res.status === 202) {
      console.log("ACCEPTED: IndexNow received URLs. Key validation in progress.")
    } else {
      const text = await res.text()
      console.log(`Response: ${text}`)
    }
  } catch (err) {
    console.error("Failed to submit to IndexNow:", err)
    process.exit(1)
  }
}

main()
