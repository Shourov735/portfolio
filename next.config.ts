import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
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
