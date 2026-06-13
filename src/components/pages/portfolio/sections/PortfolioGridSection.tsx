"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

const projects: PortfolioProject[] = [
  { id: "northwind", title: "Northwind Commerce", description: "Headless storefront and checkout rebuild for a fast-growing retailer.", tags: ["E-Commerce", "Web"], stats: [{ label: "conversion", value: "+38%" }, { label: "load_time", value: "0.9s" }], imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=520&fit=crop" },
  { id: "pulse", title: "Pulse Analytics", description: "Real-time dashboard SaaS with sub-second queries over billions of rows.", tags: ["SaaS", "Web"], stats: [{ label: "query_p95", value: "120ms" }, { label: "MRR", value: "+2.1x" }], imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=520&fit=crop" },
  { id: "wander", title: "Wander", description: "Cross-platform travel app with offline itineraries and live sync.", tags: ["Mobile"], stats: [{ label: "rating", value: "4.9★" }, { label: "installs", value: "250k+" }], imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=520&fit=crop" },
  { id: "forge", title: "Forge Identity", description: "Brand system and design language for a developer-tools company.", tags: ["Branding"], stats: [{ label: "recall", value: "+64%" }, { label: "assets", value: "120" }], imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=520&fit=crop" },
  { id: "lumen", title: "Lumen Health", description: "HIPAA-ready patient portal with scheduling and secure messaging.", tags: ["Web", "SaaS"], stats: [{ label: "uptime", value: "99.98%" }, { label: "NPS", value: "72" }], imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=520&fit=crop" },
  { id: "atlas", title: "Atlas Logistics", description: "Fleet tracking platform with live maps and route optimization.", tags: ["Web", "Mobile"], stats: [{ label: "fuel_saved", value: "18%" }, { label: "fleets", value: "340" }], imageUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=520&fit=crop" },
]

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
            // TODO: link to `/portfolio/${project.id}` once case-study pages exist; hub for now to avoid 404.
            <Link key={project.id} href="/portfolio" className="no-underline group/card">
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
                    {project.stats.map((stat) => (
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
