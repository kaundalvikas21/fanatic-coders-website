"use client"

import { useEffect, useRef, useState } from "react"
import { LayoutGrid, Lightbulb, TrendingUp } from "lucide-react"
import type { ElementType } from "react"

interface CodeLine {
  keyword: string
  text: string
  color: string
  value?: string
}

interface CoreValue {
  id: string
  label: string
  title: string
  Icon: ElementType
  gradient: string
  borderColor: string
  glowColor: string
  tagColor: string
  iconColor: string
  description: string
  code: CodeLine[]
}

const values: CoreValue[] = [
  {
    id: "build",
    label: "build()",
    title: "Build",
    Icon: LayoutGrid,
    gradient: "from-[#f97316] to-[#ec4899]",
    borderColor: "rgba(249,115,22,0.3)",
    glowColor: "rgba(249,115,22,0.07)",
    tagColor: "rgba(249,115,22,0.12)",
    iconColor: "#fb923c",
    description:
      "With a dedicated team, we build exceptional projects focusing on quality, transparency, efficiency, and innovation to ensure complete client satisfaction.",
    code: [
      { keyword: "const", text: " approach = {",  color: "#fb923c" },
      { keyword: "",      text: "  quality: ",    color: "#a3e635", value: "'exceptional'" },
      { keyword: "",      text: "  focus: ",      color: "#60a5fa", value: "'innovation'" },
      { keyword: "",      text: "};",             color: "" },
    ],
  },
  {
    id: "maintain",
    label: "maintain()",
    title: "Maintain",
    Icon: Lightbulb,
    gradient: "from-[#7c3aed] to-[#a855f7]",
    borderColor: "rgba(124,58,237,0.35)",
    glowColor: "rgba(124,58,237,0.09)",
    tagColor: "rgba(124,58,237,0.12)",
    iconColor: "#a855f7",
    description:
      "We maintain websites and apps with commitment to quality, reliability, and proactive management — ensuring they run smoothly and meet ongoing client needs.",
    code: [
      { keyword: "function", text: " optimize() {", color: "#818cf8" },
      { keyword: "",         text: "  reliability: ", color: "#a3e635", value: "'99.9%'" },
      { keyword: "",         text: "  support: ",     color: "#60a5fa", value: "'24/7'" },
      { keyword: "",         text: "};",              color: "" },
    ],
  },
  {
    id: "grow",
    label: "grow()",
    title: "Grow",
    Icon: TrendingUp,
    gradient: "from-[#10b981] to-[#06b6d4]",
    borderColor: "rgba(16,185,129,0.3)",
    glowColor: "rgba(16,185,129,0.07)",
    tagColor: "rgba(16,185,129,0.12)",
    iconColor: "#34d399",
    description:
      "We help businesses grow by enhancing their digital presence, optimizing performance, and driving engagement and long-term success.",
    code: [
      { keyword: "async",  text: " function scale() {", color: "#34d399" },
      { keyword: "",       text: "  growth: ",          color: "#a3e635", value: "'exponential'" },
      { keyword: "",       text: "  success: ",         color: "#60a5fa", value: "'guaranteed'" },
      { keyword: "",       text: "};",                  color: "" },
    ],
  },
]

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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

  const v = visible ? "visible" : ""

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="values">
      {/* Aurora section background */}
      <div className="absolute inset-0" style={{ background: "var(--dark-3)" }} />
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${v}`}>
          <div className="preheading-code">core.values</div>
          <h2 className="heading-code mt-2">
            how.<span style={{ color: "#a855f7" }}>weWork</span>()
          </h2>
          <p className="subheading-code mt-3">{"// Our approach to delivering exceptional results"}</p>
        </div>

        {/* Asymmetric bento grid */}
        <div className="values-bento max-w-6xl mx-auto">
          {values.map((val, i) => (
            <div
              key={val.id}
              className={`value-card rounded-2xl p-8 reveal ${v}`}
              style={{
                "--accent-border": val.borderColor,
                "--accent-glow": `0 0 20px ${val.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                "--accent-tag": val.tagColor,
                "--icon-color": val.iconColor,
                transitionDelay: `${i * 100}ms`,
              } as React.CSSProperties}
            >
              {/* Dot grid texture */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Header row */}
              <div className="relative flex items-start justify-between mb-6">
                <div
                  className="icon-wrap w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: val.tagColor, border: `1px solid ${val.borderColor}` }}
                >
                  <val.Icon size={24} style={{ color: val.iconColor }} aria-hidden />
                </div>
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    background: val.tagColor,
                    border: `1px solid ${val.borderColor}`,
                    color: val.iconColor,
                  }}
                >
                  {val.label}
                </span>
              </div>

              {/* Title */}
              <h3
                className="relative text-lg sm:text-xl md:text-2xl font-bold mb-3"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${val.iconColor}, white 80%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {val.title}
              </h3>

              {/* Description */}
              <p className="relative text-blue-100/65 text-sm leading-relaxed mb-6">
                {val.description}
              </p>

              {/* Code decoration */}
              <div className="relative font-mono text-xs space-y-1 text-blue-100/35">
                {val.code.map((line, li) => {
                  if (line.keyword) {
                    return (
                      <div key={li}>
                        <span style={{ color: val.iconColor }}>{line.keyword}</span>
                        <span>{line.text}</span>
                      </div>
                    )
                  }
                  if (line.value) {
                    return (
                      <div key={li} className="pl-4">
                        <span style={{ color: line.color }}>{line.text}</span>
                        <span style={{ color: "#a3e635" }}>{line.value}</span>
                        <span>,</span>
                      </div>
                    )
                  }
                  return <div key={li}><span>{line.text}</span></div>
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
