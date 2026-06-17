import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"
import { FaqInteractive } from "@/components/ui/FaqInteractive"

const faqs: { q: string; a: string }[] = [
  { q: "How soon will I hear back?", a: "Within one business day. A senior team member, not a bot, reads every message and replies personally." },
  { q: "What happens after I send a message?", a: "We schedule a free 30-minute discovery call to understand your goals, scope, and timeline, then follow up with a clear proposal." },
  { q: "Do I need a finished spec?", a: "No. A rough idea is enough to start. We're comfortable shaping scope with you from a blank page." },
  { q: "What does a project typically cost?", a: "It depends on scope, but the budget selector gives us a starting point. We're transparent about pricing before any work begins." },
]

export function ContactFaqSection() {
  return (
    <section id="contact-faq" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="faq.contact"
            title={<>before.<span className="function">youAsk</span>()</>}
            comment="// the questions we hear most"
          />
        </RevealSection>

        <div className="mt-12">
          <FaqInteractive items={faqs} />
        </div>
      </div>
    </section>
  )
}
