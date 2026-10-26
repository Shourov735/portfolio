import { getContent, slugify } from "@/lib/content"

export type SearchCategory =
  | "Projects & Case Studies"
  | "Engineering Blog"
  | "Technical Skills"
  | "Academic & Achievements"
  | "Currently Studying (Now)"
  | "Philosophy & FAQ"
  | "Navigation & Sections"
  | "Quick Actions & Socials"

export interface SearchableItem {
  id: string
  title: string
  subtitle?: string
  category: SearchCategory
  keywords: string[]
  contentSnippet?: string
  badge?: string
  href?: string
  actionType?: "navigate" | "external" | "copy-email" | "toggle-theme" | "download-resume"
  secondaryActions?: { label: string; href: string }[]
}

export interface SearchResult {
  item: SearchableItem
  score: number
  matchSnippet?: string
}

// 9 Published Engineering Blog Posts
const BLOG_POSTS_METADATA = [
  {
    slug: "designing-an-api-an-ai-agent-can-afford",
    title: "Designing an API an AI Agent Can Actually Afford",
    description: "How I built Remocomp's three-tier discovery API so an AI agent can find, inspect and install a Remotion component for well under 300 tokens — and why the prop schema had to stay behind a second request.",
    date: "2026-10-13",
    readingTime: 14,
    tags: ["Projects", "Architecture", "AI Agents", "AI", "Cloudflare Workers", "Lessons Learned"],
  },
  {
    slug: "remastering-insidejibon-edtech-on-cloudflare-edge",
    title: "Remastering InsideJibon: Building a $0-Subscription EdTech Engine on Cloudflare Edge",
    description: "How I re-architected InsideJibon with Cloudflare Durable Objects, Workers AI caption RAG, and a zero-egress video pipeline under a $0/month constraint.",
    date: "2026-09-26",
    readingTime: 12,
    tags: ["Projects", "Architecture", "Cloudflare Workers", "Next.js", "AI", "Edge"],
  },
  {
    slug: "building-arvaana-luxury-fragrance-ecommerce",
    title: "Building ARVAANA: Engineering a Luxury Fragrance Platform for Bangladesh",
    description: "How I architected ARVAANA: a Next.js 16 luxury fragrance e-commerce platform with zero-FOUC dual themes, reactive pricing, and WhatsApp checkout.",
    date: "2026-09-18",
    readingTime: 7,
    tags: ["Projects", "Architecture", "Next.js", "E-Commerce", "Engineering"],
  },
  {
    slug: "edge-queues-and-bengali-pdf-pipeline-nabodigonto",
    title: "Asynchronous Multi-Channel Notification Queues & Serverless Bengali PDF Generation on the Edge",
    description: "Deep dive into Nabodigonto's asynchronous Cloudflare Queues fanout across SMS/Email/WebPush/FCM and serverless Bengali font shaping with pdf-lib and R2.",
    date: "2026-09-02",
    readingTime: 8,
    tags: ["Projects", "Architecture", "Cloudflare Workers", "Backend", "Lessons Learned"],
  },
  {
    slug: "edge-data-modeling-cloudflare-d1-media-pipeline",
    title: "Edge Data Modeling & Offline Resiliency: Cloudflare D1, Batch Transactions, and Media Pipelines",
    description: "Deep dive into edge SQLite constraints with Cloudflare D1, atomic batch transactions, R2 storage, and isolated Bengali font rendering with pdf-lib.",
    date: "2026-08-22",
    readingTime: 7,
    tags: ["Architecture", "Database", "Cloudflare Workers", "Backend"],
  },
  {
    slug: "architecting-nabodigonto-100k-loc-monorepo",
    title: "Architecting Nabodigonto: Scaling a Production Community Platform to a 100k+ LOC Monorepo",
    description: "How I structured Nabodigonto into a fault-isolated Turborepo with separate public and portal frontends, Cloudflare Workers API, and shared type contracts.",
    date: "2026-08-15",
    readingTime: 8,
    tags: ["Projects", "Architecture", "Cloudflare Workers", "TypeScript", "Next.js"],
  },
  {
    slug: "accessibility-as-an-engineering-practice",
    title: "Accessibility Is an Engineering Practice, Not a Checklist",
    description: "Why accessibility is a property of the codebase rather than the UI, and what to do about it on a portfolio without a design team.",
    date: "2026-04-21",
    readingTime: 4,
    tags: ["Lessons Learned", "Frontend", "Accessibility", "Web Standards"],
  },
  {
    slug: "designing-maintainable-react-systems",
    title: "Designing Maintainable React Systems at Student Scale",
    description: "Notes from building production React apps: component boundaries, server components, and the discipline that makes code outlive the assignment.",
    date: "2026-02-08",
    readingTime: 4,
    tags: ["Architecture", "React", "Lessons Learned", "Engineering"],
  },
  {
    slug: "building-a-fast-nextjs-portfolio",
    title: "Building a Fast Next.js Portfolio with the App Router",
    description: "Practical lessons from rebuilding my portfolio on Next.js 16 — file-system content, static generation, and a custom open-graph pipeline.",
    date: "2026-01-15",
    readingTime: 4,
    tags: ["Projects", "Architecture", "Next.js", "Performance"],
  },
]

