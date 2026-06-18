import { FaqInteractive } from "@/components/ui/FaqInteractive"
import type { ServiceItem } from "../data"

export function ServiceFaq({ service }: { service: ServiceItem }) {
  if (!service.faqs || service.faqs.length === 0) return null

  return (
    <section className="faq-section section-y relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="preheading-code">faq.support</div>
          <h2 className="heading-code mt-2">
            before.<span className="function">youAsk</span>()
          </h2>
          <p className="subheading-code mt-3">
            {`// the questions we hear most about ${service.title.toLowerCase()}`}
          </p>
        </div>

        <FaqInteractive items={service.faqs} />
      </div>
    </section>
  )
}
