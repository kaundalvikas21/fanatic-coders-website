import { Gauge, ShieldCheck, Sparkles, Users2, GitBranch, HeartHandshake } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

type Accent = "violet" | "cyan" | "green"

interface Value {
  id: string
  title: string
  description: string
  Icon: ElementType
  accent: Accent
}

const iconColor: Record<Accent, string> = { violet: "#a855f7", cyan: "#22d3ee", green: "#34d399" }

const values: Value[] = [
  { id: "craft", title: "Craft over shortcuts", description: "We sweat the details others skip: clean architecture, real tests, and interfaces that feel right.", Icon: Sparkles, accent: "violet" },
  { id: "speed", title: "Momentum every week", description: "Tight loops and weekly demos keep work visible and decisions fast. No black boxes.", Icon: Gauge, accent: "cyan" },
  { id: "ownership", title: "We own outcomes", description: "Performance, accessibility, and uptime are ours to defend, not someone else's ticket.", Icon: ShieldCheck, accent: "green" },
  { id: "partnership", title: "True partnership", description: "One senior team, one point of contact, fully embedded in your goals and trade-offs.", Icon: HeartHandshake, accent: "violet" },
  { id: "transparency", title: "Radical transparency", description: "Open roadmaps, honest estimates, and pricing you can predict before we start.", Icon: GitBranch, accent: "cyan" },
  { id: "people", title: "People first", description: "Great products come from healthy teams. We hire well, mentor hard, and stay kind.", Icon: Users2, accent: "green" },
]

export function AboutValuesSection() {
  return (
    <section id="values" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-2)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="values.config"
            title={<>how.<span className="function">weWork</span>()</>}
            comment="// the principles behind every engagement"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {values.map((value) => (
            <GlassCard key={value.id} accent={value.accent} lift className="p-7">
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <value.Icon size={22} style={{ color: iconColor[value.accent] }} aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed">{value.description}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
