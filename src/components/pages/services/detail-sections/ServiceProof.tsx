import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { getProject } from "../../portfolio/data"
import type { ServiceItem } from "../data"

export function ServiceProof({ service }: { service: ServiceItem }) {
  const cases = service.relatedCaseStudyIds.map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p))
  if (cases.length === 0) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            proof.<span style={{ color: "var(--aurora-violet-light)" }}>inProduction</span>()
          </h2>
          <p className="mt-4 text-base text-blue-100/60 leading-relaxed max-w-[55ch]">
            Real projects where this work moved the numbers that mattered.
          </p>
        </RevealSection>
        <RevealSection stagger className="mt-10 grid sm:grid-cols-2 gap-6">
          {cases.map((p) => (
            <Link key={p.id} href={`/portfolio/${p.id}`} className="no-underline group/card">
              <GlassCard lift className="h-full overflow-hidden flex flex-col">
                {p.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover/card:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white leading-snug transition-colors group-hover/card:text-indigo-200">{p.title}</h3>
                    <ArrowUpRight size={18} className="mt-0.5 flex-shrink-0 text-blue-100/40 transition-colors group-hover/card:text-indigo-300" aria-hidden />
                  </div>
                  <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex gap-5 border-t border-white/5 pt-4">
                    {p.stats.slice(0, 2).map((stat) => (
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
      </div>
    </section>
  )
}
