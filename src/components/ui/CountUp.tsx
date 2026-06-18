"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Display string with optional prefix/suffix, e.g. "8+", "98%", "2.4M+". */
  value: string
  /** Tween length in ms. */
  durationMs?: number
  className?: string
}

// prefix (non-digits) | number (digits, optional . or ,) | suffix (the rest)
const PARTS = /^(\D*)([\d.,]+)(.*)$/

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Counts a number up from 0 the first time it scrolls into view. Preserves any
 * prefix/suffix on the value ("+", "%", "M+"). Honors prefers-reduced-motion and
 * keeps the true value available to screen readers. State only ever changes inside
 * the observer/raf callbacks, never synchronously during the effect.
 */
export function CountUp({ value, durationMs = 1200, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const match = value.match(PARTS)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // No numeric part, or motion-reduced: leave the final value in place (state init).
    if (!match || reduced) return

    const el = ref.current
    if (!el) return

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr.replace(/,/g, ""))
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0

    let raf = 0
    let start = 0
    const tick = (now: number) => {
      if (!start) start = now
      const t = Math.min((now - start) / durationMs, 1)
      const current = (target * easeOutCubic(t)).toFixed(decimals)
      setDisplay(`${prefix}${current}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value) // land on the exact original string
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect()
          raf = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, durationMs])

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
