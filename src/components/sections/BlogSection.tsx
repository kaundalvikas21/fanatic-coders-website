import Image from "next/image"
import Link from "next/link"
import { Clock, Calendar, ArrowRight, Hash, FileText } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: What's Next in 2024",
    excerpt:
      "Exploring emerging trends in web development, from WebAssembly to Edge Computing and the evolution of frontend frameworks.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop",
    category: "Web Development",
    readTime: "5 min read",
    date: "Mar 15, 2026",
    tags: ["WebAssembly", "Edge Computing", "Frontend"],
  },
  {
    id: 2,
    title: "Building Scalable Applications with Microservices",
    excerpt:
      "A comprehensive guide to microservices architecture, best practices, and real-world implementation strategies.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2074&auto=format&fit=crop",
    category: "Architecture",
    readTime: "8 min read",
    date: "Mar 12, 2026",
    tags: ["Microservices", "DevOps", "Cloud"],
  },
  {
    id: 3,
    title: "AI in Modern Web Applications: A Practical Guide",
    excerpt:
      "How to integrate AI capabilities into your web applications using modern tools and frameworks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    category: "AI & ML",
    readTime: "6 min read",
    date: "Mar 10, 2026",
    tags: ["AI", "Machine Learning", "JavaScript"],
  },
]

export default function BlogSection() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      {/* Code-grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="code-grid absolute inset-0" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">blog.module.ts</div>
          <h2 className="heading-code">
            tech.<span className="text-indigo-400">insights</span>()
          </h2>
          <p className="subheading-code">{"// Latest updates from our tech universe"}</p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {blogPosts.map(post => (
            <article
              key={post.id}
              className="blog-card group rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] to-transparent opacity-50 z-10" />
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-sm font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-blue-100/60">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-indigo-400" aria-hidden />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-indigo-400" aria-hidden />
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold leading-tight hover:text-indigo-400 transition-colors">
                  <Link href={`/blog/${post.id}`} className="block no-underline text-white hover:text-indigo-400 transition-colors">
                    {post.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-blue-100/70 line-clamp-2 text-sm">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs py-1 px-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono"
                    >
                      <Hash size={10} aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm no-underline group/link"
                >
                  <span>Read More</span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <GradientButton href="/blog">
            viewAllPosts
            <FileText size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
          </GradientButton>
        </div>
      </div>
    </section>
  )
}
