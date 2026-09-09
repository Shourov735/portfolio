import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const runtime = "edge"
export const alt = "Md Shourov — Software Engineering Student & Full-Stack Developer"
export const revalidate = 86400

export default async function OpenGraphImage() {
  const response = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0d1515",
        color: "#edf7f4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        fontFamily: "serif",
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(45, 212, 191, 0.18), transparent 60%), radial-gradient(circle at 100% 100%, rgba(251, 146, 60, 0.12), transparent 60%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#2dd4bf",
            boxShadow: "0 0 22px rgba(45,212,191,0.6)",
          }}
        />
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5eead4",
          }}
        >
          Md Shourov / Portfolio
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 116,
            lineHeight: 0.96,
            letterSpacing: -3,
            fontWeight: 400,
          }}
        >
          Md Shourov
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 32,
            color: "#a6bbb5",
            lineHeight: 1.35,
            maxWidth: 940,
          }}
        >
          Software Engineering @ IIT, University of Dhaka · IT Secretary @ Nabodigonto
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
          fontFamily: "monospace",
          fontSize: 22,
          color: "#94a3b0",
        }}
      >
        <div>Next.js · TypeScript · Cloudflare Workers · React Native</div>
        <div style={{ color: "#5eead4" }}>mdshourov.vercel.app</div>
      </div>
    </div>,
    { ...size }
  )

  response.headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800, immutable")
  return response
}
