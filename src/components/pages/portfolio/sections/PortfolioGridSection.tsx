"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { projects } from "../data"

const filters = ["All", "Web", "Mobile", "SaaS", "E-Commerce", "Branding"]

export function PortfolioGridSection() {
  const [active, setActive] = useState("All")
  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.tags.includes(active))),
    [active]
  )

  return (
    <section id="portfolio-grid" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="case_studies.ts"
            title={<>our.<span className="function">work</span>()</>}
            comment="// filter by what you're building"
          />
        </RevealSection>

        {/* Tag filter */}
        <div className="mt-12 flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter projects by type">
          {filters.map((f) => {
            const isActive = active === f
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-sm font-mono transition-colors ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-200 border border-indigo-400/40"
                    : "bg-white/5 text-blue-100/60 border border-white/10 hover:text-white hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>

        {/* Project grid */}
        <RevealSection className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Link key={project.id} href={`/portfolio/${project.id}`} className="no-underline group/card">
              <GlassCard lift className="h-full overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10]">
                  <Image src={project.imageUrl!} alt={project.title} fill priority={i === 0} className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-indigo-500/12 px-2.5 py-0.5 text-[11px] font-mono text-indigo-300">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white leading-snug">{project.title}</h3>
                    <ArrowUpRight size={16} className="mt-0.5 flex-shrink-0 text-blue-100/40 transition-colors group-hover/card:text-indigo-300" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed flex-1">{project.description}</p>
                  <div className="mt-4 flex gap-5 border-t border-white/5 pt-4">
                    {project.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <div className="text-lg font-bold font-mono text-white tabular-nums">{stat.value}</div>
                        <div className="text-[11px] font-mono text-blue-100/50">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm font-mono text-blue-100/50">{`// no projects tagged ${active} yet`}</p>
        )}
      </div>
    </section>
  )
}
