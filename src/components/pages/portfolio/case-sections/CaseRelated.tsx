import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PortfolioProject } from "@/types"
import { RevealSection } from "@/components/ui/RevealSection"
import { projects } from "../data"

// Per-card aurora accent. Full literal class strings so Tailwind keeps them.
const accents = [
  { text: "text-violet-300", ring: "group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-violet-400/50", glow: "group-hover/c:shadow-2xl group-hover/c:shadow-violet-500/25", bar: "rgb(124,58,237)" },
  { text: "text-cyan-300", ring: "group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-cyan-400/50", glow: "group-hover/c:shadow-2xl group-hover/c:shadow-cyan-500/25", bar: "rgb(6,182,212)" },
  { text: "text-emerald-300", ring: "group-hover/c:ring-1 group-hover/c:ring-inset group-hover/c:ring-emerald-400/50", glow: "group-hover/c:shadow-2xl group-hover/c:shadow-emerald-500/25", bar: "rgb(16,185,129)" },
]

export function CaseRelated({ project }: { project: PortfolioProject }) {
  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <div className="preheading-code">more work</div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white tracking-tight">More Work</h2>
          <p className="mt-4 text-base text-blue-100/65 leading-relaxed">More projects we have shipped.</p>
        </RevealSection>

        <RevealSection stagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p, i) => {
            const a = accents[i % accents.length]
            const top = p.stats?.[0]
            return (
              <Link key={p.id} href={`/portfolio/${p.id}`} className="block h-full no-underline group/c">
                <article
                  className={`relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] transform-gpu transition-all duration-300 will-change-transform group-hover/c:-translate-y-1.5 ${a.ring} ${a.glow}`}
                >
                  <span
                    className="absolute inset-x-0 top-0 z-10 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover/c:scale-x-100"
                    style={{ background: a.bar }}
                    aria-hidden
                  />
                  {p.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/15">
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover/c:brightness-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/35 to-transparent transition-opacity duration-500 group-hover/c:opacity-75" />
                      {top && (
                        <div className="absolute left-3 top-3 rounded-xl bg-black/45 px-3 py-2 ring-1 ring-white/10 backdrop-blur">
                          <div className={`text-sm font-bold font-mono tabular-nums ${a.text}`}>{top.value}</div>
                          {top.caption && <div className="text-[10px] text-white/60">{top.caption}</div>}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-mono text-blue-100/70">{tag}</span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-blue-100/60 leading-relaxed line-clamp-2">{p.description}</p>
                    <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-mono opacity-70 transition-opacity group-hover/c:opacity-100 ${a.text}`}>
                      view case study
                      <ArrowUpRight size={15} aria-hidden className="transition-transform group-hover/c:translate-x-0.5 group-hover/c:-translate-y-0.5" />
                    </span>
                  </div>
                </article>
              </Link>
            )
          })}
        </RevealSection>
      </div>
    </section>
  )
}
