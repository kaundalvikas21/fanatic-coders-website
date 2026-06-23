"use client"

import { useEffect } from "react"
import { scrollParallax, scrollDraw } from "@/lib/animations"

/**
 * Wires the GSAP ScrollTrigger effects for the About page: aurora-background
 * parallax (elements tagged `data-parallax`) and connector/spine draw-in
 * (`data-draw="connector|spine"`). Renders nothing; it only owns the effects so
 * a single useEffect can tear every ScrollTrigger down on route change.
 *
 * Reduced-motion: bails before creating anything, so tagged rules keep their
 * natural full size (GSAP never sets the scale-0 start state).
 */
export default function AboutScrollFX() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let cancelled = false
    const tweens: Array<{ kill: () => void }> = []
    const track = (t: { kill: () => void } | undefined) => {
      if (!t) return
      if (cancelled) t.kill()
      else tweens.push(t)
    }

    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const amount = Number(el.dataset.parallax) || 10
      scrollParallax(el, amount).then(track)
    })
    document.querySelectorAll<HTMLElement>('[data-draw="connector"]').forEach((el) => {
      scrollDraw(el, "x").then(track)
    })
    document.querySelectorAll<HTMLElement>('[data-draw="spine"]').forEach((el) => {
      scrollDraw(el, "y").then(track)
    })

    return () => {
      cancelled = true
      tweens.forEach((t) => t.kill())
    }
  }, [])

  return null
}