// Skill to project mapping
const SKILL_PROJECT_MAP: Record<string, string[]> = {
  "Next.js": ["Nabodigonto", "InsideJibon", "ARVAANA", "Mosque Library Management"],
  "React": ["InsideJibon", "Remocomp", "ARVAANA", "Quran Reading Tracker"],
  "TypeScript": ["InsideJibon", "Remocomp", "ARVAANA", "Quran Reading Tracker"],
  "C++": ["Codeforces Solutions", "LeetCode Solutions"],
  "Java": ["Quiz Management & Examination System", "image-comparison"],
  "Tailwind CSS": ["Nabodigonto", "InsideJibon", "Remocomp", "ARVAANA", "Mosque Library Management"],
  "PostgreSQL / Neon": ["Nabodigonto", "InsideJibon", "Mosque Library Management"],
  "Vercel": ["Nabodigonto", "InsideJibon", "ARVAANA"],
  "Cloudflare Workers & R2": ["Nabodigonto", "InsideJibon", "Remocomp"],
  "Git & GitHub": ["romankh3/image-comparison (PR #255)", "Remocomp", "TetriC"],
  "SQLite": ["Quiz Management & Examination System"],
  "React Native / Expo": ["Quran Reading Tracker"],
  "JavaScript": ["InsideJibon", "ARVAANA"],
  "Cloudflare D1": ["InsideJibon", "Remocomp"],
  "Linux / Bash": ["TetriC", "InsideJibon"],
  "JavaFX": ["Quiz Management & Examination System"],
  "Socket Programming": ["TetriC"],
  "Node.js": ["Remocomp", "InsideJibon"],
  "Maven & JUnit 5": ["Quiz Management & Examination System", "image-comparison"],
  "Prisma ORM": ["Nabodigonto", "Mosque Library Management"],
}

