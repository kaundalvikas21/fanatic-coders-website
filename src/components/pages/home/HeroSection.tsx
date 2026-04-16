"use client"

import { useEffect, useRef, useState, startTransition } from "react"
import { BarChart2, Target, Zap, Wrench, ArrowRight } from "lucide-react"
import GradientButton from "@/components/ui/GradientButton"

const impactfulTexts = [
  "npm create digital-excellence",
  "npm create impactful-solutions",
  "npm create awesome-experiences",
  "npm create digital-innovation",
]

const stats = [
  { number: "150+", label: "Projects Completed",  Icon: BarChart2 },
  { number: "98%",  label: "Client Satisfaction", Icon: Target    },
  { number: "10+",  label: "Years Experience",     Icon: Zap       },
  { number: "24/7", label: "Support Available",    Icon: Wrench    },
]

const headingWords = ["We", "Create", "Digital", "Experiences", "That", "Matter"]
const codeSnippets = [
  "{ code }", "<dev/>", "npm run", "git push", "async()",
  ".then()", "useState", "[...arr]", "${var}", "=> func",
]

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const mountedRef    = useRef(false)
  const cycleTokenRef = useRef(0)
  const [headingVisible, setHeadingVisible] = useState(false)
  const [terminalText, setTerminalText]     = useState("")

  // On mount: trigger heading reveal, floating code elements, cycling terminal text
  useEffect(() => {
    mountedRef.current = true
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      startTransition(() => {
        setHeadingVisible(true)
        setTerminalText(impactfulTexts[0])
      })
    } else {
      setTimeout(() => setHeadingVisible(true), 100)
    }

    // Floating code elements
    const container = containerRef.current
    if (container) {
      const elements: { node: HTMLElement; x: number; y: number }[] = []
      let frameId: number | null = null
      let pointerX = 0
      let pointerY = 0

      const cols = 5
      const rows = 2
      const cellW = container.offsetWidth / cols
      const cellH = Math.max(container.offsetHeight, 400) / rows

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

      function onMouseMove(e: MouseEvent) {
        const rect = container!.getBoundingClientRect()
        pointerX = e.clientX - rect.left
        pointerY = e.clientY - rect.top
        if (frameId === null) {
          frameId = requestAnimationFrame(() => {
            frameId = null
            elements.forEach(({ node, x, y }) => {
              const dx = pointerX - x
              const dy = pointerY - y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 300) {
                const scale = 1 - dist / 300
                const angle = Math.atan2(dy, dx)
                const push = 40 * scale
                node.style.transform = `translate(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px) scale(${1 + scale * 0.2})`
                node.style.opacity = (0.2 + scale * 0.5).toString()
              } else {
                node.style.transform = "translate(0,0) scale(1)"
                node.style.opacity = "0.15"
              }
            })
          })
        }
      }

      if (!prefersReducedMotion) {
        container.addEventListener("mousemove", onMouseMove, { passive: true })
      }

      // Terminal text cycling
      if (!prefersReducedMotion) {
        const token = ++cycleTokenRef.current

        async function cycleTerminal() {
          let idx = 0
          const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

          while (mountedRef.current && token === cycleTokenRef.current) {
            const text = impactfulTexts[idx]
            // Type
            for (let i = 0; i <= text.length; i++) {
              if (!mountedRef.current || token !== cycleTokenRef.current) return
              setTerminalText(text.slice(0, i))
              await delay(50)
            }
            await delay(2000)
            // Delete
            for (let i = text.length; i >= 0; i--) {
              if (!mountedRef.current || token !== cycleTokenRef.current) return
              setTerminalText(text.slice(0, i))
              await delay(30)
            }
            idx = (idx + 1) % impactfulTexts.length
          }
        }
        cycleTerminal()
      }

      return () => {
        mountedRef.current = false
        cycleTokenRef.current += 1
        container.removeEventListener("mousemove", onMouseMove)
        if (frameId !== null) cancelAnimationFrame(frameId)
        elements.forEach(el => el.node.remove())
      }
    }

    return () => {
      mountedRef.current = false
      cycleTokenRef.current += 1
    }
  }, [])

  return (
    <div className="hero-root relative min-h-screen overflow-hidden">
      {/* Aurora mesh background */}
      <div className="aurora-mesh-bg absolute inset-0" />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none opacity-50"
        style={{ maskImage: "radial-gradient(circle at 50% 40%, black, transparent 70%)" }}
      />

      {/* Floating code elements */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden"
        style={{ maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)" }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-44 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          {/* Terminal badge */}
          <div className="mb-8 hero-terminal-float">
            <div className="hero-terminal-badge inline-flex items-center px-6 py-3 rounded-lg">
              <span className="text-[#22d3ee] mr-2 font-mono">$</span>
              <span className="text-blue-300 font-mono text-sm">{terminalText}</span>
              <span className="hero-cursor" aria-hidden>|</span>
            </div>
          </div>

          {/* Kinetic heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            {headingWords.map((word, i) => (
              <span
                key={word + i}
                className={`word-reveal inline-block${headingVisible ? " visible" : ""}`}
                style={{ animationDelay: `${i * 80}ms`, marginRight: "0.25em" }}
              >
                {word === "Digital" || word === "Experiences"
                  ? <span className="text-aurora-sweep">{word}</span>
                  : word
                }
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100/70 mb-12 max-w-2xl mx-auto subheading-reveal${headingVisible ? " visible" : ""}`}
          >
            Expert web design, development, and digital marketing solutions that drive growth and
            deliver exceptional results.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <GradientButton href="/contact">
              startProject
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
            <GradientButton href="#services" variant="secondary">
              exploreServices
              <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden />
            </GradientButton>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`stats-card glass-card card-lift rounded-xl p-6 text-center${headingVisible ? " visible" : ""}`}
                style={{ "--stagger": i } as React.CSSProperties}
              >
                <stat.Icon size={28} className="mb-3 mx-auto text-aurora-violet-icon" aria-hidden />
                <div className="text-3xl font-bold mb-1 text-aurora-sweep">{stat.number}</div>
                <div className="text-blue-100/55 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
