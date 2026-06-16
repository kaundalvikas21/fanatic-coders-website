import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { type ServiceGroup, iconColor, serviceDeliverables } from "../data"

export function ServiceDeliverables({ group }: { group: ServiceGroup }) {
  const color = iconColor[group.accent]

  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="what.you.get"
            title={<>project.<span className="function">deliverables</span>()</>}
            comment="// what you receive at the end of an engagement"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 gap-4">
          {serviceDeliverables.map((item, i) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 transform-gpu transition-transform duration-300 ease-out will-change-transform hover:-translate-y-0.5"
            >
              <span className="font-mono text-lg font-bold tabular-nums leading-none pt-1.5" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="icon-box flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl">
                <item.Icon size={20} style={{ color }} aria-hidden />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-blue-100/60 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
