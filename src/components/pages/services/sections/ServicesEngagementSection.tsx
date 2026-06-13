import { Package, Repeat, Users } from "lucide-react"
import type { ElementType } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GlassCard } from "@/components/ui/GlassCard"
import { RevealSection } from "@/components/ui/RevealSection"

type Accent = "violet" | "cyan" | "green"

interface Model {
  id: string
  name: string
  tagline: string
  description: string
  bestFor: string
  Icon: ElementType
  accent: Accent
}

const iconColor: Record<Accent, string> = { violet: "#a855f7", cyan: "#22d3ee", green: "#34d399" }

const models: Model[] = [
  { id: "fixed", name: "Fixed-scope project", tagline: "Defined scope, defined price", description: "A clear deliverable with milestones and a fixed quote. Best when the goal is well understood.", bestFor: "MVPs, redesigns, launches", Icon: Package, accent: "violet" },
  { id: "retainer", name: "Monthly retainer", tagline: "A dedicated team, every month", description: "Reserved senior capacity working continuously on your roadmap, billed monthly.", bestFor: "Ongoing product work", Icon: Repeat, accent: "cyan" },
  { id: "augment", name: "Team augmentation", tagline: "Embed with your team", description: "Our engineers and designers plug into your workflow and ship alongside your people.", bestFor: "Scaling an existing team", Icon: Users, accent: "green" },
]

export function ServicesEngagementSection() {
  return (
    <section id="engagement" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-3)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="engagement.models"
            title={<>how.<span className="function">weEngage</span>()</>}
            comment="// pick the shape that fits your team"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {models.map((model) => (
            <GlassCard key={model.id} accent={model.accent} lift className="p-7 flex flex-col">
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <model.Icon size={22} style={{ color: iconColor[model.accent] }} aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-white">{model.name}</h3>
              <p className="mt-1 text-xs font-mono" style={{ color: iconColor[model.accent] }}>{model.tagline}</p>
              <p className="mt-3 text-sm text-blue-100/60 leading-relaxed flex-1">{model.description}</p>
              <div className="mt-5 border-t border-white/5 pt-4">
                <div className="text-[11px] font-mono text-blue-100/45">best_for</div>
                <div className="text-sm text-white/85">{model.bestFor}</div>
              </div>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
