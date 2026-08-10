'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Start portfolio index and case-study routes at their page header. */
export function PortfolioScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Run after App Router finishes its own route-change scroll adjustment.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
