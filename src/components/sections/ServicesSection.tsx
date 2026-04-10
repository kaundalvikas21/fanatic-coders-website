"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Layers, LayoutGrid, ShoppingCart, TrendingUp, BarChart2, Code2, ArrowRight } from "lucide-react"
import type { ElementType } from "react"

type AccentKey = "violet" | "blue" | "cyan" | "green"

interface CodeLine { kw: string; rest: string; kwColor: string; val: string; valColor: string }

interface Service {
  id: string
  title: string
  description: string
  Icon: ElementType
  features: string[]
  accent: AccentKey
  size: "featured" | "normal"
  codeSnippet?: CodeLine[]
}

const accentMap: Record<AccentKey, { border: string; icon: string; glow: string; tag: string }> = {
  violet: { border: "rgba(124,58,237,0.22)", icon: "rgba(124,58,237,0.10)", glow: "0 0 18px rgba(124,58,237,0.09), inset 0 1px 0 rgba(255,255,255,0.05)", tag: "rgba(124,58,237,0.08)" },
  blue:   { border: "rgba(37,99,235,0.22)",  icon: "rgba(37,99,235,0.10)",  glow: "0 0 18px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",  tag: "rgba(37,99,235,0.08)"  },
  cyan:   { border: "rgba(6,182,212,0.22)",  icon: "rgba(6,182,212,0.10)",  glow: "0 0 18px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",  tag: "rgba(6,182,212,0.08)"  },
  green:  { border: "rgba(16,185,129,0.22)", icon: "rgba(16,185,129,0.10)", glow: "0 0 18px rgba(16,185,129,0.09), inset 0 1px 0 rgba(255,255,255,0.05)", tag: "rgba(16,185,129,0.08)" },
}
const iconColorMap: Record<AccentKey, string> = {
  violet: "#a855f7", blue: "#60a5fa", cyan: "#22d3ee", green: "#34d399",
}

const services: Service[] = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "End-to-end solutions from frontend to backend. We architect, build, and deploy complete digital products using modern tech stacks.",
    Icon: Layers,
    features: ["Frontend", "Backend", "APIs", "Cloud"],
    accent: "violet",
    size: "featured",
    codeSnippet: [
      { kw: "const", rest: " stack = {",    kwColor: "#a855f7", val: "",          valColor: ""       },
      { kw: "",      rest: "  frontend:",   kwColor: "",        val: " 'React'",   valColor: "#34d399" },
      { kw: "",      rest: "  backend:",    kwColor: "",        val: " 'Node.js'", valColor: "#60a5fa" },
      { kw: "",      rest: "  deploy:",     kwColor: "",        val: " 'Cloud'",   valColor: "#f97316" },
      { kw: "",      rest: "};",            kwColor: "",        val: "",           valColor: ""        },
    ],
  },
  { id: "web-design",       title: "Web Design & Development",    description: "Modern, responsive websites that perform beautifully on every device.", Icon: LayoutGrid,   features: ["UI Design","Responsive","Performance","SEO"],              accent: "blue",   size: "normal" },
  { id: "ecommerce",        title: "E-Commerce",                  description: "Custom stores built to convert — from product listing to checkout.",   Icon: ShoppingCart, features: ["Custom Stores","Payments","Inventory","Analytics"],         accent: "cyan",   size: "normal" },
  { id: "digital-branding", title: "Digital Branding & Marketing",description: "Data-driven brand strategy and campaigns that connect and convert.",    Icon: TrendingUp,   features: ["Brand Strategy","Social Media","Content","Analytics"],      accent: "green",  size: "normal" },
  { id: "seo-ppc",          title: "SEO & PPC",                   description: "Organic and paid strategies that drive the right traffic to your site.",Icon: BarChart2,    features: ["Technical SEO","Content SEO","Ad Campaigns","Analytics"],  accent: "violet", size: "normal" },
  { id: "open-source",      title: "Open Source",                 description: "Leverage open-source power with custom plugins, integrations, and security.", Icon: Code2,   features: ["Custom Plugins","API Integration","Performance","Security"], accent: "blue",   size: "normal" },
]

