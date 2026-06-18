import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { SITE_STATS } from "@/lib/site-stats"

// Portfolio carries the work cut (what we shipped). Company numbers live on About.
const metrics: { value: string; label: string }[] = [
  { value: SITE_STATS.projectsDelivered, label: "projects_shipped" },
  { value: SITE_STATS.usersReached, label: "users_reached" },
  { value: SITE_STATS.avgConversionLift, label: "avg_conversion_lift" },
  { value: SITE_STATS.clientRetention, label: "client_retention" },
]

export function PortfolioResultsSection() {
  return (
    <section id="portfolio-results" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="impact.json"
            title={<>the.<span className="function">numbers</span>()</>}
            comment="// outcomes across the work above"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {metrics.map((metric) => (
            <div key={metric.label} className="glass-card rounded-2xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold font-mono text-aurora-sweep tabular-nums">{metric.value}</div>
              <div className="mt-2 text-xs font-mono text-blue-100/55">{metric.label}</div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
