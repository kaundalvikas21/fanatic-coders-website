import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { GlassCard } from "@/components/ui/GlassCard"
import { getProject } from "../../portfolio/data"
import { type Accent, type ServiceGroup, type ServiceItem, iconColor, accentToken } from "../data"

function statBoxStyle(accent: Accent): CSSProperties {
  const c = accentToken[accent]
  return {
    border: `1px solid color-mix(in srgb, ${c} 28%, transparent)`,
    boxShadow: `0 0 0 1px color-mix(in srgb, ${c} 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.04)`,
    background: "color-mix(in srgb, var(--dark-1) 45%, transparent)",
  }
}

export function ServiceProof({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  const project = service.relatedCaseStudyIds.map(getProject).find(Boolean)
  if (!project) return null

  const color = iconColor[group.accent]
  const stats = project.stats.slice(0, 3)
  const chips = (project.services ?? project.tags ?? []).slice(0, 3)

  return (
    <section className="relative overflow-hidden section-y" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="featured.work"
            title={<>case.<span className="function">study</span>()</>}
            comment="// one project this work shipped"
          />
        </RevealSection>

        <RevealSection className="mt-14">
          <Link href={`/portfolio/${project.id}`} className="group/case block no-underline">
            <GlassCard className="p-8 md:p-10 transition-transform duration-300 ease-out group-hover/case:scale-[1.02]">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
              <div className="flex flex-col">
                <p className="text-xs font-mono uppercase tracking-wider text-blue-100/60">
                  {`// ${project.client} ${project.industry}`}
                </p>
                <h3 className="mt-4 text-2xl md:text-3xl font-bold text-white leading-snug">{project.title}</h3>
                <p className="mt-3 text-base text-blue-100/60 leading-relaxed max-w-[52ch]">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {chips.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs font-mono text-blue-100/65"
                    >
                      <span style={{ color }}>+</span>
                      {svc}
                    </span>
                  ))}
                </div>

                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-mono"
                  style={{ color }}
                >
                  view case study
                  <ArrowRight size={14} className="transition-transform group-hover/case:translate-x-1" aria-hidden />
                </span>

                <p className="mt-auto pt-8 text-xs font-mono text-blue-100/55">
                  {"// figures are illustrative, shared with client permission on request"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 self-start">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl p-4 sm:p-5 text-center" style={statBoxStyle(group.accent)}>
                    <div className="text-2xl md:text-3xl font-bold font-mono tabular-nums" style={{ color }}>
                      {stat.value}
                    </div>
                    <div className="mt-1.5 text-xs font-mono text-blue-100/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            </GlassCard>
          </Link>
        </RevealSection>
      </div>
    </section>
  )
}