export default function ServicesSection() {
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
    <section ref={sectionRef} className="services-section py-24 relative overflow-hidden section-bg" id="services">
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-40"
        style={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)" }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-14 reveal ${v}`}>
          <div className="preheading-code">services.module.ts</div>
          <h2 className="heading-code mt-2">
            export class <span style={{ color: "#a855f7" }}>DigitalServices</span>
          </h2>
          <p className="subheading-code mt-3">{"// Transforming ideas into digital reality"}</p>
        </div>

        {/* Bento grid */}
        <div className="services-bento max-w-7xl mx-auto">
          {services.map((service, i) => {
            const accent    = accentMap[service.accent]
            const iconColor = iconColorMap[service.accent]
            return (
              <div
                key={service.id}
                className={`bento-card rounded-2xl reveal ${v}${service.size === "featured" ? " card-featured" : ""}`}
                style={{
                  "--accent-border": accent.border,
                  "--accent-icon":   accent.icon,
                  "--accent-glow":   accent.glow,
                  "--accent-tag":    accent.tag,
                  "--icon-color":    iconColor,
                  transitionDelay:   `${i * 55}ms`,
                } as React.CSSProperties}
              >
                {service.size === "featured" ? (
                  /* Featured: horizontal split */
                  <div className="featured-inner">
                    <div className="featured-content">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="icon-box w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0">
                          <service.Icon size={20} style={{ color: iconColor }} aria-hidden />
                        </div>
                        <span
                          className="featured-badge text-[11px] font-mono px-2.5 py-1 rounded-full"
                          style={{ color: iconColor, borderColor: accent.border, background: accent.tag, border: `1px solid ${accent.border}` }}
                        >
                          featured
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2.5 leading-tight">{service.title}</h3>
                      <p className="text-blue-100/60 text-sm leading-relaxed mb-5">{service.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.features.map(f => (
                          <span
                            key={f}
                            className="feature-tag text-xs px-3 py-1 rounded-full font-mono"
                            style={{ color: iconColor }}
                          >{f}</span>
                        ))}
                      </div>
                      <Link
                        href={`/services/${service.id}`}
                        className="view-link text-sm font-semibold inline-flex items-center gap-2 no-underline"
                        style={{ color: iconColor }}
                      >
                        viewDetails <ArrowRight size={14} aria-hidden />
                      </Link>
                    </div>

                    {/* Code decoration panel */}
                    <div className="featured-code-panel" aria-hidden="true">
                      <div className="code-window">
                        <div className="code-titlebar">
                          <span className="svc-dot svc-dot-r" />
                          <span className="svc-dot svc-dot-y" />
                          <span className="svc-dot svc-dot-g" />
                          <span className="code-filename ml-2 text-white/30 text-[10px] font-mono">stack.config.ts</span>
                        </div>
                        <div className="code-body font-mono text-xs leading-relaxed">
                          {service.codeSnippet?.map((line, li) => (
                            <div key={li}>
                              {line.kw && <span style={{ color: line.kwColor }}>{line.kw}</span>}
                              <span className="text-blue-100/45">{line.rest}</span>
                              {line.val && <><span style={{ color: line.valColor }}>{line.val}</span><span className="text-blue-100/35">,</span></>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Normal card: stacked */
                  <div className="normal-inner">
                    <div className="icon-box w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                      <service.Icon size={18} style={{ color: iconColor }} aria-hidden />
                    </div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-white mb-2 leading-snug">{service.title}</h3>
                    <p className="text-blue-100/55 text-xs leading-relaxed mb-4 flex-1">{service.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.map(f => (
                        <span
                          key={f}
                          className="feature-tag text-[11px] px-2.5 py-0.5 rounded-full font-mono"
                          style={{ color: iconColor }}
                        >{f}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