export function getAllSearchableItems(): SearchableItem[] {
  const content = getContent()
  const items: SearchableItem[] = []

  // 1. Projects & Case Studies (All 11 projects)
  const flagshipSet = new Set(["Nabodigonto", "InsideJibon", "ARVAANA"])
  for (const project of content.projects) {
    const slug = slugify(project.title)
    const isFlagship = flagshipSet.has(project.title)
    const isPR = project.title === "image-comparison"
    const isAlgo = project.category === "Algorithms"

    const highlightsText = (project.highlights || []).join(" · ")
    const challengesText = (project.challenges || []).join(" · ")
    const decisionsText = (project.keyDecisions || []).join(" · ")

    const fullSnippet = [
      project.summary,
      project.problem,
      project.technicalApproach,
      highlightsText,
      challengesText,
      decisionsText,
      project.result,
    ]
      .filter(Boolean)
      .join(" ")

    const secondaryActions: { label: string; href: string }[] = []
    if (project.links) {
      for (const link of project.links) {
        secondaryActions.push({ label: link.label === "Live Demo" ? "Live ↗" : `${link.label} ↗`, href: link.url })
      }
    }

    items.push({
      id: `project-${slug}`,
      title: project.title,
      subtitle: project.role ? `${project.role} · ${project.category}` : project.category,
      category: "Projects & Case Studies",
      keywords: [
        project.category,
        ...(project.tags || []),
        ...(project.tech || []),
        isFlagship ? "Flagship Case Study" : "",
        isPR ? "Maven Central PR #255 romankh3/image-comparison ArrayDeque iterative traversal" : "",
        isAlgo ? "Competitive Programming Archive Codeforces LeetCode" : "",
      ].filter(Boolean),
      contentSnippet: fullSnippet,
      badge: isFlagship ? "Flagship" : isPR ? "Maven PR" : isAlgo ? "Archive" : project.category,
      href: `/projects/${slug}`,
      actionType: "navigate",
      secondaryActions,
    })
  }

  // 2. Engineering Blog (9 Posts)
  for (const post of BLOG_POSTS_METADATA) {
    items.push({
      id: `blog-${post.slug}`,
      title: post.title,
      subtitle: `${post.date} · ${post.readingTime} min read`,
      category: "Engineering Blog",
      keywords: ["blog", "writing", "essay", "article", ...(post.tags || [])],
      contentSnippet: `${post.description} Tags: ${post.tags.join(", ")}`,
      badge: `${post.readingTime} min read`,
      href: `/blog/${post.slug}`,
      actionType: "navigate",
    })
  }

  // 3. Technical Skills (26+ skills across Primary, Working Knowledge, Familiar)
  for (const group of content.skills) {
    for (const skill of group.items) {
      const usedIn = SKILL_PROJECT_MAP[skill.name] || []
      const skillSlug = slugify(skill.name)

      const secondaryActions = usedIn.slice(0, 2).map((p) => {
        const pSlug = p.includes("PR #255") ? "image-comparison" : slugify(p)
        return { label: p, href: `/projects/${pSlug}` }
      })

      items.push({
        id: `skill-${skillSlug}`,
        title: skill.name,
        subtitle: usedIn.length > 0 ? `Used in: ${usedIn.join(", ")}` : `${group.category} Competence`,
        category: "Technical Skills",
        keywords: [group.category, "skill", "technology", "stack", ...(usedIn || [])],
        contentSnippet: `${group.description || ""} Practical experience with ${skill.name}. Implemented across ${usedIn.join(", ")}.`,
        badge: group.category,
        href: `/#skills`,
        actionType: "navigate",
        secondaryActions: secondaryActions.length > 0 ? secondaryActions : undefined,
      })
    }
  }

  // 4. Academic Foundation, Coursework & Admission Merit Records
  // 4a. BSSE Degree
  items.push({
    id: "acad-bsse",
    title: "B.Sc. in Software Engineering (BSSE)",
    subtitle: "Institute of Information Technology (IIT), University of Dhaka (2024 – Present)",
    category: "Academic & Achievements",
    keywords: ["BSSE", "IIT DU", "University of Dhaka", "Software Engineering", "Undergraduate", "Dhaka University"],
    contentSnippet: "Studying core software engineering, data structures, algorithms, relational database systems, GoF design patterns, operating systems, and distributed architecture.",
    badge: "BSSE Degree",
    href: "/#education",
    actionType: "navigate",
  })

  // 4b. Coursework items
  const courses = [
    { name: "Data Structures & Algorithms", desc: "Asymptotic complexity, graph algorithms (BFS, DFS, Dijkstra), dynamic programming, tree structures." },
    { name: "Design Patterns & Software Architecture", desc: "Gang of Four (GoF) structural, creational, and behavioral design patterns: Strategy, State, Observer, Factory." },
    { name: "Database Management Systems", desc: "Relational schema design, SQL, ACID transactions, normalization, indexing, and query optimization." },
    { name: "Operating Systems & Concurrency", desc: "Process scheduling, thread synchronization, deadlocks, virtual memory, and socket network programming." },
    { name: "Software Requirement Analysis", desc: "SRS documentation, user stories, software lifecycle modeling, and system verification." },
    { name: "Object-Oriented Programming (C++, Java)", desc: "Encapsulation, inheritance, polymorphism, templates, memory management, and modern Java 17 features." },
  ]
  for (const c of courses) {
    items.push({
      id: `course-${slugify(c.name)}`,
      title: c.name,
      subtitle: "BSSE Coursework · IIT, University of Dhaka",
      category: "Academic & Achievements",
      keywords: ["coursework", "academics", "curriculum", "IIT DU", c.name],
      contentSnippet: c.desc,
      badge: "Coursework",
      href: "/#education",
      actionType: "navigate",
    })
  }

  // 4c. National Admission Merit Records
  const admissions = [
    {
      univ: "Rajshahi University",
      merit: "Merit 3 (Unit C-1)",
      marks: "92.5/100",
      desc: "Ranked 3rd nationally (Unit C-1) among 100,000+ competitive test applicants.",
    },
    {
      univ: "University of Dhaka",
      merit: "Merit 735",
      marks: "89.5/120",
      desc: "Scored 89.5/120, securing admission into B.Sc. in Software Engineering (BSSE) at IIT, University of Dhaka (Top 0.5% nationally).",
    },
    {
      univ: "University of Chittagong",
      merit: "Merit 56",
      marks: "105/120",
      desc: "Ranked 56th nationally in University of Chittagong science entrance examination.",
    },
    {
      univ: "Jahangirnagar University",
      merit: "Merit 245 (boys)",
      marks: "80.8/100",
      desc: "Scored 80.8/100 in Jahangirnagar University entrance test.",
    },
    {
      univ: "CUET-KUET-RUET Engineering Cluster",
      merit: "Merit 2851",
      marks: "National Test",
      desc: "Engineering cluster combined national admission test for CUET, KUET, and RUET.",
    },
  ]
  for (const adm of admissions) {
    items.push({
      id: `admission-${slugify(adm.univ)}`,
      title: `${adm.univ} Admission — ${adm.merit}`,
      subtitle: `Marks: ${adm.marks} · National Entrance`,
      category: "Academic & Achievements",
      keywords: [adm.univ, adm.merit, adm.marks, "admission test", "merit", "selectivity", "results"],
      contentSnippet: adm.desc,
      badge: adm.merit,
      href: "/#education",
      actionType: "navigate",
    })
  }

  // 4d. HSC
  items.push({
    id: "acad-hsc",
    title: "Higher Secondary Certificate (HSC)",
    subtitle: "Science Background (2020 – 2022)",
    category: "Academic & Achievements",
    keywords: ["HSC", "Higher Secondary", "Science", "Physics", "Mathematics", "Computer Science"],
    contentSnippet: "Focused on advanced mathematics, physics, and computer science foundations.",
    badge: "HSC",
    href: "/#education",
    actionType: "navigate",
  })

  // 5. Currently Studying (Now)
  for (const nowItem of content.now) {
    items.push({
      id: `now-${slugify(nowItem.title)}`,
      title: nowItem.title,
      subtitle: "Current Active Focus · Now",
      category: "Currently Studying (Now)",
      keywords: ["now", "learning", "study", "concurrency", "architecture", nowItem.title],
      contentSnippet: nowItem.summary,
      badge: "Now Studying",
      href: "/#now",
      actionType: "navigate",
    })
  }

  // 6. Philosophy, Core Tenets & All FAQ Items
  // 6a. Core Engineering Tenets
  const tenets = [
    { title: "Tenet: Reliability First & Resilient Architecture", desc: "Design for reliability first: resilient schema migrations, atomic edge batching, and distributed caching." },
    { title: "Tenet: Offline-First Parity", desc: "Build mobile and client experiences that remain 100% functional without network connectivity." },
    { title: "Tenet: GoF Design Patterns", desc: "Apply Gang of Four patterns (Strategy, State, Observer, Factory) for maintainable, testable codebases." },
    { title: "Tenet: Continuous Open-Source Contribution", desc: "Active upstream contribution to production libraries and community mentorship." },
  ]
  for (const t of tenets) {
    items.push({
      id: `tenet-${slugify(t.title)}`,
      title: t.title,
      subtitle: "Core Engineering Tenet",
      category: "Philosophy & FAQ",
      keywords: ["tenet", "philosophy", "engineering", "principles", "reliability", "offline"],
      contentSnippet: t.desc,
      badge: "Tenet",
      href: "/#about",
      actionType: "navigate",
    })
  }

  // 6b. All FAQ Questions
  if (content.faq) {
    for (const f of content.faq) {
      items.push({
        id: `faq-${slugify(f.question)}`,
        title: f.question,
        subtitle: "Recruiter FAQ & Entity Detail",
        category: "Philosophy & FAQ",
        keywords: ["faq", "question", "interview", "recruiter", "internship", "availability", "roles", "contact", "it secretary"],
        contentSnippet: f.answer,
        badge: "FAQ",
        href: "/#faq",
        actionType: "navigate",
      })
    }
  }

  // 7. Navigation & Page Sections
  const sections = [
    { title: "Hero & Introduction", subtitle: "Identity, university affiliation, and quick overview", href: "/#home", badge: "Hero" },
    { title: "Snapshot & Key Metrics", subtitle: "11 Projects Built, 150+ Problems Solved, 6+ Languages, '24–'28 BSSE", href: "/#stats-title", badge: "Stats" },
    { title: "Featured Work (Spotlight)", subtitle: "Nabodigonto, InsideJibon, ARVAANA flagship systems", href: "/#spotlight", badge: "Featured" },
    { title: "Projects Directory Index", subtitle: "Searchable directory of 11 repositories with domain filters", href: "/#projects", badge: "Directory" },
    { title: "Open-Source & Algorithmic Proof", subtitle: "Maven Central PR #255 & 150+ Codeforces/LeetCode track record", href: "/#algorithmic-proof", badge: "Bento" },
    { title: "Currently Looking / Availability", subtitle: "Open to Software Engineering internships and junior roles", href: "/#currently-looking", badge: "Opportunity" },
    { title: "Technical Competence (Skills)", subtitle: "Primary, Working Knowledge, and Familiar skill groupings", href: "/#skills", badge: "Skills" },
    { title: "Engineering Philosophy (About)", subtitle: "Engineering tenets, university background, and recruiter FAQ", href: "/#about", badge: "About" },
    { title: "Academic Foundation (Education)", subtitle: "BSSE at IIT DU and national admission merit breakdown", href: "/#education", badge: "Education" },
    { title: "Engineering Notes (Writing / Blog)", subtitle: "Technical case studies on edge architecture and distributed systems", href: "/blog", badge: "Writing" },
    { title: "Now Learning & Current Focus", subtitle: "Active focus in OS concurrency, DBMS internals, and GoF patterns", href: "/#now", badge: "Now" },
    { title: "Contact & Collaboration Form", subtitle: "Direct contact form with serverless delivery and Turnstile verification", href: "/#contact", badge: "Contact" },
  ]
  for (const s of sections) {
    items.push({
      id: `section-${slugify(s.title)}`,
      title: s.title,
      subtitle: s.subtitle,
      category: "Navigation & Sections",
      keywords: ["section", "navigate", "page", "jump", s.title, s.badge],
      contentSnippet: `${s.title}: ${s.subtitle}`,
      badge: s.badge,
      href: s.href,
      actionType: "navigate",
    })
  }

  // 8. Quick Actions & Social Profiles
  items.push(
    {
      id: "action-copy-email",
      title: "Copy Email Address",
      subtitle: "mdshourov735@gmail.com",
      category: "Quick Actions & Socials",
      keywords: ["email", "copy", "contact", "gmail", "message"],
      badge: "Action",
      actionType: "copy-email",
    },
    {
      id: "action-download-resume",
      title: "Download Resume PDF",
      subtitle: "Md. Shourov — Software Engineering Resume",
      category: "Quick Actions & Socials",
      keywords: ["resume", "cv", "pdf", "download", "credentials"],
      badge: "Action",
      href: "/assets/resume/Md-Shourov-Resume.pdf",
      actionType: "download-resume",
    },
    {
      id: "action-toggle-theme",
      title: "Toggle Theme (Light / Dark)",
      subtitle: "Switch between clean high-contrast light and dark mode",
      category: "Quick Actions & Socials",
      keywords: ["theme", "toggle", "dark mode", "light mode", "color"],
      badge: "Action",
      actionType: "toggle-theme",
    },
    {
      id: "social-github",
      title: "GitHub Profile",
      subtitle: "github.com/Shourov735 · 11+ repositories",
      category: "Quick Actions & Socials",
      keywords: ["github", "profile", "git", "source", "code", "Shourov735"],
      badge: "External ↗",
      href: "https://github.com/Shourov735",
      actionType: "external",
    },
    {
      id: "social-linkedin",
      title: "LinkedIn Profile",
      subtitle: "linkedin.com/in/md-shourov-613934358",
      category: "Quick Actions & Socials",
      keywords: ["linkedin", "profile", "career", "connect", "network"],
      badge: "External ↗",
      href: "https://linkedin.com/in/md-shourov-613934358",
      actionType: "external",
    },
    {
      id: "social-codeforces",
      title: "Codeforces Profile",
      subtitle: "codeforces.com/profile/Shourov735 · 150+ problems",
      category: "Quick Actions & Socials",
      keywords: ["codeforces", "competitive programming", "algorithms", "c++", "problems", "rating"],
      badge: "External ↗",
      href: "https://codeforces.com/profile/Shourov735",
      actionType: "external",
    },
    {
      id: "social-leetcode",
      title: "LeetCode Profile",
      subtitle: "leetcode.com/u/Shourov735/ · DSA practice",
      category: "Quick Actions & Socials",
      keywords: ["leetcode", "dsa", "interview", "problems", "data structures"],
      badge: "External ↗",
      href: "https://leetcode.com/u/Shourov735/",
      actionType: "external",
    },
    {
      id: "social-youtube",
      title: "YouTube Channel",
      subtitle: "youtube.com/@MD._SHOUROV_ · Tech walkthroughs",
      category: "Quick Actions & Socials",
      keywords: ["youtube", "video", "channel", "demo"],
      badge: "External ↗",
      href: "https://www.youtube.com/@MD._SHOUROV_",
      actionType: "external",
    },
    {
      id: "social-twitter",
      title: "X (Twitter) Profile",
      subtitle: "x.com/Shourov735",
      category: "Quick Actions & Socials",
      keywords: ["x", "twitter", "social", "updates"],
      badge: "External ↗",
      href: "https://x.com/Shourov735",
      actionType: "external",
    },
    {
      id: "social-telegram",
      title: "Telegram Contact",
      subtitle: "t.me/Shourov735",
      category: "Quick Actions & Socials",
      keywords: ["telegram", "chat", "message"],
      badge: "External ↗",
      href: "https://t.me/Shourov735",
      actionType: "external",
    },
    {
      id: "social-medium",
      title: "Medium Profile",
      subtitle: "medium.com/@Shourov735",
      category: "Quick Actions & Socials",
      keywords: ["medium", "articles", "stories", "writing"],
      badge: "External ↗",
      href: "https://medium.com/@Shourov735",
      actionType: "external",
    }
  )

  return items
}

