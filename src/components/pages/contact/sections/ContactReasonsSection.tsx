import { UserCheck, Zap, Receipt, ShieldCheck } from "lucide-react"
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
  { id: "senior", title: "Talk to senior people", description: "No SDR scripts. You speak with someone who'll actually shape and build your project.", Icon: UserCheck },
  { id: "fast", title: "Fast, real replies", description: "Within one business day, with concrete next steps, not a generic auto-response.", Icon: Zap },
  { id: "pricing", title: "Clear on cost early", description: "We surface ballpark budgets and scope up front so there are no surprises later.", Icon: Receipt },
  { id: "honest", title: "Honest about fit", description: "If we're not the right team for your project, we'll tell you and point you somewhere good.", Icon: ShieldCheck },
]

export function ContactReasonsSection() {
  return (
    <section id="contact-reasons" className="section-y relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="why.reachOut"
            title={<>why.<span className="function">talkToUs</span>()</>}
            comment="// what to expect when you get in touch"
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
