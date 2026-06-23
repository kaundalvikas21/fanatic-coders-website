"use client"

import { useCountUp } from "@/hooks/useCountUp"

interface CountUpProps {
  /** Display string with optional prefix/suffix, e.g. "8+", "98%", "2.4M+". */
  value: string
  /** Tween length in ms. */
  durationMs?: number
  className?: string
}

// prefix (non-digits) | number (digits, optional . or ,) | suffix (the rest)
const PARTS = /^(\D*)([\d.,]+)(.*)$/

/**
 * Counts a number up from 0 the first time it scrolls into view, preserving any
 * prefix/suffix ("+", "%", "M+", "$"). Animation runs on the shared useCountUp
 * engine; this component only handles the string format. Honors reduced motion
 * and exposes the true value to screen readers.
 */
export function CountUp({ value, durationMs = 1200, className }: CountUpProps) {
  const match = value.match(PARTS)
  const numStr = match ? match[2] : "0"
  const target = parseFloat(numStr.replace(/,/g, ""))
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0

  const { ref, value: n } = useCountUp(target, {
    trigger: "scroll",
    decimals,
    duration: durationMs / 1000,
  })

  const prefix = match ? match[1] : ""
  const suffix = match ? match[3] : ""
  // Land on the exact original string (keeps thousands separators) once settled.
  const display = !match || n >= target ? value : `${prefix}${n.toFixed(decimals)}${suffix}`

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}
