import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { projects } from "../data"

export function CaseRelated({ project }: { project: PortfolioProject }) {
  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            more.<span className="text-indigo-400">work</span>()
          </h2>
        </RevealSection>
        <RevealSection stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link key={p.id} href={`/portfolio/${p.id}`} className="no-underline group/card">
              <GlassCard lift className="h-full overflow-hidden flex flex-col">
                {p.imageUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover/card:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-indigo-500/12 px-2.5 py-0.5 text-[11px] font-mono text-indigo-300">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-white leading-snug transition-colors group-hover/card:text-indigo-200">{p.title}</h3>
                    <ArrowUpRight size={16} className="mt-0.5 flex-shrink-0 text-blue-100/40 transition-colors group-hover/card:text-indigo-300" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">{p.description}</p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
