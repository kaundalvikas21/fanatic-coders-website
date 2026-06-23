import { MessageSquare, Phone, FileText, Rocket } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

type Accent = "violet" | "cyan" | "blue" | "green"

interface Step {
  n: string
  title: string
  description: string
  Icon: ElementType
  accent: Accent
}

// Each step carries its own aurora accent so the four cards read as a sequence, not one
// card copied four times.
const steps: Step[] = [
  { n: "01", title: "You send a message", description: "Share as much or as little as you have: a spec, a sketch, or just the problem.", Icon: MessageSquare, accent: "violet" },
  { n: "02", title: "Discovery call", description: "A free 30-minute call to understand goals, scope, timeline, and budget.", Icon: Phone, accent: "cyan" },
  { n: "03", title: "Clear proposal", description: "We follow up with a written plan: scope, milestones, and transparent pricing.", Icon: FileText, accent: "blue" },
  { n: "04", title: "Kickoff", description: "Agree the plan and we start shipping, with demos from the very first week.", Icon: Rocket, accent: "green" },
]

const ACCENT_VAR: Record<Accent, string> = {
  violet: "--aurora-violet-light",
  cyan: "--aurora-cyan-light",
  blue: "--aurora-blue-light",
  green: "--aurora-green-light",
}

// GlassCard glow tints (no blue glass variant; blue step uses the neutral glass glow).
const GLASS_ACCENT: Record<Accent, "violet" | "cyan" | "green" | "plain"> = {
  violet: "violet",
  cyan: "cyan",
  blue: "plain",
  green: "green",
}

export function ContactProcessSection() {
  return (
    <section id="contact-process" className="section-y relative overflow-hidden">
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
            <GlassCard
              key={step.n}
              accent={GLASS_ACCENT[step.accent]}
              lift
              className="group p-7"
              // Static step cards: drop the backdrop blur (4 stacked blur surfaces in one
              // viewport cost GPU paint on scroll). Border + aurora glow tint stay.
              style={{ backdropFilter: "none", WebkitBackdropFilter: "none" }}
            >
              <div className="flex items-center justify-between">
                <span className="process-num text-4xl font-bold font-mono tabular-nums">{step.n}</span>
                <step.Icon size={22} aria-hidden style={{ color: `var(${ACCENT_VAR[step.accent]})` }} />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">{step.description}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
