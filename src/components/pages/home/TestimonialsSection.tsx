'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import type { KeyboardEvent } from 'react';
import { Building2, Play, Pause } from 'lucide-react';
import { projects } from '@/components/pages/portfolio/data';

interface ClientQuote {
  name: string;
  role: string;
  company: string;
  quote: string;
  result: { value: string; caption: string };
  initials: string;
  accent: string;
}

const ACCENTS = [
  'var(--aurora-violet-light)',
  'var(--aurora-cyan-light)',
  'var(--aurora-green-light)',
  'var(--aurora-blue-light)',
];

// Last two name words → initials (skips honorifics like "Dr.").
const initialsOf = (name: string) =>
  name
    .replace(/[^a-zA-Z ]/g, '')
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

// Testimonials mirror the portfolio case studies (single source of truth) — real
// quotes, no stock-photo faces. Identity shows as a mono initials monogram.
const testimonials: ClientQuote[] = projects
  .flatMap((p) => (p.quote ? [{ p, q: p.quote }] : []))
  .slice(0, 4)
  .map(({ p, q }, i) => ({
    name: q.author,
    role: q.role,
    company: p.title,
    quote: q.text,
    result: { value: p.stats[0].value, caption: p.stats[0].caption ?? p.stats[0].label },
    initials: initialsOf(q.author),
    accent: ACCENTS[i % ACCENTS.length],
  }));

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Roving-tabindex keyboard nav across the dots.
  function onTabsKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = testimonials.length - 1;
    let next = activeIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
      next = activeIndex === last ? 0 : activeIndex + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = activeIndex === 0 ? last : activeIndex - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  // Scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance (off under reduced motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      startTransition(() => setIsPaused(true));
      return;
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % testimonials.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  const t = testimonials[activeIndex];
  const v = visible ? 'visible' : '';
  const count = testimonials.length;

  return (
    <section
      ref={sectionRef}
      className="testimonials-section section-y relative overflow-hidden"
      id="testimonials"
    >
      {/* Aurora parallax background */}
      <div className="aurora-parallax absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%)' }}
      />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 reveal ${v}`}>
          <div className="preheading-code">reviews.module.ts</div>
          <h2 className="heading-code mt-2">
            client.<span style={{ color: 'var(--aurora-violet-light)' }}>testimonials</span>()
          </h2>
          <p className="subheading-code mt-3">{'// what clients say after we ship'}</p>

          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] px-4 py-2 text-sm text-white/70 transition-colors duration-200 hover:bg-[rgba(124,58,237,0.16)]"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <>
                <Play
                  size={14}
                  aria-hidden
                />{' '}
                Resume testimonials
              </>
            ) : (
              <>
                <Pause
                  size={14}
                  aria-hidden
                />{' '}
                Pause testimonials
              </>
            )}
          </button>
        </div>

        {/* Screen-reader announcement of the active slide */}
        <p
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {`Testimonial ${activeIndex + 1} of ${count}: ${t.name}, ${t.company}`}
        </p>

        <div
          className={`max-w-3xl mx-auto reveal ${v}`}
          style={{ transitionDelay: '100ms' }}
        >
          <div
            className="testimonial-card relative rounded-2xl p-8 md:p-10"
            role="tabpanel"
            id="testi-panel"
            aria-labelledby={`testi-tab-${activeIndex}`}
            style={{ '--accent': t.accent } as React.CSSProperties}
          >
            {/* Slide content (cross-fades on change) */}
            <div
              key={activeIndex}
              className="testi-slide"
            >
              {/* Client */}
              <div className="flex items-center gap-5">
                <div
                  className="testi-avatar flex-shrink-0"
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">{t.name}</h3>
                  <p className="text-blue-100/65 text-sm mb-2">{t.role}</p>
                  <span
                    className="company-badge inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      color: 'var(--accent)',
                      background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                    }}
                  >
                    <Building2
                      size={12}
                      aria-hidden
                    />
                    {t.company}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="testi-quote relative mt-8 pl-1 text-base md:text-lg text-blue-100/85 leading-relaxed">
                {t.quote}
              </blockquote>

              {/* Concrete result */}
              <div className="mt-8">
                <span
                  className="inline-flex items-baseline gap-2 font-mono text-sm px-3 py-1.5 rounded-lg"
                  style={{
                    color: 'color-mix(in srgb, var(--accent) 82%, white)',
                    background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                  }}
                >
                  <span className="font-bold tabular-nums">{t.result.value}</span>
                  <span className="text-blue-100/60">{t.result.caption}</span>
                </span>
              </div>
            </div>

            {/* Dot navigation */}
            <div
              className="flex justify-center items-center gap-2 mt-10"
              role="tablist"
              aria-label="Testimonials"
            >
              {testimonials.map((tt, i) => (
                <button
                  key={tt.name}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  id={`testi-tab-${i}`}
                  className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full"
                  aria-label={`Show testimonial from ${tt.name}`}
                  aria-selected={activeIndex === i}
                  aria-controls="testi-panel"
                  role="tab"
                  tabIndex={activeIndex === i ? 0 : -1}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={onTabsKeyDown}
                >
                  <span className="absolute h-1 w-5 rounded-full bg-[rgba(124,58,237,0.25)]" />
                  <span
                    className="absolute h-1 w-5 rounded-full bg-[var(--aurora-violet)] transition-transform duration-300"
                    style={{
                      transform: `scaleX(${activeIndex === i ? 1 : 0})`,
                      transformOrigin: 'left',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
