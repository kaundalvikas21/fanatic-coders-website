"use client"
import { useEffect, useRef, RefObject } from "react"

interface UseScrollRevealOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T | null> {
  const { threshold = 0.15, once = true, rootMargin = "0px" } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove("visible")
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return ref
}
