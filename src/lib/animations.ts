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

export type Killable = { kill: () => void }

// A tween created with a scrollTrigger config exposes it here; killing the tween
// alone leaves the trigger behind, so kill both.
type TweenWithTrigger = { kill: () => void; scrollTrigger?: { kill: () => void } }
function killable(tween: TweenWithTrigger): Killable {
  return {
    kill() {
      tween.scrollTrigger?.kill()
      tween.kill()
    },
  }
}

/**
 * Scrub the element vertically as its section passes through the viewport, so a
 * background layer drifts behind the content (parallax depth). GPU transform only.
 * Returns a handle that kills both the tween and its ScrollTrigger on cleanup.
 */
export async function scrollParallax(el: HTMLElement, yPercent = 10): Promise<Killable | undefined> {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  await registerScrollTrigger()
  const trigger = el.parentElement ?? el
  const tween = gsap.to(el, {
    yPercent,
    ease: "none",
    scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
  })
  return killable(tween as TweenWithTrigger)
}

/**
 * Draw a 1px rule in along one axis as it enters the viewport (scale 0 -> 1).
 * The start state is only set when this runs, so reduced-motion (where it never
 * runs) leaves the rule at its natural full size. Returns a handle for cleanup.
 */
export async function scrollDraw(el: HTMLElement, axis: "x" | "y"): Promise<Killable | undefined> {
  if (typeof window === "undefined") return
  const { gsap } = await import("gsap")
  await registerScrollTrigger()
  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 }
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 }
  const tween = gsap.fromTo(el, from, {
    ...to,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 82%" },
  })
  return killable(tween as TweenWithTrigger)
}
