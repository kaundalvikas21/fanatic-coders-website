"use client"

import { useEffect, useRef, useState } from "react"
import { Send, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const codeSnippets = [
  '{ code }', '<dev/>', 'npm run', 'git push', 'async()',
  '.then()', 'useState', '[...arr]', '${var}', '=> func',
]

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  // Scroll-reveal observer
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Interactive floating code elements
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const elements: { node: HTMLElement; x: number; y: number }[] = []
    let frameId: number | null = null
    let pointerX = 0
    let pointerY = 0

    const cols = 5
    const rows = 2
    const cellW = container.offsetWidth / cols
    const cellH = Math.max(container.offsetHeight, 200) / rows

    codeSnippets.forEach((snippet, idx) => {
      const col = idx % cols
      const row = Math.floor(idx / cols)
      const x = col * cellW + cellW * 0.2 + Math.random() * cellW * 0.6
      const y = row * cellH + cellH * 0.2 + Math.random() * cellH * 0.6
      const node = document.createElement("div")
      node.className = "code-element absolute text-sm font-mono transition-all duration-300"
      node.style.left = `${x}px`
      node.style.top  = `${y}px`
      node.textContent = snippet
      container.appendChild(node)
      elements.push({ node, x, y })
    })

    function updateCodeElements() {
      frameId = null
      elements.forEach(({ node, x, y }) => {
        const dx = pointerX - x
        const dy = pointerY - y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 300) {
          const scale = 1 - dist / 300
          const angle = Math.atan2(dy, dx)
          const push  = 40 * scale
          node.style.transform = `translate(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px) scale(${1 + scale * 0.2})`
          node.style.opacity   = (0.2 + scale * 0.5).toString()
        } else {
          node.style.transform = "translate(0,0) scale(1)"
          node.style.opacity   = "0.15"
        }
      })
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      pointerX = e.clientX - rect.left
      pointerY = e.clientY - rect.top
      if (frameId === null) frameId = requestAnimationFrame(updateCodeElements)
    }

    if (!prefersReducedMotion) {
      container.addEventListener("mousemove", onMouseMove, { passive: true })
    }

    return () => {
      container.removeEventListener("mousemove", onMouseMove)
      if (frameId !== null) cancelAnimationFrame(frameId)
      elements.forEach(el => el.node.remove())
    }
  }, [])

  const v = visible ? "visible" : ""

  return (
    <section ref={sectionRef} className="cta-section py-24 relative overflow-hidden" id="contact">
      {/* CSS star field */}
      <div className="star-field absolute inset-0 pointer-events-none" />

      {/* Interactive code elements */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* Terminal card */}
          <div className={`terminal-card reveal ${v}`}>

            {/* Title bar */}
            <div className="terminal-bar">
              <div className="flex items-center gap-2">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="text-xs font-mono text-white/50 ml-3">new-project.sh</span>
            </div>

            {/* Content */}
            <div className="p-8 md:p-14 text-center">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-mono mb-8 badge-aurora">
                <span style={{ color: "#a855f7" }}>$</span>
                <span className="text-blue-200/80">./start-collaboration.sh</span>
              </div>

              {/* Heading */}
              <h2
                className={`cta-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight reveal ${v}`}
                style={{ transitionDelay: "100ms" }}
              >
                Ready to Build Something Amazing?
              </h2>

              <p
                className={`text-lg text-blue-100/65 mb-12 max-w-2xl mx-auto reveal ${v}`}
                style={{ transitionDelay: "200ms" }}
              >
                Let&apos;s transform your ideas into reality. Our team of expert developers is ready
                to bring your vision to life.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center reveal ${v}`}
                style={{ transitionDelay: "300ms" }}
              >
                <GradientButton href="/contact">
                  dropUsALine
                  <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
                </GradientButton>
                <GradientButton href="/services" variant="secondary">
                  exploreServices
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
                </GradientButton>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
