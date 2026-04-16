"use client"

import { useEffect, useRef } from "react"
import { Code2, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const tags = [
  "React", "Node.js", "TypeScript", "MongoDB", "WebSocket", "AWS",
  "Vue.js", "Laravel", "PostgreSQL", "ElasticSearch", "Docker",
  "Next.js", "GraphQL", "WebRTC", "Azure", "Python",
  "Angular", "TensorFlow", "IoT", "Kubernetes", "Svelte",
]

// Duplicate for seamless scroll
const allTags = [...tags, ...tags]

export default function ServiceCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    let scrollPos = 0
    let animId: number
    let totalWidth = 0

    // Measure after a tick to let layout settle
    const tid = setTimeout(() => {
      const items = container.querySelectorAll<HTMLElement>(".service-tag")
      totalWidth = Array.from(items).slice(0, tags.length).reduce((sum, el) => {
        const style = window.getComputedStyle(el)
        return sum + el.offsetWidth + parseFloat(style.marginRight || "0") + 24 /* gap-6 = 24px */
      }, 0)

      function tick() {
        scrollPos = (scrollPos + 1) % totalWidth
        if (container) container.scrollLeft = scrollPos
        animId = requestAnimationFrame(tick)
      }
      animId = requestAnimationFrame(tick)
    }, 100)

    return () => {
      clearTimeout(tid)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]" />
        <div className="code-grid absolute inset-0" />
      </div>

      {/* View All button — centred over the tag strip */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <GradientButton href="/portfolio" variant="secondary">
          viewAllProjects
          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
        </GradientButton>
      </div>

      {/* Left/right gradient fade overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0f0f1a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0f0f1a] to-transparent z-10 pointer-events-none" />

      {/* Tag carousel */}
      <div
        ref={containerRef}
        className="overflow-hidden select-none relative opacity-20"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <div className="flex gap-6 py-8 items-center" style={{ width: "max-content" }}>
          {allTags.map((tag, i) => (
            <div
              key={`${tag}-${i}`}
              className="service-tag flex-none px-6 py-3 rounded-lg flex items-center gap-2"
              style={{
                background: "rgba(79,70,229,0.15)",
                border: "1px solid rgba(79,70,229,0.3)",
                color: "rgba(255,255,255,0.8)",
              }}
            >
              <Code2 size={14} className="text-indigo-400" aria-hidden />
              <span className="whitespace-nowrap text-sm">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
