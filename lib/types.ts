export interface Stat {
  value: string
  label: string
}

export interface Skill {
  name: string
  level: number
}

export interface SkillGroup {
  category: string
  items: Skill[]
}

export interface ProjectLink {
  label: string
  url: string
}

export interface Project {
  title: string
  summary: string
  image: string
  category: string
  tags: string[]
  links: ProjectLink[]
  slug?: string
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

export interface PortfolioContent {
  stats: Stat[]
  skills: SkillGroup[]
  featuredProject: Project[]
  projects: Project[]
  notes: Note[]
  now: NowItem[]
  timeline: TimelineItem[]
  education: EducationItem[]
  achievements: Achievement[]
  testimonials: string[]
}

export interface GitHubData {
  publicRepos: number
  followers: number
  totalStars: number
  topLanguages: { name: string; percentage: number }[]
}
