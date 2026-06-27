'use client';

import { useState } from 'react';
import { gsap, useGSAP, registerGsap, prefersReducedMotion, EASE } from '@/lib/motion';

interface UseTypewriterOptions {
  /** Seconds per character. */
  speed?: number;
  /** Delay before typing starts (seconds). */
  startDelay?: number;
  /** Type, hold, erase, repeat. */
  loop?: boolean;
  /** Hold time at full text before erasing (loop only, seconds). */
  pause?: number;
}

/**
 * Shared typewriter (replaces the hand-rolled setTimeout loops in TerminalAbout,
 * HeroTerminal, FooterCodeType). Returns the currently-typed substring. Under
 * reduced motion it returns the full text immediately. GSAP owns the timeline,
 * so cleanup happens on unmount via useGSAP.
 */
export function useTypewriter(text: string, opts: UseTypewriterOptions = {}) {
  const { speed = 0.05, startDelay = 0, loop = false, pause = 2 } = opts;
  const [display, setDisplay] = useState('');

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) {
        setDisplay(text);
        return;
      }

      const proxy = { i: 0 };
      const paint = () => setDisplay(text.slice(0, Math.round(proxy.i)));
      const tl = gsap.timeline({ repeat: loop ? -1 : 0, delay: startDelay });

      tl.to(proxy, {
        i: text.length,
        duration: text.length * speed,
        ease: EASE.none,
        onUpdate: paint,
      });
      if (loop) {
        tl.to({}, { duration: pause });
        tl.to(proxy, {
          i: 0,
          duration: text.length * speed * 0.6,
          ease: EASE.none,
          onUpdate: paint,
        });
      }
    },
    { dependencies: [text, loop, speed] },
  );

  return display;
}
