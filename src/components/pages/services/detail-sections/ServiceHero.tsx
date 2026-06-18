import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { Stat } from "@/components/ui/Stat"
import { type ServiceGroup, type ServiceItem, iconColor } from "../data"

export function ServiceHero({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  const accent = iconColor[group.accent]
  const { Icon } = service

  return (
    <section className="relative overflow-hidden hero-shell pb-20">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <Breadcrumb items={[{ label: "home", href: "/" }, { label: "services", href: "/services" }, { label: service.slug }]} />
        </RevealSection>

        <RevealSection className="mt-8 max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <Icon size={26} style={{ color: accent }} aria-hidden />
            </span>
            <span className="text-sm font-mono" style={{ color: accent }}>./{group.label}</span>
          </div>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold text-white leading-[1.05] tracking-tight">{service.heroTitle ?? service.title}</h1>
          <p className="mt-5 text-lg text-blue-100/75 leading-relaxed max-w-[60ch]">{service.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <GradientButton href="/contact">
              startAProject
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="/portfolio" variant="secondary">
              see our work
            </GradientButton>
          </div>
        </RevealSection>

        {service.stats.length > 0 && (
          <RevealSection stagger className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {service.stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </RevealSection>
        )}
      </div>
    </section>
  )
}
