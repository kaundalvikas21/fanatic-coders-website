import { RevealSection } from "@/components/ui/RevealSection"
import { CountUp } from "@/components/ui/CountUp"
import { SITE_STATS } from "@/lib/site-stats"

// About carries the company cut (who we are). Project/impact numbers live on Portfolio.
const stats: { value: string; label: string }[] = [
  { value: SITE_STATS.yearsShipping, label: "years_shipping" },
  { value: SITE_STATS.teamMembers, label: "team_members" },
  { value: SITE_STATS.clientRetention, label: "client_retention" },
]

export function AboutStatsSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="scroll-mt-28 section-y relative overflow-hidden"
      style={{ background: "var(--dark-1)" }}
    >
      <div className="relative z-10 container mx-auto px-4">
        <h2 id="impact-heading" className="sr-only">
          fanaticCoders by the numbers
        </h2>

        {/* Borderless divided row, not a card grid: thin rules separate the figures,
            dark space carries the rest. dl/dt/dd ties each label to its number. */}
        <RevealSection
          as="dl"
          stagger
          className="mx-auto flex max-w-4xl flex-col divide-y divide-white/10 sm:flex-row sm:divide-x sm:divide-y-0"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-1 flex-col-reverse items-center gap-2 px-6 py-6 text-center sm:py-3"
            >
              <dt className="font-mono text-xs tracking-wider text-[var(--color-text-muted)]">{stat.label}</dt>
              <dd className="font-mono text-4xl font-bold tabular-nums text-[var(--aurora-violet-light)] md:text-5xl lg:text-6xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
