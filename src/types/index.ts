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
