"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { registerGsap, ScrollTrigger } from "@/lib/motion"

/**
 * Registers GSAP plugins + reusable effects once, and recomputes ScrollTrigger
 * positions after each App Router navigation (new content changes page height).
 * Renders nothing. The animation hooks also call registerGsap() defensively, so
 * this provider is about route-change refresh, not a hard dependency.
 */
export function MotionProvider() {
  const pathname = usePathname()

  useEffect(() => {
    registerGsap()
    // Let the new route paint, then refresh trigger start/end positions.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
