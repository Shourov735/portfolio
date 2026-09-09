import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PostCard } from "./post-card"
import { getAllPosts } from "@/lib/blog"

export async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3)
  if (posts.length === 0) return null

  return (
    <section className="section" id="writing" aria-labelledby="latest-posts-heading">
      <div className="container-main">
        <ScrollReveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="section-heading mb-0">
              <p className="eyebrow">Writing</p>
              <h2 id="latest-posts-heading">Recently on the blog.</h2>
              <p className="text-[var(--color-muted)] max-w-[60ch] mt-3">
                Long-form notes on the engineering work — Next.js architecture, edge systems, accessibility,
                and the practice of shipping.
              </p>
            </div>
            <Link href="/blog" className="btn-ghost shrink-0">
              Read all posts
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
