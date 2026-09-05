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
  title: {
    default: "Md. Shourov (Shourov735) — Software Engineer | IIT, University of Dhaka",
    template: "%s | Md. Shourov (Shourov735)",
  },
  description:
    "Md. Shourov (Shourov735 / mdshourov) — Software Engineering undergraduate at IIT, University of Dhaka (BSSE) & IT Secretary at Nabodigonto. Building high-impact web platforms, offline-first mobile apps, and systems.",
  keywords: [
    "Md. Shourov",
    "Shourov",
    "shourov735",
    "mdshourov",
    "shourov IIT DU",
    "shourov DU",
    "Shourov BSSE",
    "BSSE IIT DU",
    "Institute of Information Technology University of Dhaka",
    "IIT University of Dhaka",
    "Software Engineer",
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
  authors: [{ name: "Md. Shourov", url: "https://shourov735.vercel.app" }],
  creator: "Md. Shourov (Shourov735)",
  publisher: "Md. Shourov",
  alternates: {
    canonical: "https://shourov735.vercel.app",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Md. Shourov (Shourov735) — Software Engineer & IT Secretary",
    description:
      "Software Engineering student at IIT, University of Dhaka (BSSE) & IT Secretary at Nabodigonto. Explore full-stack web platforms, offline mobile apps, and systems projects.",
    type: "profile",
    locale: "en_US",
    siteName: "Md. Shourov (Shourov735) Portfolio",
    url: "https://shourov735.vercel.app/",
    images: [
      {
        url: "https://shourov735.vercel.app/assets/images/profile.jpg",
        width: 300,
        height: 300,
        alt: "Md. Shourov — Software Engineer (IIT DU)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Shourov735",
    creator: "@Shourov735",
    title: "Md. Shourov (Shourov735) — Software Engineer & IT Secretary",
    description:
      "Explore full-stack web platforms, offline mobile apps, and competitive programming archives by Md. Shourov (IIT, University of Dhaka).",
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
                  "@id": "https://shourov735.vercel.app/#profilepage",
                  url: "https://shourov735.vercel.app/",
                  name: "Md. Shourov (Shourov735) — Software Engineer & IT Secretary",
                  isPartOf: { "@id": "https://shourov735.vercel.app/#website" },
                  mainEntity: { "@id": "https://shourov735.vercel.app/#person" },
                },
                {
                  "@type": "Person",
                  "@id": "https://shourov735.vercel.app/#person",
                  name: "Md. Shourov",
                  alternateName: [
                    "Shourov",
                    "Shourov735",
                    "mdshourov",
                    "Md Shourov",
                    "Shourov IIT DU",
                    "Md. Shourov IIT DU",
                  ],
                  jobTitle: "Software Engineer & IT Secretary",
                  description:
                    "Software Engineering undergraduate at the Institute of Information Technology (IIT), University of Dhaka (BSSE program), and IT Secretary at Nabodigonto Social Welfare Organization.",
                  url: "https://shourov735.vercel.app/",
                  image: "https://shourov735.vercel.app/assets/images/profile.jpg",
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
                    "https://linkedin.com/in/md-shourov-89125a337",
                    "https://codeforces.com/profile/Shourov735",
                    "https://leetcode.com/u/Shourov735/",
                    "https://x.com/Shourov735",
                    "https://t.me/Shourov735",
                    "https://medium.com/@Shourov735",
                    "https://shourov735.vercel.app",
                    "https://mdshourov.vercel.app",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://shourov735.vercel.app/#website",
                  url: "https://shourov735.vercel.app/",
                  name: "Md. Shourov (Shourov735) Portfolio",
                  description:
                    "Official engineering portfolio of Md. Shourov (Shourov735 / mdshourov), Software Engineering student at IIT, University of Dhaka.",
                  publisher: { "@id": "https://shourov735.vercel.app/#person" },
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
