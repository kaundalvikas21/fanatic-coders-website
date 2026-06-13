"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"

const faqs: { q: string; a: string }[] = [
  { q: "How soon will I hear back?", a: "Within one business day. A senior team member, not a bot, reads every message and replies personally." },
  { q: "What happens after I send a message?", a: "We schedule a free 30-minute discovery call to understand your goals, scope, and timeline, then follow up with a clear proposal." },
  { q: "Do I need a finished spec?", a: "No. A rough idea is enough to start. We're comfortable shaping scope with you from a blank page." },
  { q: "What does a project typically cost?", a: "It depends on scope, but the budget selector gives us a starting point. We're transparent about pricing before any work begins." },
]

export function ContactFaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="contact-faq" className="py-24 relative overflow-hidden" style={{ background: "var(--dark-1)" }}>
      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <RevealSection>
          <SectionHeading
            badge="faq.contact"
            title={<>before.<span className="function">youAsk</span>()</>}
            comment="// the questions we hear most"
          />
        </RevealSection>

        <RevealSection className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="glass-card rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-indigo-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-blue-100/65 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </RevealSection>
      </div>
    </section>
  )
}
