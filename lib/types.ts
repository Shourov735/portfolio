export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  cover?: string
  draft?: boolean
  canonical?: string
}

export interface BlogPostSummary extends BlogFrontmatter {
  slug: string
  readingTime: number
}

export interface BlogPost extends BlogPostSummary {
  content: string
  wordCount: number
}

export interface Stat {
  value: string
  label: string
}

export interface Skill {
  name: string
  level?: number
}

export interface SkillGroup {
  category: string
  description?: string
  items: Skill[]
}

export interface ProjectLink {
  label: string
  url: string
}

export interface VisualEvidence {
  type: "terminal" | "diagram" | "state-machine"
  title: string
  caption?: string
  content: string[]
}

export interface Project {
  title: string
  summary: string
  image: string
  category: string
  tags: string[]
  links: ProjectLink[]
  slug?: string
  role?: string
  problem?: string
  technicalApproach?: string
  challenges?: string[]
  keyDecisions?: string[]
  result?: string
  visualEvidence?: VisualEvidence
  details?: string
  tech?: string[]
  highlights?: string[]
}

export interface Note {
  title: string
  date: string
  summary: string
  tags: string[]
  slug?: string
  content?: string
}

export interface NowItem {
  title: string
  summary: string
}

export interface TimelineItem {
  date: string
  title: string
  summary: string
}

export interface EducationResult {
  university: string
  marks: string
  merit: string
}

export interface EducationItem {
  title: string
  institution: string
  duration: string
  summary: string
  coursework?: string[]
  results?: EducationResult[]
}

export interface Achievement {
  title: string
  summary: string
}

export interface LookingFor {
  badge: string
  title: string
  description: string
  targetRoles: string[]
}

export interface PortfolioContent {
  stats: Stat[]
  skills: SkillGroup[]
  featuredProject: Project[]
  projects: Project[]
  notes: Note[]
  now: NowItem[]
  education: EducationItem[]
  timeline?: TimelineItem[]
  achievements?: Achievement[]
  testimonials: string[]
  lookingFor?: LookingFor
}

export interface GitHubData {
  publicRepos: number
  followers: number
  totalStars: number
  topLanguages: { name: string; percentage: number }[]
}
