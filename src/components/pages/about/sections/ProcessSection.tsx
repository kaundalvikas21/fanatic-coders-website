import { Search, PenTool, Code2, Rocket } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
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
    <section id="process" className="scroll-mt-28 py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="process.flow"
            title={<>how.<span className="function">weShip</span>()</>}
            comment="// a predictable path from idea to launch"
          />
        </RevealSection>

        {/* Connected stepper, not a card grid: numbered nodes on a connector line (desktop)
            that stack into an ordered list on smaller screens. */}
        <div className="relative mx-auto mt-14 max-w-6xl">
          <span
            aria-hidden
            className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-6 h-px bg-white/10"
          />
          <RevealSection
            as="ol"
            stagger
            className="grid list-none gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step) => (
              <li key={step.n} className="group relative flex flex-col items-center text-center">
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--dark-2)] ring-1 ring-white/10 transition-shadow duration-300 group-hover:ring-white/20 group-hover:shadow-[0_0_22px_-4px_var(--aurora-cyan-light)]">
                  <span className="process-num text-3xl font-bold font-mono tabular-nums">{step.n}</span>
                </span>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <step.Icon size={18} className="shrink-0 text-[var(--aurora-cyan-light)]" aria-hidden />
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                </div>
                <p className="mt-2 max-w-[28ch] text-sm text-blue-100/70 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </RevealSection>
        </div>
      </div>
    </section>
  )
}
