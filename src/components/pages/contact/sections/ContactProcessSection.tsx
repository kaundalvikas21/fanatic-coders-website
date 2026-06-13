import { MessageSquare, Phone, FileText, Rocket } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

interface Step {
  n: string
  title: string
  description: string
  Icon: ElementType
}

const steps: Step[] = [
  { n: "01", title: "You send a message", description: "Share as much or as little as you have: a spec, a sketch, or just the problem.", Icon: MessageSquare },
  { n: "02", title: "Discovery call", description: "A free 30-minute call to understand goals, scope, timeline, and budget.", Icon: Phone },
  { n: "03", title: "Clear proposal", description: "We follow up with a written plan: scope, milestones, and transparent pricing.", Icon: FileText },
  { n: "04", title: "Kickoff", description: "Agree the plan and we start shipping, with demos from the very first week.", Icon: Rocket },
]

export function ContactProcessSection() {
  return (
    <section id="contact-process" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-3)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="next.steps"
            title={<>what.<span className="function">happensNext</span>()</>}
            comment="// from first message to kickoff"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {steps.map((step) => (
            <GlassCard key={step.n} lift className="group p-7">
              <div className="flex items-center justify-between">
                <span className="process-num text-4xl font-bold font-mono tabular-nums">{step.n}</span>
                <step.Icon size={22} className="text-indigo-300 transition-colors group-hover:text-indigo-200" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.description}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
