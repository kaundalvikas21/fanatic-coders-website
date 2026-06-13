import { RevealSection } from "@/components/ui/RevealSection"
import { GlassCard } from "@/components/ui/GlassCard"
import { serviceProcess } from "../data"

export function ServiceProcess() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            how.<span className="text-indigo-400">weDeliver</span>()
          </h2>
          <p className="mt-4 text-base text-blue-100/60 leading-relaxed max-w-[55ch]">
            The same predictable path on every engagement, from first call to launch.
          </p>
        </RevealSection>
        <RevealSection stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceProcess.map((step) => (
            <GlassCard key={step.n} lift className="group p-7">
              <span className="process-num text-4xl font-bold font-mono tabular-nums">{step.n}</span>
              <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-blue-100/60 leading-relaxed">{step.desc}</p>
            </GlassCard>
          ))}
        </RevealSection>
      </div>
    </section>
  )
}
