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
  metadataBase: new URL("https://mdshourov.vercel.app"),
  title: {
    default: "Md Shourov | Software Engineering Student & Developer",
    template: "%s | Md Shourov",
  },
  description:
    "Md Shourov is a Software Engineering student at IIT, University of Dhaka (BSSE) & IT Secretary at Nabodigonto. Building high-impact web platforms, offline-first mobile apps, and scalable systems.",
  keywords: [
    "Md Shourov",
    "Md. Shourov",
    "Shourov",
    "Shourov735",
    "mdshourov",
    "shourov IIT DU",
    "shourov DU",
    "Shourov BSSE",
    "BSSE IIT DU",
    "Institute of Information Technology University of Dhaka",
    "IIT University of Dhaka",
    "Software Engineer",
    "Full-Stack Developer",
    "Nabodigonto IT Secretary",
    "Competitive Programming",
    "Codeforces Shourov735",
    "LeetCode Shourov735",
    "Next.js 16",
    "TypeScript",
    "React Native",
    "Cloudflare Workers",
    "Java",
    "C++",
    "Open Source",
  ],
  authors: [{ name: "Md Shourov", url: "https://mdshourov.vercel.app" }],
  creator: "Md Shourov (Shourov735)",
  publisher: "Md Shourov",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "v3XPZwQ6lEgCyIggfIFikaOiATNJRhbPlYa9RTVKrGg",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Md Shourov | Software Engineering Student & Developer",
    description:
      "Software Engineering student at IIT, University of Dhaka (BSSE) & IT Secretary at Nabodigonto. Explore full-stack web platforms, offline mobile apps, and systems projects.",
    type: "profile",
    locale: "en_US",
    siteName: "Md Shourov Portfolio",
    url: "https://mdshourov.vercel.app/",
    images: [
      {
        url: "https://mdshourov.vercel.app/assets/images/profile.jpg",
        width: 300,
        height: 300,
        alt: "Md Shourov — Software Engineer (IIT DU)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Shourov735",
    creator: "@Shourov735",
    title: "Md Shourov | Software Engineering Student & Developer",
    description:
      "Explore full-stack web platforms, offline mobile apps, and competitive programming archives by Md Shourov (IIT, University of Dhaka).",
    images: ["https://mdshourov.vercel.app/assets/images/profile.jpg"],
  },
  other: {
    "geo.region": "BD-C",
    "geo.placename": "Dhaka, Bangladesh",
    "geo.position": "23.8103;90.4125",
    ICBM: "23.8103, 90.4125",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
              "@graph": [
                {
                  "@type": "ProfilePage",
                  "@id": "https://mdshourov.vercel.app/#profilepage",
                  url: "https://mdshourov.vercel.app/",
                  name: "Md Shourov — Software Engineering Student & Full-Stack Developer",
                  isPartOf: { "@id": "https://mdshourov.vercel.app/#website" },
                  mainEntity: { "@id": "https://mdshourov.vercel.app/#person" },
                },
                {
                  "@type": "Person",
                  "@id": "https://mdshourov.vercel.app/#person",
                  name: "Md Shourov",
                  alternateName: [
                    "Md. Shourov",
                    "Shourov",
                    "Shourov735",
                    "mdshourov",
                    "Shourov IIT DU",
                    "Md. Shourov IIT DU",
                  ],
                  jobTitle: "Software Engineering Student & Full-Stack Developer",
                  description:
                    "Software Engineering student at the Institute of Information Technology (IIT), University of Dhaka (BSSE program), and IT Secretary at Nabodigonto Social Welfare Organization.",
                  url: "https://mdshourov.vercel.app/",
                  image: "https://mdshourov.vercel.app/assets/images/profile.jpg",
                  email: "mailto:mdshourov735@gmail.com",
                  homeLocation: {
                    "@type": "Place",
                    name: "Dhaka, Bangladesh",
                  },
                  alumniOf: {
                    "@type": "CollegeOrUniversity",
                    name: "Institute of Information Technology (IIT), University of Dhaka",
                    alternateName: "IIT DU",
                    url: "https://www.iit.du.ac.bd",
                    parentOrganization: {
                      "@type": "CollegeOrUniversity",
                      name: "University of Dhaka",
                      alternateName: "DU",
                      url: "https://www.du.ac.bd",
                    },
                  },
                  hasCredential: {
                    "@type": "EducationalOccupationalCredential",
                    credentialCategory: "degree",
                    name: "Bachelor of Science in Software Engineering (BSSE)",
                  },
                  memberOf: {
                    "@type": "Organization",
                    name: "Nabodigonto Social Welfare Organization",
                    url: "https://nabodigonto.conversora-tech.workers.dev",
                    roleName: "IT Secretary",
                  },
                  knowsAbout: [
                    "Full-Stack Web Development",
                    "Next.js 16",
                    "React Native",
                    "Cloudflare Workers",
                    "Gang of Four (GoF) Design Patterns",
                    "Competitive Programming",
                    "C++",
                    "C",
                    "Java",
                    "TypeScript",
                    "PostgreSQL",
                    "SQLite",
                    "Open Source Software",
                  ],
                  sameAs: [
                    "https://github.com/Shourov735",
                    "https://linkedin.com/in/md-shourov-613934358",
                    "https://codeforces.com/profile/Shourov735",
                    "https://leetcode.com/u/Shourov735/",
                    "https://x.com/Shourov735",
                    "https://t.me/Shourov735",
                    "https://medium.com/@Shourov735",
                    "https://mdshourov.vercel.app",
                    "https://shourov735.vercel.app",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mdshourov.vercel.app/#website",
                  url: "https://mdshourov.vercel.app/",
                  name: "Md Shourov Portfolio",
                  description:
                    "Official engineering portfolio of Md Shourov (Shourov735 / mdshourov), Software Engineering student at IIT, University of Dhaka.",
                  publisher: { "@id": "https://mdshourov.vercel.app/#person" },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
