import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { CountUp } from "@/components/ui/CountUp"
import { SITE_STATS } from "@/lib/site-stats"

// Portfolio carries the work cut (what we shipped). Company numbers live on About.
// One balanced stat bar; the featured metric carries the only aurora gradient on screen
// (Reserved Aurora Rule), the rest stay solid so it reads as proof, not a generic strip.
const stats: { value: string; label: string; featured?: boolean }[] = [
  { value: SITE_STATS.usersReached, label: "users reached", featured: true },
  { value: SITE_STATS.projectsDelivered, label: "projects shipped" },
  { value: SITE_STATS.avgConversionLift, label: "conversion lift" },
  { value: SITE_STATS.clientRetention, label: "client retention" },
]

export function PortfolioResultsSection() {
  return (
    <section id="portfolio-results" className="section-y relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="impact.json"
            title={<>the.<span className="function">numbers</span>()</>}
            comment="// outcomes across the work above"
          />
        </RevealSection>

        <RevealSection className="mt-14 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-y-10 text-center sm:flex sm:items-center sm:justify-between sm:gap-0 sm:divide-x sm:divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="sm:flex-1 sm:px-6">
                <CountUp
                  value={s.value}
                  className={`block font-bold font-mono tabular-nums leading-none ${
                    s.featured ? "text-4xl md:text-5xl text-aurora-sweep" : "text-3xl md:text-4xl text-white"
                  }`}
                />
                <p className="mt-2 text-xs font-mono text-blue-100/55">{s.label}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
