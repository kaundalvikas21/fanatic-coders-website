import type { BlogPost } from "@/types"

export const posts: BlogPost[] = [
  { id: "1", title: "Why we ship in weekly increments", excerpt: "Tight feedback loops beat big-bang launches. Here's how we keep momentum without burning out.", date: "Jun 2, 2026", readTime: "6 min", category: "Engineering", slug: "weekly-increments", coverUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=500&fit=crop" },
  { id: "2", title: "Designing dark-first interfaces that don't strain", excerpt: "Contrast, depth, and color in dark UI: the choices that make our Aurora system readable.", date: "May 24, 2026", readTime: "8 min", category: "Design", slug: "dark-first-design", coverUrl: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=500&fit=crop" },
  { id: "3", title: "A pragmatic guide to Next.js App Router", excerpt: "Server components, data patterns, and the boundaries we actually use in production.", date: "May 15, 2026", readTime: "10 min", category: "Engineering", slug: "app-router-guide", coverUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop" },
  { id: "4", title: "Measuring what marketing actually moves", excerpt: "Vanity metrics are easy. We focus on the few numbers that predict revenue.", date: "May 6, 2026", readTime: "5 min", category: "Growth", slug: "marketing-metrics", coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop" },
  { id: "5", title: "How we keep production fast under load", excerpt: "Caching, edge rendering, and observability: the playbook behind our uptime.", date: "Apr 28, 2026", readTime: "7 min", category: "Engineering", slug: "fast-under-load", coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop" },
  { id: "6", title: "Building a brand system that scales", excerpt: "From logo to motion, the components that keep a brand coherent as it grows.", date: "Apr 19, 2026", readTime: "6 min", category: "Design", slug: "brand-systems", coverUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop" },
  { id: "7", title: "What we learned scaling a team to 40", excerpt: "Hiring, mentoring, and the culture choices that kept quality high as we grew.", date: "Apr 10, 2026", readTime: "9 min", category: "Company", slug: "scaling-the-team", coverUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop" },
]

export const categories = ["All", "Engineering", "Design", "Growth", "Company"]

// Curated most-read posts for the popular section (by slug).
export const popularSlugs = ["app-router-guide", "dark-first-design", "scaling-the-team"]
