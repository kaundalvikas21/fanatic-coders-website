// Motion single source of truth.
//
// One place to read/change timing, easing, and the reusable GSAP "effects" that
// every animated component composes from. Component code should never hardcode a
// duration or a cubic-bezier: import DURATION/EASE here, or call gsap.effects.*.
//
// The numbers below MIRROR the CSS custom properties in globals.css
// (--duration-*, --ease-*). Keep the two in sync; CSS owns hover/micro
// transitions, GSAP owns entrance/scroll/timeline animation.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/** Seconds. Mirrors --duration-* (ms) in globals.css. */
export const DURATION = {
  micro: 0.15,
  fast: 0.2,
  base: 0.3,
  slow: 0.6,
  reveal: 0.8,
  countUp: 1.2,
  hero: 1.6,
} as const;

/**
 * GSAP ease strings. Chosen to match the feel of the CSS easing tokens:
 *  --ease-snappy: cubic-bezier(.16,1,.3,1)  → expo-style settle  → "expo.out"
 *  --ease-smooth: cubic-bezier(.4,0,.2,1)   → standard in/out    → "power2.inOut"
 */
export const EASE = {
  snappy: 'expo.out',
  smooth: 'power2.inOut',
  out: 'power3.out',
  none: 'none',
} as const;

/** Base stagger step (seconds). Mirrors --stagger-base: 60ms. */
export const STAGGER = 0.06;

/** SSR-safe reduced-motion check. Hooks/effects rest content at its final state when true. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

let registered = false;

/**
 * Register GSAP plugins + the reusable named effects, once, on the client.
 * After this runs, any component can call e.g. `gsap.effects.fadeUp(el)`.
 * Idempotent and SSR-safe.
 */
export function registerGsap(): void {
  if (typeof window === 'undefined' || registered) return;
  registered = true;

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  gsap.registerEffect({
    name: 'fadeUp',
    defaults: { duration: DURATION.reveal, y: 24, ease: EASE.snappy },
    effect: (targets: object, cfg: { duration: number; y: number; ease: string }) =>
      gsap.fromTo(
        targets,
        { opacity: 0, y: cfg.y },
        { opacity: 1, y: 0, duration: cfg.duration, ease: cfg.ease },
      ),
  });

  gsap.registerEffect({
    name: 'staggerReveal',
    defaults: { duration: DURATION.slow, y: 24, ease: EASE.snappy, stagger: STAGGER },
    effect: (
      targets: object,
      cfg: { duration: number; y: number; ease: string; stagger: number },
    ) =>
      gsap.fromTo(
        targets,
        { opacity: 0, y: cfg.y },
        { opacity: 1, y: 0, duration: cfg.duration, ease: cfg.ease, stagger: cfg.stagger },
      ),
  });

  gsap.registerEffect({
    name: 'auroraEntrance',
    defaults: { duration: DURATION.reveal, ease: EASE.snappy },
    effect: (targets: object, cfg: { duration: number; ease: string }) =>
      gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.96, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: cfg.duration, ease: cfg.ease },
      ),
  });
}

export { gsap, ScrollTrigger, useGSAP };
