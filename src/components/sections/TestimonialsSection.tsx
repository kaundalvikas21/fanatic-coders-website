"use client"

import { useEffect, useRef, useState, startTransition } from "react"
import Image from "next/image"
import { Building2, Play, Pause } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO, TechVision Inc.",
    company: "TechVision",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    quote:
      "Their expertise in modern web technologies transformed our digital presence. The team's attention to detail and innovative solutions exceeded our expectations.",
    tags: ["Web Development", "UI/UX", "Performance"],
    metrics: { improvement: "+150%", metric: "Performance" },
    accentColor: "#7c3aed",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Founder, EcoTech",
    company: "EcoTech Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    quote:
      "Working with them was a game-changer for our e-commerce platform. The results were immediate: faster load times, better conversion rates, and happier customers.",
    tags: ["E-commerce", "Optimization", "SEO"],
    metrics: { improvement: "+85%", metric: "Conversion" },
    accentColor: "#06b6d4",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Product Lead, HealthTech",
    company: "HealthTech Global",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    quote:
      "Their team brought our healthcare application to life with cutting-edge technology while maintaining strict security standards. Truly exceptional work!",
    tags: ["Healthcare", "Security", "Mobile Apps"],
    metrics: { improvement: "100%", metric: "Security" },
    accentColor: "#10b981",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CEO, FinanceFlow",
    company: "FinanceFlow",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop",
    quote:
      "The team's deep understanding of fintech requirements and ability to deliver secure, scalable solutions made them the perfect partner for our project.",
    tags: ["Fintech", "Security", "Cloud"],
    metrics: { improvement: "10x", metric: "Scalability" },
    accentColor: "#a855f7",
  },
]

export default function TestimonialsSection() {
  const sectionRef          = useRef<HTMLElement>(null)
  const intervalRef         = useRef<ReturnType<typeof setInterval> | null>(null)
  const [visible, setVisible]             = useState(false)
  const [activeIndex, setActiveIndex]     = useState(0)
  const [isPaused, setIsPaused]           = useState(false)

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

  // Auto-advance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) { startTransition(() => setIsPaused(true)); return }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex(i => (i + 1) % testimonials.length)
      }, 5000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPaused])

  function toggleAutoplay() {
    setIsPaused(p => !p)
  }

  const t = testimonials[activeIndex]
  const v = visible ? "visible" : ""

  return (
    <section ref={sectionRef} className="testimonials-section py-24 relative overflow-hidden" id="testimonials">
      {/* Aurora parallax background */}
      <div className="aurora-parallax absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%)" }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${v}`}>
          <div className="preheading-code">reviews.module.ts</div>
          <h2 className="heading-code mt-2">
            client.<span style={{ color: "#a855f7" }}>testimonials</span>()
          </h2>
          <p className="subheading-code mt-3">{"// Real stories from our valued clients"}</p>

          {/* Pause/play button */}
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all duration-200"
            style={{
              borderColor: "rgba(124,58,237,0.3)",
              background: "rgba(124,58,237,0.08)",
              color: "rgba(255,255,255,0.7)",
            }}
            onClick={toggleAutoplay}
            aria-pressed={isPaused}
          >
            {isPaused
              ? <><Play size={14} aria-hidden /> Resume testimonials</>
              : <><Pause size={14} aria-hidden /> Pause testimonials</>
            }
          </button>
        </div>

        {/* Carousel card */}
        <div className={`max-w-6xl mx-auto reveal ${v}`} style={{ transitionDelay: "100ms" }}>
          <div className="testimonial-card relative rounded-2xl p-8 md:p-12">

            {/* Code badge */}
            <div className="code-badge absolute -top-4 left-8 px-4 py-1.5 rounded-full text-xs font-mono">
              <span style={{ color: "#a855f7" }}>const</span>
              <span style={{ color: "#60a5fa" }}> success</span>
              <span className="text-white/70"> = reviews.map(</span>
              <span style={{ color: "#22d3ee" }}>client</span>
              <span className="text-white/70"> =&gt; client.story);</span>
            </div>

            {/* Slide content */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left: Client + Quote */}
              <div className="space-y-8">
                {/* Client info */}
                <div className="flex items-center gap-6">
                  {/* Aurora ring avatar */}
                  <div className="aurora-ring-wrap flex-shrink-0" style={{ "--avatar-accent": t.accentColor } as React.CSSProperties}>
                    <div className="aurora-ring-avatar">
                      <Image
                        src={t.image}
                        alt={t.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">{t.name}</h3>
                    <p className="text-blue-100/60 text-sm mb-2">{t.role}</p>
                    <span
                      className="company-badge inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full"
                      style={{
                        color: t.accentColor,
                        borderColor: `${t.accentColor}40`,
                        background: `${t.accentColor}12`,
                        border: `1px solid ${t.accentColor}40`,
                      }}
                    >
                      <Building2 size={12} aria-hidden />
                      {t.company}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div
                    className="absolute -left-2 -top-4 text-7xl font-serif leading-none select-none pointer-events-none"
                    style={{ color: `${t.accentColor}18` }}
                    aria-hidden
                  >&quot;</div>
                  <blockquote
                    className="text-sm sm:text-base md:text-lg text-blue-100/85 leading-relaxed pl-6 border-l-2"
                    style={{ borderColor: `${t.accentColor}40` }}
                  >
                    {t.quote}
                  </blockquote>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {t.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs py-1 px-3 rounded-full font-mono"
                      style={{
                        background: `${t.accentColor}12`,
                        border: `1px solid ${t.accentColor}30`,
                        color: t.accentColor,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Metrics */}
              <div className="relative pt-6">
                <div className="absolute -top-1 left-0 font-mono text-sm text-blue-100/40">
                  <span style={{ color: "#f472b6" }}>function</span>
                  <span style={{ color: "#818cf8" }}> calculateSuccess</span>
                  <span>() {"{"}</span>
                </div>
                <div
                  className="metrics-card rounded-xl p-8 text-center"
                  style={{
                    background: `${t.accentColor}0a`,
                    border: `1px solid ${t.accentColor}22`,
                    boxShadow: `0 0 16px ${t.accentColor}0d`,
                  }}
                >
                  <div
                    className="text-4xl lg:text-6xl font-bold mb-3"
                    style={{
                      backgroundImage: `linear-gradient(135deg, #fff, ${t.accentColor})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {t.metrics.improvement}
                  </div>
                  <div className="text-blue-100/60">{t.metrics.metric} Improvement</div>
                  <div className="mt-6 font-mono text-xs space-y-1 text-blue-100/35 text-left">
                    <div>return {"{"}</div>
                    <div className="pl-3">success: <span style={{ color: t.accentColor }}>true</span>,</div>
                    <div className="pl-3">impact: <span style={{ color: "#34d399" }}>&apos;significant&apos;</span></div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex justify-center items-center gap-4 mt-12" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-selected={activeIndex === i}
                  role="tab"
                  onClick={() => setActiveIndex(i)}
                >
                  <span
                    className="absolute h-1 w-5 rounded-full"
                    style={{ background: "rgba(124,58,237,0.2)" }}
                  />
                  <span
                    className="absolute h-1 w-5 rounded-full transition-transform duration-300"
                    style={{
                      background: "#7c3aed",
                      transform: `scaleX(${activeIndex === i ? 1 : 0})`,
                      transformOrigin: "left",
                    }}
                  />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
