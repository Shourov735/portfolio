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
  title: "Md. Shourov | Software Engineering Student",
  description:
    "Software Engineering student at the University of Dhaka building algorithmic projects, C/C++ systems, and practical web tools.",
  keywords: [
    "Md. Shourov",
    "Software Engineering",
    "University of Dhaka",
    "C++",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
    "Competitive Programming",
    "Open Source",
    "Portfolio",
  ],
  authors: [{ name: "Md. Shourov" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Md. Shourov - Software Engineering Student",
    description:
      "Developer portfolio featuring projects, competitive programming, learning notes, and contact options.",
    type: "website",
    url: "https://shourov735.github.io/portfolio/",
    images: [
      {
        url: "https://shourov735.github.io/portfolio/assets/images/profile.jpg",
        width: 300,
        height: 300,
        alt: "Md. Shourov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Shourov - Developer Portfolio",
    description:
      "Projects, notes, skills, and learning journey from a Software Engineering student.",
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
      </body>
    </html>
  )
}