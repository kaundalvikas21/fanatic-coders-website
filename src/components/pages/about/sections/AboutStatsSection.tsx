import { RevealSection } from "@/components/ui/RevealSection"

const stats: { value: string; label: string }[] = [
  { value: "8+", label: "years_shipping" },
  { value: "120+", label: "projects_delivered" },
  { value: "40+", label: "team_members" },
  { value: "98%", label: "client_retention" },
]

export function AboutStatsSection() {
  return (
    <section id="impact" className="py-20 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="relative z-10 container mx-auto px-4">
        <RevealSection stagger className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold font-mono text-aurora-sweep tabular-nums">{stat.value}</div>
              <div className="mt-2 text-xs font-mono text-blue-100/55">{stat.label}</div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
