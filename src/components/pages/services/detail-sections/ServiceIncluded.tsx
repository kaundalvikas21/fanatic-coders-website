import { Check } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"
import { type ServiceGroup, type ServiceItem, iconColor } from "../data"

export function ServiceIncluded({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  const accent = iconColor[group.accent]

  return (
    <section className="relative overflow-hidden section-y" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
          {/* Left: heading + outcome */}
          <RevealSection>
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
              what.<span style={{ color: accent }}>youGet</span>()
            </h2>
            <p className="mt-4 text-base text-blue-100/65 leading-relaxed">
              Everything in the scope, delivered by the senior people who planned it.
            </p>
            <GlassCard accent={group.accent} className="mt-6 p-6">
              <div className="text-xs font-mono text-blue-100/50 mb-2">{"// outcome"}</div>
              <p className="text-base text-white leading-relaxed">{service.outcome}</p>
            </GlassCard>
          </RevealSection>

          {/* Right: points list */}
          <RevealSection stagger className="space-y-3">
            {service.points.map((point) => (
              <div key={point} className="flex items-start gap-4 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <Check size={15} style={{ color: accent }} aria-hidden />
                </span>
                <p className="text-sm md:text-base text-blue-100/80 leading-relaxed">{point}</p>
              </div>
            ))}
          </RevealSection>
        </div>

        {service.tech.length > 0 && (
          <RevealSection className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
              built.<span style={{ color: accent }}>with</span>()
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {service.tech.map((t) => (
                <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-mono text-blue-100/80">{t}</span>
              ))}
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  )
}
