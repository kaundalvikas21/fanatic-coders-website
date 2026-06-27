'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Hidden greeting for readers who open devtools. Module-scoped so it logs once,
// even with React's dev double-invoke.
let greeted = false;

/**
 * Floating control that appears once the reader scrolls past the first viewport
 * and returns them to the top. Smooth scroll, instant under reduced-motion.
 */
export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      '%cfanaticCoders%c\nYou opened devtools. We like that. Talk to us: hello@fanaticcoders.com',
      'color:#a855f7;font-weight:700;font-size:14px',
      'color:#8e8e8e',
    );
  }, []);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setShown(window.scrollY > window.innerHeight);
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function toTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`glass-card fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-blue-100/80 transition-all duration-300 hover:text-white ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp
        size={18}
        aria-hidden
      />
    </button>
  );
}
