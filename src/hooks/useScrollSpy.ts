'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section is nearest the top of the viewport via IntersectionObserver.
 * Shared by the desktop and mobile article tables of contents. Returns the active
 * section id. setState runs inside the async observer callback (not synchronously
 * in the effect), so it does not trip `react-hooks/set-state-in-effect`.
 */
export function useScrollSpy(ids: string[], rootMargin = '-20% 0px -70% 0px') {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: 0 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
