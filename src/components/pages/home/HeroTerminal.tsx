"use client"

import { useEffect, useRef, useState, startTransition } from "react"

const impactfulTexts = [
  "npm create digital-excellence",
  "npm create impactful-solutions",
  "npm create awesome-experiences",
  "npm create digital-innovation",
]

// Isolated from HeroSection so the per-keystroke setState (every 30-50ms) only
// re-renders this badge, not the heading and trust-strip maps above it.
export default function HeroTerminal() {
  const mountedRef = useRef(false)
  const tokenRef   = useRef(0)
  const [text, setText] = useState("")

  useEffect(() => {
    mountedRef.current = true
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      startTransition(() => setText(impactfulTexts[0]))
      return () => { mountedRef.current = false }
    }

    const token = ++tokenRef.current
    const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    async function cycle() {
      let idx = 0
      while (mountedRef.current && token === tokenRef.current) {
        const value = impactfulTexts[idx]
        for (let i = 0; i <= value.length; i++) {
          if (!mountedRef.current || token !== tokenRef.current) return
          setText(value.slice(0, i))
          await delay(50)
        }
        await delay(2000)
        for (let i = value.length; i >= 0; i--) {
          if (!mountedRef.current || token !== tokenRef.current) return
          setText(value.slice(0, i))
          await delay(30)
        }
        idx = (idx + 1) % impactfulTexts.length
      }
    }
    cycle()

    return () => {
      mountedRef.current = false
      tokenRef.current += 1
    }
  }, [])

  return (
    // Decorative typing animation: hidden from assistive tech so partial
    // keystrokes ("npm create dig...") are never announced.
    <div className="mb-8 hero-terminal-float" aria-hidden>
      <div className="hero-terminal-badge inline-flex items-center px-6 py-3 rounded-lg">
        <span className="text-[var(--aurora-cyan-light)] mr-2 font-mono">$</span>
        <span className="text-[var(--aurora-blue-light)] font-mono text-sm">{text}</span>
        <span className="hero-cursor">|</span>
      </div>
    </div>
  )
}