// Extract a clean 1-line snippet around the matched token
function extractMatchSnippet(content: string, tokens: string[]): string | undefined {
  if (!content) return undefined
  const lower = content.toLowerCase()
  for (const token of tokens) {
    const idx = lower.indexOf(token)
    if (idx !== -1) {
      const start = Math.max(0, idx - 30)
      const end = Math.min(content.length, idx + token.length + 50)
      let snippet = content.slice(start, end).trim()
      if (start > 0) snippet = "…" + snippet
      if (end < content.length) snippet = snippet + "…"
      return snippet
    }
  }
  return undefined
}

// Multi-token weighted scoring function
export function scoreSearchItem(item: SearchableItem, queryTokens: string[]): { score: number; matchSnippet?: string } {
  if (queryTokens.length === 0) return { score: 1 }

  const titleLower = item.title.toLowerCase()
  const subtitleLower = (item.subtitle || "").toLowerCase()
  const categoryLower = item.category.toLowerCase()
  const badgeLower = (item.badge || "").toLowerCase()
  const keywordsLower = item.keywords.join(" ").toLowerCase()
  const snippetLower = (item.contentSnippet || "").toLowerCase()

  let totalScore = 0
  let matchedAll = true
  let matchedInDeepField = false

  for (const token of queryTokens) {
    let tokenScore = 0

    // Exact or prefix title match: +100
    if (titleLower === token || titleLower.startsWith(token)) {
      tokenScore += 100
    }
    // Substring title match: +60
    else if (titleLower.includes(token)) {
      tokenScore += 60
    }

    // Tech stack / keyword / badge match: +45
    if (keywordsLower.includes(token) || badgeLower.includes(token)) {
      tokenScore += 45
      if (!titleLower.includes(token)) matchedInDeepField = true
    }

    // Subtitle / category match: +30
    if (subtitleLower.includes(token) || categoryLower.includes(token)) {
      tokenScore += 30
      if (!titleLower.includes(token)) matchedInDeepField = true
    }

    // Deep content / bullet highlight / FAQ answer match: +20
    if (snippetLower.includes(token)) {
      tokenScore += 20
      if (!titleLower.includes(token)) matchedInDeepField = true
    }

    if (tokenScore === 0) {
      matchedAll = false
      break
    }

    totalScore += tokenScore
  }

  if (!matchedAll) {
    return { score: 0 }
  }

  let matchSnippet: string | undefined = undefined
  if (matchedInDeepField && item.contentSnippet) {
    matchSnippet = extractMatchSnippet(item.contentSnippet, queryTokens)
  }

  return { score: totalScore, matchSnippet }
}
