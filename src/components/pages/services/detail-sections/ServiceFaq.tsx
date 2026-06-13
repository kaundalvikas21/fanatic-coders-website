import { RevealSection } from "@/components/ui/RevealSection"
import { FaqAccordion } from "@/components/ui/FaqAccordion"
import type { ServiceItem } from "../data"

export function ServiceFaq({ service }: { service: ServiceItem }) {
  if (!service.faqs || service.faqs.length === 0) return null
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ background: "var(--dark-1)" }}>
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            before.<span className="text-indigo-400">youAsk</span>()
          </h2>
          <p className="mt-4 text-base text-blue-100/60 leading-relaxed">
            The questions we hear most about {service.title.toLowerCase()}.
          </p>
        </RevealSection>
        <RevealSection className="mt-10">
          <FaqAccordion items={service.faqs} />
        </RevealSection>
      </div>
    </section>
  )
}
