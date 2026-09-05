import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://shourov735.vercel.app"),
  title: "Md. Shourov — Software Engineer & IT Secretary",
  description:
    "Software Engineering undergraduate at IIT, University of Dhaka & IT Secretary at Nabodigonto Social Welfare Organization. Building full-stack web applications, offline-first mobile apps, and systems.",
  keywords: [
    "Md. Shourov",
    "Software Engineer",
    "IIT University of Dhaka",
    "Nabodigonto",
    "Next.js 16",
    "TypeScript",
    "React Native",
    "Cloudflare Workers",
    "Java",
    "C++",
    "Competitive Programming",
    "Open Source",
  ],
  authors: [{ name: "Md. Shourov" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Md. Shourov — Software Engineer & IT Secretary",
    description:
      "Software Engineering student at IIT, University of Dhaka & IT Secretary at Nabodigonto. Explore full-stack web platforms, offline-first mobile systems, and open-source projects.",
    type: "website",
    url: "https://shourov735.vercel.app/",
    images: [
      {
        url: "https://shourov735.vercel.app/assets/images/profile.jpg",
        width: 300,
        height: 300,
        alt: "Md. Shourov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Shourov — Software Engineer & IT Secretary",
    description:
      "Explore full-stack web platforms, mobile systems, and academic projects by Md. Shourov (IIT, University of Dhaka).",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop />
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md. Shourov",
              jobTitle: "Software Engineer & IT Secretary",
              url: "https://portfolio-lemon-eight-22.vercel.app/",
              image: "https://portfolio-lemon-eight-22.vercel.app/assets/images/profile.jpg",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Institute of Information Technology (IIT), University of Dhaka",
              },
              knowsAbout: [
                "Full-Stack Web Development",
                "Next.js 16",
                "React Native",
                "Cloudflare Workers",
                "Design Patterns",
                "Competitive Programming",
                "C++",
                "C",
                "Java",
                "TypeScript",
                "PostgreSQL",
                "Open Source",
              ],
              sameAs: [
                "https://github.com/Shourov735",
                "https://linkedin.com/in/md-shourov-89125a337",
                "https://x.com/Shourov735",
                "https://t.me/Shourov735",
                "https://www.youtube.com/@mdshourovgaming",
                "https://medium.com/@Shourov735",
                "https://codeforces.com/profile/Shourov735",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
