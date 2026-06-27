'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Footer CTA code block: types out the snippet the first time it scrolls into
 * view, then leaves a blinking cursor. Expanded with relevant comments so it
 * fills the cell. Decorative (aria-hidden); reduced-motion shows it in full
 * instantly. Reuses the IntersectionObserver-once pattern from CountUp and the
 * .hero-cursor blink.
 */
const C = 'text-blue-100/45 italic'; // comment color

type Seg = { t: string; cls?: string };

const SEGMENTS: Seg[] = [
  { t: '// what happens after you reach out\n', cls: C },
  { t: 'const ', cls: 'text-pink-400' },
  { t: 'project', cls: 'text-indigo-400' },
  { t: ' = {\n' },
  { t: '  team:  ' },
  { t: "'senior'", cls: 'text-rose-400' },
  { t: ',       ' },
  { t: '// same folks who pitch, build\n', cls: C },
  { t: '  stack: ' },
  { t: "'your choice'", cls: 'text-rose-400' },
  { t: ',  ' },
  { t: '// we work in your tools\n', cls: C },
  { t: '  scope: ' },
  { t: "'clear'", cls: 'text-rose-400' },
  { t: ',        ' },
  { t: '// plan before code\n', cls: C },
  { t: '  start: ' },
  { t: "'this week'", cls: 'text-rose-400' },
  { t: ',\n' },
  { t: '}\n' },
  { t: '// call startConversation() to kick off', cls: C },
];

const FULL = SEGMENTS.reduce((n, s) => n + s.t.length, 0);

export default function FooterCodeType() {
  const ref = useRef<HTMLDivElement>(null);
  // Start at 0 on both server and client so hydration matches; the effect below
  // either jumps to FULL (reduced motion) or types in once it's in view.
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(FULL);
      return;
    }

    let mounted = true;
    let timer: ReturnType<typeof setTimeout> | undefined;

    function type(n: number) {
      if (!mounted) return;
      setCount(n);
      if (n < FULL) timer = setTimeout(() => type(n + 1), 18);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          type(1);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);

    return () => {
      mounted = false;
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  // Render SEGMENTS up to `count` chars, breaking on "\n".
  const out: React.ReactNode[] = [];
  let remaining = count;
  let key = 0;
  for (const seg of SEGMENTS) {
    if (remaining <= 0) break;
    const shown = seg.t.slice(0, remaining);
    remaining -= seg.t.length;
    shown.split('\n').forEach((line, i) => {
      if (i > 0) out.push(<br key={`br-${key++}`} />);
      if (line)
        out.push(
          <span
            key={`s-${key++}`}
            className={seg.cls}
          >
            {line}
          </span>,
        );
    });
  }

  return (
    // Aligned (whitespace-pre) only at lg where the cell is wide; wraps below to avoid overflow.
    <div
      ref={ref}
      className="code-decoration font-mono text-xs sm:text-sm leading-relaxed text-blue-100/40 whitespace-pre-wrap lg:whitespace-pre break-words max-w-full"
      aria-hidden="true"
    >
      {out}
      <span
        className="hero-cursor"
        aria-hidden
      >
        |
      </span>
    </div>
  );
}
