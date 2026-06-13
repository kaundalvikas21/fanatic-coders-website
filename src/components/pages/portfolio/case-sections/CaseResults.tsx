import type { PortfolioProject } from "@/types"
import { Stat } from "@/components/ui/Stat"
import { RevealSection } from "@/components/ui/RevealSection"

export function CaseResults({ project }: { project: PortfolioProject }) {
  if (!project.stats || project.stats.length === 0) return null
  return (
    <section className="relative overflow-hidden py-16 md:py-20" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-sm font-mono text-blue-100/50">{"// results at a glance"}</h2>
        </RevealSection>
        <RevealSection stagger className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {project.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
