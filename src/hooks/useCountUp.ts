'use client';

import { useRef, useState } from 'react';
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  registerGsap,
  prefersReducedMotion,
  DURATION,
  EASE,
} from '@/lib/motion';

interface UseCountUpOptions {
  /** Seconds. */
  duration?: number;
  /** ScrollTrigger start (scroll mode only). */
  start?: string;
  /** "scroll": count when it enters view. "active": count when `active` flips true. */
  trigger?: 'scroll' | 'active';
  /** Gate for "active" mode (e.g. hero stats waiting for the hero intro). */
  active?: boolean;
  /** Decimal places to keep. */
  decimals?: number;
}

/**
 * One count-up implementation for the whole site (replaces the separate HeroStat
 * and CountUp logic). Returns a ref to attach to the number element and the live
 * value. Honors reduced motion by jumping straight to the target.
 */
export function useCountUp(target: number, opts: UseCountUpOptions = {}) {
  const {
    duration = DURATION.countUp,
    start = 'top 85%',
    trigger = 'scroll',
    active = false,
    decimals = 0,
  } = opts;

  const ref = useRef<HTMLSpanElement>(null);
  // Start at the target so SSR / no-JS / pre-hydration render the real number, not 0.
  const [value, setValue] = useState(target);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el) return;

      const counter = { v: 0 };
      // setState only ever fires async (GSAP's onUpdate/onComplete ticker, or rAF below),
      // never synchronously in this layout effect.
      const setV = () => setValue(Number(counter.v.toFixed(decimals)));
      const run = (dur: number) =>
        gsap.to(counter, {
          v: target,
          duration: dur,
          ease: EASE.out,
          onUpdate: setV,
          onComplete: setV,
        });

      // Reduced motion: leave the value at its target (already set), no animation.
      if (prefersReducedMotion()) return;

      // An animation will play: drop to 0 on the client (post-hydration, async via rAF so
      // it never fires a synchronous setState in this effect), then count up on trigger.
      requestAnimationFrame(setV);

      if (trigger === 'active') {
        if (active) run(duration);
      } else {
        ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => run(duration) });
      }
    },
    { scope: ref, dependencies: [target, trigger, active] },
  );

  return { ref, value };
}
