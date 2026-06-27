'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';

type Phase = 'idle' | 'exiting' | 'entering';

export interface StoryMilestone {
  year: string;
  label: string;
  title: string;
  body: string;
}

/**
 * Click-through story timeline: a vertical year rail (tablist) on the left and an
 * animated story panel (tabpanel) on the right. Mirrors FaqInteractive's three-phase
 * swap (idle -> exiting -> entering) and reuses the panelExit/panelEnter keyframes.
 * Below lg the rail becomes a horizontal year strip above the panel.
 */
export function StoryTimeline({ items }: { items: StoryMilestone[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const reduced = useRef(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Returns true when the selection actually moved, so keyboard nav only shifts
  // focus on a real change (not when a mid-animation press is ignored).
  function select(i: number): boolean {
    if (i === activeIndex || phase !== 'idle') return false;
    setActiveIndex(i);
    if (reduced.current) {
      setDisplayIndex(i);
      return true;
    }
    setPhase('exiting');
    setTimeout(() => {
      setDisplayIndex(i);
      setPhase('entering');
      setTimeout(() => setPhase('idle'), 420);
    }, 180);
    return true;
  }

  // Roving arrow-key navigation for the tablist (both axes, since the rail is
  // vertical on desktop and horizontal on mobile). Home/End jump to the ends.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const count = items.length;
    let next = -1;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (activeIndex + 1) % count;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (activeIndex - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (select(next)) tabRefs.current[next]?.focus();
  }

  if (items.length === 0) return null;
  const active = items[displayIndex];

  return (
    <div className="mt-12 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
      {/* Year rail */}
      <div
        role="tablist"
        aria-label="Company timeline"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="relative flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:gap-0 lg:overflow-visible"
      >
        {/* Desktop connector spine */}
        <span
          aria-hidden
          data-draw="spine"
          className="pointer-events-none absolute left-[7px] top-3 bottom-3 hidden w-px origin-top bg-white/10 lg:block"
        />
        {items.map((m, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={m.year}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`story-tab-${i}`}
              aria-selected={isActive}
              aria-controls="story-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                // Mobile: a self-contained tappable chip (years wrap, no swipe).
                // Desktop (lg): plain rail row beside the connector spine.
                'group relative flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left ring-1 transition-colors',
                'lg:gap-3 lg:shrink lg:rounded-lg lg:bg-transparent lg:px-0 lg:py-3.5 lg:pr-3 lg:ring-0',
                isActive
                  ? 'bg-[var(--aurora-violet-light)]/12 ring-[var(--aurora-violet-light)]/40'
                  : 'bg-white/[0.04] ring-white/10 hover:bg-white/[0.06]',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border transition-all duration-300',
                  isActive
                    ? 'border-transparent bg-[var(--aurora-violet-light)] shadow-[0_0_0_4px_rgba(124,58,237,0.25)]'
                    : 'border-white/25 bg-[var(--dark-1)] group-hover:border-white/50',
                )}
              />
              <span className="flex flex-col">
                <span
                  className={cn(
                    'font-mono text-base font-bold tabular-nums transition-colors',
                    isActive
                      ? 'text-[var(--color-text-base)]'
                      : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-base)]',
                  )}
                >
                  {m.year}
                </span>
                <span
                  className={cn(
                    'hidden text-xs transition-colors md:block',
                    isActive
                      ? 'text-[var(--aurora-violet-light)]'
                      : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-text-base)]',
                  )}
                >
                  {m.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Story panel — terminal-style log viewer */}
      <div
        id="story-panel"
        role="tabpanel"
        aria-labelledby={`story-tab-${displayIndex}`}
        tabIndex={0}
        className="terminal-card mt-6 lg:mt-0"
      >
        <div className="terminal-bar">
          <div className="flex items-center gap-2">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="ml-3 font-mono text-xs text-white/50">story/{active.year}.log</span>
        </div>

        <div
          className={cn(
            'story-panel min-h-[230px] p-6 md:p-8',
            phase === 'exiting' && 'is-exiting',
            phase === 'entering' && 'is-entering',
          )}
        >
          <p
            className="font-mono text-sm text-white/35"
            aria-hidden
          >
            {'>'} cat story/{active.year}.log
          </p>
          <p className="mt-5 font-mono text-sm text-[var(--aurora-violet-light)]">
            # {active.year} · {active.label}
          </p>
          <h3 className="mt-2 text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
            <span className="text-aurora-sweep">{active.title}</span>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            {active.body}
          </p>
          <p
            className="mt-6 font-mono text-sm text-white/30"
            aria-hidden
          >
            {'>'} <span className="about-cursor" />
          </p>
        </div>
      </div>
    </div>
  );
}
