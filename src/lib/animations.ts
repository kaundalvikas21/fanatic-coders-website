// All GSAP functions are SSR-safe: only run in browser
// Import GSAP lazily to avoid SSR issues

export async function fadeIn(element: HTMLElement, delay = 0) {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  gsap.fromTo(element,
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out" }
  )
}

export async function staggerReveal(elements: HTMLElement[] | NodeListOf<Element>, stagger = 0.08) {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.7, stagger, ease: "power3.out" }
  )
}

export async function wordReveal(words: HTMLElement[] | NodeListOf<Element>) {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  gsap.fromTo(words,
    { opacity: 0, y: 32 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }
  )
}

export async function auroraEntrance(element: HTMLElement) {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  gsap.fromTo(element,
    { opacity: 0, scale: 0.96, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
  )
}

export async function registerScrollTrigger() {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  const { ScrollTrigger } = await import("gsap/ScrollTrigger")
  gsap.registerPlugin(ScrollTrigger)
  return ScrollTrigger
}
