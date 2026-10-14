import { ImageResponse } from "next/og"
import { getPostBySlug } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const runtime = "nodejs"
export const revalidate = 86400

export default async function BlogOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const title = post?.title ?? "Engineering Writing"
  const description = post?.description ?? "Technical essay by Md. Shourov on architecture and systems design."
  const tags = post?.tags.slice(0, 4) ?? ["Software Engineering", "Architecture"]
  const readingTime = post?.readingTime ? `${post.readingTime} min read` : "Engineering Essay"

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d1515",
        color: "#edf7f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        fontFamily: "sans-serif",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(45, 212, 191, 0.18), transparent 60%), radial-gradient(circle at 100% 100%, rgba(251, 146, 60, 0.12), transparent 60%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#fb923c",
              boxShadow: "0 0 18px rgba(251, 146, 60, 0.6)",
            }}
          />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#fdba74",
            }}
          >
            Md Shourov / Engineering Notes
          </div>
        </div>

        <div
          style={{
            fontFamily: "monospace",
            fontSize: 16,
            textTransform: "uppercase",
            letterSpacing: 2,
            background: "rgba(251, 146, 60, 0.12)",
            color: "#fb923c",
            padding: "6px 16px",
            borderRadius: 999,
            border: "1px solid rgba(251, 146, 60, 0.3)",
          }}
        >
          {readingTime}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.08,
            letterSpacing: -2,
            fontWeight: 700,
            maxWidth: 1050,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#a6bbb5",
            lineHeight: 1.4,
            maxWidth: 1000,
          }}
        >
          {description.slice(0, 160)}...
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "4px 14px",
                borderRadius: 6,
                color: "#cbd5e1",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 24,
          fontFamily: "monospace",
          fontSize: 18,
          color: "#94a3b0",
        }}
      >
        <div>Md. Shourov · BSSE @ IIT, University of Dhaka</div>
        <div style={{ color: "#5eead4" }}>mdshourov.vercel.app</div>
      </div>
    </div>,
    { ...size }
  )
}
