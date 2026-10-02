import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "react-icons"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shourov735.vercel.app",
          },
        ],
        destination: "https://mdshourov.vercel.app/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
