import type { CSSProperties } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { type ServiceGroup, iconColor, serviceDeliverables } from "../data"

export function ServiceDeliverables({ group }: { group: ServiceGroup }) {
  const color = iconColor[group.accent]
  // Tint the icon-box to the service group's accent (it defaults to violet otherwise).
  const tile = {
    "--accent-icon": `color-mix(in srgb, ${color} 12%, transparent)`,
    "--accent-border": `color-mix(in srgb, ${color} 28%, transparent)`,
  } as CSSProperties

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
            badge="what.you.get"
            title={<>project.<span className="function">deliverables</span>()</>}
            comment="// what you receive at the end of an engagement"
          />
        </RevealSection>

        <RevealSection as="ul" stagger className="mt-14 grid list-none sm:grid-cols-2 gap-4">
          {serviceDeliverables.map((item, i) => (
            <li
              key={item.title}
              style={tile}
              className="deliverable-card flex items-start gap-4 rounded-2xl border border-white/8 bg-white/2 p-5"
            >
              <span className="font-mono text-lg font-bold tabular-nums leading-none pt-1.5" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="icon-box flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                <item.Icon size={20} style={{ color }} aria-hidden />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-blue-100/60 leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
