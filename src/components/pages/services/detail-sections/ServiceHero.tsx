import { ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"
import { RevealSection } from "@/components/ui/RevealSection"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { type ServiceGroup, type ServiceItem, iconColor } from "../data"

export function ServiceHero({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  const accent = iconColor[group.accent]
  const { Icon } = service

  const intro = (
    <RevealSection className="max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="glass-card flex h-14 w-14 items-center justify-center rounded-2xl">
          <Icon size={26} style={{ color: accent }} aria-hidden />
        </span>
        <span className="text-sm font-mono" style={{ color: accent }}>./{group.label}</span>
      </div>
      <h1 className="hero-h1 mt-5 text-white text-balance">{service.heroTitle ?? service.title}</h1>
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
  )

  const stats = service.stats.length > 0 && (
    <RevealSection stagger className="mt-12 flex flex-wrap gap-x-8 gap-y-5 max-w-3xl">
      {service.stats.map((s) => (
        <div key={s.label} className="flex flex-col sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-white/10 sm:[&:not(:first-child)]:pl-8">
          <span className="text-3xl md:text-4xl font-bold font-mono tabular-nums text-white">{s.value}</span>
          <span className="mt-1 text-xs font-mono uppercase tracking-wider text-blue-100/55">{s.label}</span>
        </div>
      ))}
    </RevealSection>
  )

  return (
    <section className="relative overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8 min-h-[100svh] flex flex-col">
      <div className="aurora-bg-hero absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex w-full max-w-6xl flex-1 flex-col justify-center">
        <RevealSection>
          <Breadcrumb items={[{ label: "home", href: "/" }, { label: "services", href: "/services" }, { label: service.slug }]} />
        </RevealSection>

        <div className="mt-8">{intro}</div>
        {stats}
      </div>
    </section>
  )
}
