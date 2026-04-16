"use client"

import { useEffect, useRef, useState } from "react"

const faqs = [
  {
    q: "What services does Fanatic Coders offer?",
    a: "We offer full-stack web development, UI/UX design, e-commerce solutions, digital branding, SEO & PPC, and ongoing maintenance & support. From concept to launch, we cover the entire digital product lifecycle.",
  },
  {
    q: "How long does a typical project take from start to launch?",
    a: "Timelines vary by scope. A landing page or MVP typically takes 2–4 weeks. A full web application or e-commerce platform is usually 6–12 weeks. We provide a detailed timeline during the discovery phase.",
  },
  {
    q: "Do you work with startups and early-stage teams?",
    a: "Absolutely. We love working with early-stage founders. We're comfortable with ambiguity, fast pivots, and shipping iteratively. Whether you have a polished spec or just an idea, we can help you move forward.",
  },
  {
    q: "What does your development process look like?",
    a: "We follow a structured process: Discovery → Design → Development → QA → Launch → Support. You'll have visibility at every stage with regular check-ins, staging previews, and a clear communication channel throughout.",
  },
  {
    q: "Do you provide ongoing support and maintenance after launch?",
    a: "Yes. We offer retainer-based support plans covering performance monitoring, security updates, content changes, and feature additions. We're a long-term partner, not just a one-time vendor.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our core stack includes React, Next.js, Svelte, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. We choose the best fit for your project rather than forcing a one-size-fits-all approach.",
  },
  {
    q: "How do I get started working with you?",
    a: "Simply reach out through our contact form or email. We'll schedule a free 30-minute discovery call to understand your goals, discuss timelines and budgets, and see if we're a good fit for each other.",
  },
]

type Phase = "idle" | "exiting" | "entering"

export default function FAQSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const [visible, setVisible]           = useState(false)
  const [activeIndex, setActiveIndex]   = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [phase, setPhase]               = useState<Phase>("idle")

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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

  const v = visible ? "visible" : ""

  return (
    <section ref={sectionRef} className="faq-section py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className={`text-center mb-16 reveal ${v}`}>
          <div className="preheading-code">faq.support</div>
          <h2 className="heading-code mt-2">
            Got Questions?{" "}
            <span style={{ color: "#a855f7" }}>Find Answers Here</span>
          </h2>
          <p className="subheading-code mt-3">
            {"// Everything you need to know before we start building together"}
          </p>
        </div>

        {/* Two-column layout */}
        <div className={`faq-layout reveal ${v}`} style={{ transitionDelay: "180ms" }}>

          {/* Left: Question list */}
          <div className="question-list" role="tablist" aria-label="FAQ questions">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item${activeIndex === i ? " active" : ""}`}
              >
                <button
                  type="button"
                  className={`faq-row${activeIndex === i ? " active" : ""}`}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-controls="faq-panel"
                  id={`faq-tab-${i}`}
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

                {/* Mobile-only inline accordion */}
                <div className={`mobile-answer${activeIndex === i ? " open" : ""}`}>
                  <div className="mobile-answer-inner">
                    <p className="mobile-answer-text">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Animated answer panel (desktop only) */}
          <div
            id="faq-panel"
            className={`answer-panel glass-card-md${phase === "exiting" ? " is-exiting" : ""}${phase === "entering" ? " is-entering" : ""}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${activeIndex}`}
          >
            <p className="answer-question">{faqs[displayIndex].q}</p>
            <p className="answer-text">{faqs[displayIndex].a}</p>
          </div>

        </div>
      </div>
    </section>
  )
}
