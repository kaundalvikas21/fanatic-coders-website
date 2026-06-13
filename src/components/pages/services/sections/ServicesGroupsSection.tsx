import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { groups, iconColor } from "../data"

export function ServicesGroupsSection() {
  return (
    <section id="services-groups" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="capabilities.ts"
            title={<>what.<span className="function">weDo</span>()</>}
            comment="// three teams, one standard of craft"
          />
        </RevealSection>

        <div className="mt-16 space-y-16 max-w-6xl mx-auto">
          {groups.map((group) => (
            <div key={group.key}>
              <RevealSection className="mb-6 flex items-baseline gap-3">
                <h3 className="text-xl font-bold font-mono text-white">
                  ./<span style={{ color: iconColor[group.accent] }}>{group.label}</span>
                </h3>
                <p className="text-sm text-blue-100/55">{group.blurb}</p>
              </RevealSection>

              <RevealSection stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  <Link key={item.slug} href={`/services/${item.slug}`} className="no-underline group/card">
                    <GlassCard accent={group.accent} lift className="h-full p-6">
                      <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <item.Icon size={20} style={{ color: iconColor[group.accent] }} aria-hidden />
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-blue-100/60 leading-relaxed mb-4">{item.description}</p>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-mono"
                        style={{ color: iconColor[group.accent] }}
                      >
                        explore
                        <ArrowRight size={14} className="transition-transform group-hover/card:translate-x-1" aria-hidden />
                      </span>
                    </GlassCard>
                  </Link>
                ))}
              </RevealSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
