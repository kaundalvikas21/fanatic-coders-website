'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Start public routes at their page header after navigation. */
export function ScrollToTopOnRouteChange() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;

    // Run after App Router finishes its own route-change scroll adjustment.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
