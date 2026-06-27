'use client';

import { useEffect, useState } from 'react';

/**
 * Fixed top scroll-progress bar. Width tracks how far the document is scrolled.
 * Uses transform-free width on a thin element; cheap and reduced-motion safe
 * (it reflects position, it does not animate on its own).
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
