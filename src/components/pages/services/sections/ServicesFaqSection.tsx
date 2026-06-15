"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { RevealSection } from "@/components/ui/RevealSection"

const faqs: { q: string; a: string }[] = [
  { q: "How long does a typical project take?", a: "Most projects run 6 to 12 weeks. We scope it in the first week so you get a real timeline, not a guess." },
  { q: "How do you price work?", a: "Fixed quote for a fixed scope, or a monthly rate for ongoing work. You see the number before we start." },
  { q: "Can you work with our existing team?", a: "Yes. We embed with your engineers, match your tools and process, and hand over clean docs." },
  { q: "What happens after launch?", a: "We stay on with monitoring, fixes, and new work. You are not left alone at go-live." },
  { q: "Which technologies do you use?", a: "Next.js, React, TypeScript, Node, and Postgres for most builds. We pick what fits the project." },
]

type Phase = "idle" | "exiting" | "entering"

export function ServicesFaqSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")

  function selectFaq(i: number) {
    if (i === activeIndex || phase !== "idle") return
    setActiveIndex(i)
    setPhase("exiting")
    setTimeout(() => {
      setDisplayIndex(i)
      setPhase("entering")
      setTimeout(() => setPhase("idle"), 420)
    }, 180)
  }

  return (
    <section id="services-faq" className="faq-section py-24 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="faq.json"
            title={<>common.<span className="function">questions</span>()</>}
            comment="// the things teams ask us before we start"
          />
        </RevealSection>

        <RevealSection className="faq-layout mt-12">
          <div className="question-list" role="tablist" aria-label="FAQ questions">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${activeIndex === i ? " active" : ""}`}>
                <button
                  type="button"
                  className={`faq-row${activeIndex === i ? " active" : ""}`}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls="services-faq-panel"
                  id={`services-faq-tab-${i}`}
                  onClick={() => selectFaq(i)}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <svg
                    className={`row-arrow${activeIndex === i ? " active" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <div className={`mobile-answer${activeIndex === i ? " open" : ""}`}>
                  <div className="mobile-answer-inner">
                    <p className="mobile-answer-text">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            id="services-faq-panel"
            className={`answer-panel glass-card-md${phase === "exiting" ? " is-exiting" : ""}${phase === "entering" ? " is-entering" : ""}`}
            role="tabpanel"
            aria-labelledby={`services-faq-tab-${activeIndex}`}
          >
            <p className="answer-question">{faqs[displayIndex].q}</p>
            <p className="answer-text">{faqs[displayIndex].a}</p>
          </div>
        </RevealSection>
      </div>
    </section>
  )
}
