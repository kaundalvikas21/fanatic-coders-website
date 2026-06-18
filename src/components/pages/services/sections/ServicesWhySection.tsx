import { UserCheck, Gauge, ShieldCheck, Receipt } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

interface Reason {
  id: string
  title: string
  description: string
  Icon: ElementType
}

const reasons: Reason[] = [
  { id: "senior", title: "Senior teams only", description: "The people who scope your project are the people who build it. No bait-and-switch.", Icon: UserCheck },
  { id: "speed", title: "Weekly shipping", description: "You see working software every week, with demos and staging links from day one.", Icon: Gauge },
  { id: "ownership", title: "We own outcomes", description: "Performance, accessibility, and uptime are part of the deal, not an upsell.", Icon: ShieldCheck },
  { id: "pricing", title: "Transparent pricing", description: "Clear scope and predictable cost agreed before a line of code is written.", Icon: Receipt },
]

export function ServicesWhySection() {
  return (
    <section id="why-us" className="section-y relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="why.fanaticCoders"
            title={<>why.<span className="function">chooseUs</span>()</>}
            comment="// what you get with every engagement"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <GlassCard key={reason.id} lift className="p-7">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/12">
                <reason.Icon size={22} className="text-indigo-300" aria-hidden />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed">{reason.description}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
