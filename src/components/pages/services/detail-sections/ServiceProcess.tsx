import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { GlassCard } from "@/components/ui/GlassCard"
import { serviceProcess } from "../data"

export function ServiceProcess() {
  return (
    <section className="relative overflow-hidden section-y" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="process.flow"
            title={<>how.we.<span className="function">build</span><span className="params">()</span></>}
            comment="// seven phases, from first call to long-term support"
          />
        </RevealSection>

        <RevealSection stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceProcess.map((step) => (
            <GlassCard key={step.n} lift className="group p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="process-num text-4xl font-bold font-mono tabular-nums">{step.n}</span>
                <span className="mt-1 text-xs font-mono text-blue-100/45">{step.duration}</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.desc}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
