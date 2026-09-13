import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackToTop } from "@/components/back-to-top"
import { SkipLink } from "@/components/skip-link"
import { Analytics } from "@vercel/analytics/react"
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_ALIASES, absoluteUrl } from "@/lib/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8faf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1515" },
  ],
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Md Shourov — Software Engineering Student & Full-Stack Developer",
    template: "%s · Md Shourov",
  },
  description:
    "Md Shourov (Shourov735 / mdshourov) is a Software Engineering student at IIT, University of Dhaka (BSSE) and IT Secretary at Nabodigonto. Writing on Next.js, edge systems, and engineering practice.",
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
    "engineering blog",
    "software engineering portfolio",
  ],
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "Technology",
  classification: "Portfolio, Engineering Blog",
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
  appleWebApp: {
    capable: true,
    title: "Shourov",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Md Shourov — Software Engineering Student & Developer",
    description:
      "Undergraduate at IIT, University of Dhaka (BSSE) and IT Secretary at Nabodigonto. Engineering notes, project case studies, and systems writing.",
    type: "website",
    locale: "en_US",
    siteName: "Md Shourov Portfolio",
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Md Shourov — Software Engineering Student & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Shourov735",
    creator: "@Shourov735",
    title: "Md Shourov — Software Engineering Student & Developer",
    description:
      "Engineering notes, project case studies, and systems writing by Md Shourov (IIT, University of Dhaka).",
    images: [
      {
        url: "/opengraph-image",
        alt: "Md Shourov — Software Engineering Student & Full-Stack Developer",
      },
    ],
  },
  other: {
    "geo.region": "BD-C",
    "geo.placename": "Dhaka, Bangladesh",
    "geo.position": "23.8103;90.4125",
    ICBM: "23.8103, 90.4125",
    "theme-color": "#0f766e",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <SkipLink />
        <ThemeProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
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
                  "@type": ["Person", "WebPage"],
                  "@id": `${SITE_URL}/#person`,
                  name: AUTHOR_NAME,
                  alternateName: AUTHOR_ALIASES,
                  jobTitle: "Software Engineering Student & Full-Stack Developer",
                  description:
                    "Software Engineering student at the Institute of Information Technology (IIT), University of Dhaka (BSSE program), and IT Secretary at Nabodigonto Social Welfare Organization.",
                  url: SITE_URL,
                  image: absoluteUrl("/assets/images/profile.jpg"),
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
                    "Next.js",
                    "React Server Components",
                    "React Native",
                    "Cloudflare Workers",
                    "Cloudflare R2",
                    "Gang of Four (GoF) Design Patterns",
                    "Competitive Programming",
                    "TypeScript",
                    "PostgreSQL",
                    "SQLite",
                    "Open Source Software",
                    "Edge Computing",
                    "Engineering Blog",
                  ],
                  sameAs: [
                    "https://github.com/Shourov735",
                    "https://linkedin.com/in/md-shourov-613934358",
                    "https://codeforces.com/profile/Shourov735",
                    "https://leetcode.com/u/Shourov735/",
                    "https://x.com/Shourov735",
                    "https://t.me/Shourov735",
                    "https://medium.com/@Shourov735",
                    "https://www.youtube.com/@MD._SHOUROV_",
                    "https://mdshourov.vercel.app",
                    "https://shourov735.vercel.app",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: SITE_NAME,
                  description:
                    "Portfolio and engineering blog of Md Shourov (Shourov735 / mdshourov), Software Engineering student at IIT, University of Dhaka.",
                  publisher: { "@id": `${SITE_URL}/#person` },
                  inLanguage: "en-US",
                  copyrightYear: new Date().getFullYear(),
                  potentialAction: {
                    "@type": "ReadAction",
                    target: `${SITE_URL}/blog`,
                  },
                },
                {
                  "@type": "ProfilePage",
                  "@id": `${SITE_URL}/#profilepage`,
                  url: SITE_URL,
                  name: `${AUTHOR_NAME} — Engineering Portfolio & Blog`,
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                  mainEntity: { "@id": `${SITE_URL}/#person` },
                },
                {
                  "@type": "Blog",
                  "@id": `${SITE_URL}/blog/#blog`,
                  url: `${SITE_URL}/blog`,
                  name: "Engineering Notes by Md Shourov",
                  description:
                    "Long-form writing on software engineering, edge systems, and student engineering practice.",
                  publisher: { "@id": `${SITE_URL}/#person` },
                  inLanguage: "en-US",
                  isPartOf: { "@id": `${SITE_URL}/#website` },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
