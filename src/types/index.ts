export interface NavLink {
  label: string
  href: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  coverUrl?: string
  author?: string
  authorRole?: string
  authorAvatar?: string
  tags?: string[]
  /** Article body as headed sections (each id anchors the table of contents). */
  sections?: Array<{ id: string; heading: string; paragraphs: string[] }>
  /** Short scannable summary points. */
  takeaways?: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  tags: string[]
  featured?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  rating: number
  initials: string
}

export interface TechItem {
  name: string
  description: string
  icon?: string
}

export interface TechCategory {
  label: string
  items: TechItem[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  tags: string[]
  stats: Array<{ label: string; value: string }>
  imageUrl?: string
  client?: string
  year?: string
  industry?: string
  duration?: string
  services?: string[]
  overview?: string
  /** Case-study body blocks (e.g. Challenge / Approach / Result). */
  sections?: Array<{ heading: string; body: string }>
  /** Concrete "what we did" bullets for the approach section. */
  approach?: string[]
  tech?: string[]
  quote?: { text: string; author: string; role: string }
  gallery?: string[]
}

export interface CoreValue {
  id: string
  title: string
  description: string
  icon: string
}

export interface Partner {
  name: string
  logoPath: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl: string
  socials?: { github?: string; linkedin?: string; twitter?: string }
}
