"use client"

import { useEffect, useRef, useState } from "react"

type Phase = "idle" | "exiting" | "entering"

export interface FaqEntry {
  q: string
  a: string
}

/**
 * Two-column interactive FAQ: a question list on the left and an animated answer
 * panel on the right (with a mobile inline accordion). Shared by the home FAQ
 * section and the service detail FAQ so both stay visually identical.
 */
export function FaqInteractive({ items }: { items: FaqEntry[] }) {
  const layoutRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")

  useEffect(() => {
    const el = layoutRef.current
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

  if (items.length === 0) return null
  const v = visible ? "visible" : ""

  return (
    <div ref={layoutRef} className={`faq-layout reveal ${v}`}>
      {/* Left: question list */}
      <div className="question-list" role="tablist" aria-label="FAQ questions">
        {items.map((faq, i) => (
          <div key={i} className={`faq-item${activeIndex === i ? " active" : ""}`}>
            <button
              type="button"
              className={`faq-row${activeIndex === i ? " active" : ""}`}
              role="tab"
              aria-selected={activeIndex === i}
              aria-expanded={activeIndex === i}
              aria-controls={`faq-panel faq-mobile-${i}`}
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
            <div
              id={`faq-mobile-${i}`}
              role="region"
              aria-labelledby={`faq-tab-${i}`}
              aria-hidden={activeIndex !== i}
              className={`mobile-answer${activeIndex === i ? " open" : ""}`}
            >
              <div className="mobile-answer-inner">
                <p className="mobile-answer-text">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: animated answer panel (desktop only) */}
      <div
        id="faq-panel"
        className={`answer-panel glass-card-md${phase === "exiting" ? " is-exiting" : ""}${phase === "entering" ? " is-entering" : ""}`}
        role="tabpanel"
        aria-labelledby={`faq-tab-${activeIndex}`}
      >
        <p className="answer-question">{items[displayIndex].q}</p>
        <p className="answer-text">{items[displayIndex].a}</p>
      </div>
    </div>
  )
}
