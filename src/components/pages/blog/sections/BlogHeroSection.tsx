"use client"

import { Search } from "lucide-react"
import { RevealSection } from "@/components/ui/RevealSection"
import { categories } from "../data"
import { useBlogFilter } from "../BlogFilterContext"

export function BlogHeroSection() {
  const { query, setQuery, category, setCategory } = useBlogFilter()

  return (
    <section id="blog-hero" className="relative overflow-hidden pt-[184px] md:pt-[196px] pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="max-w-2xl mx-auto text-center">
          <div className="preheading-code">blog.module</div>
          <h1 className="heading-code mt-3">
            we.<span className="function">write</span>()
          </h1>
          <p className="subheading-code mt-3">{"// field notes on building software that lasts"}</p>

          <p className="mt-6 text-base sm:text-lg text-blue-100/70 leading-relaxed">
            Practical writing from the team on architecture decisions, design craft, and the
            lessons we learn shipping real products.
          </p>

          {/* Search */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/40" aria-hidden />
            <label htmlFor="blog-search" className="sr-only">Search articles</label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-blue-100/35 outline-none transition-colors focus:border-indigo-400/60 focus:bg-white/[0.07]"
            />
          </div>

          {/* Category chips */}
          <div className="mt-5 flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter posts by category">
            {categories.map((cat) => {
              const isActive = category === cat
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-mono transition-colors ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-200 border border-indigo-400/40"
                      : "bg-white/5 text-blue-100/60 border border-white/10 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
