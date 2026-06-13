import { Search, PenTool, Code2, Rocket } from "lucide-react"
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
  { n: "01", title: "Discover", description: "We dig into goals, users, and constraints, then turn them into a sharp, prioritized scope.", Icon: Search },
  { n: "02", title: "Design", description: "Flows, wireframes, and a polished UI in your design system, validated before we build.", Icon: PenTool },
  { n: "03", title: "Build", description: "Senior engineers ship in weekly increments with demos, tests, and CI from day one.", Icon: Code2 },
  { n: "04", title: "Launch & iterate", description: "We deploy, measure, and refine, and stay on as partners well past go-live.", Icon: Rocket },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="process.flow"
            title={<>how.<span className="function">weShip</span>()</>}
            comment="// a predictable path from idea to launch"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {steps.map((step) => (
            <GlassCard key={step.n} lift className="group p-7">
              <div className="flex items-center justify-between">
                <span className="process-num text-4xl font-bold font-mono tabular-nums">{step.n}</span>
                <step.Icon size={22} className="text-indigo-300 transition-colors group-hover:text-indigo-200" aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.description}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
