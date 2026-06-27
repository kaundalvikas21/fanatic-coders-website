'use client';

import { useEffect, useRef, useState, startTransition } from 'react';
import { ArrowRight, BarChart2, ChevronDown, Target, Users, Zap } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import HeroTerminal from './HeroTerminal';
import HeroStat from './HeroStat';
import { SITE_STATS } from '@/lib/site-stats';

// Two compact, balanced lines; gradient on the two focal words.
const headingLines = [
  ['We', 'build', 'production'],
  ['software', 'that', 'ships.'],
];
const SWEEP_WORDS = new Set(['production', 'software']);

const trustStats = [
  { value: SITE_STATS.projectsDelivered, label: 'projects shipped', Icon: BarChart2 },
  { value: SITE_STATS.clientRetention, label: 'client retention', Icon: Target },
  { value: SITE_STATS.usersReached, label: 'users reached', Icon: Users },
  { value: SITE_STATS.yearsShipping, label: 'years building', Icon: Zap },
];

const codeSnippets = [
  '{ code }',
  '<dev/>',
  'npm run',
  'git push',
  'async()',
  '.then()',
  'useState',
  '[...arr]',
  '${var}',
  '=> func',
];

type FloatNode = { node: HTMLElement; x: number; y: number; idx: number; ox: number; oy: number };

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  // Gated separately so the number count-up only starts once the strip has
  // finished revealing (reveal: 100ms class flip + 700ms delay + 500ms ease).
  const [statsActive, setStatsActive] = useState(false);
  // Flips after the whole entrance has played so will-change can be released.
  const [motionSettled, setMotionSettled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      startTransition(() => {
        setHeadingVisible(true);
        setStatsActive(true);
        setMotionSettled(true);
      });
    } else {
      setTimeout(() => setHeadingVisible(true), 100);
      setTimeout(() => setStatsActive(true), 1350);
      setTimeout(() => setMotionSettled(true), 3200);
    }

    const container = containerRef.current;
    if (!container) return;

    const elements: FloatNode[] = [];
    let frameId: number | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeTimer: ReturnType<typeof setTimeout> | null = null;
    let pointerX = 0;
    let pointerY = 0;
    const cols = 5;
    const rows = 2;

    codeSnippets.forEach((snippet, idx) => {
      const node = document.createElement('div');
      node.className = 'code-element absolute text-sm font-mono';
      node.textContent = snippet;
      container.appendChild(node);
      if (prefersReducedMotion) {
        node.style.opacity = '0.32';
      } else {
        // Wash chips in (0 -> 0.32) on load, staggered, via the .code-element opacity
        // transition. Part of the same entrance cascade as the content.
        node.style.opacity = '0';
        node.style.transitionDelay = `${600 + idx * 60}ms`;
      }
      // Random offset rolled once per mount: every refresh scatters the chips
      // differently, but the value is reused on resize so they don't jump mid-session.
      elements.push({ node, x: 0, y: 0, idx, ox: Math.random(), oy: Math.random() });
    });

    if (!prefersReducedMotion) {
      requestAnimationFrame(() =>
        elements.forEach((el) => {
          el.node.style.opacity = '0.32';
        }),
      );
      // Once the wash finishes, drop the stagger delay so pointer parallax stays instant.
      fadeTimer = setTimeout(
        () =>
          elements.forEach((el) => {
            el.node.style.transitionDelay = '';
          }),
        1500,
      );
    }

    // Position from current container size. Deterministic per-index offset so a
    // resize repositions the grid cleanly instead of leaving stale coordinates.
    function layout() {
      const cellW = container!.offsetWidth / cols;
      const cellH = Math.max(container!.offsetHeight, 400) / rows;
      elements.forEach((el) => {
        const col = el.idx % cols;
        const row = Math.floor(el.idx / cols);
        el.x = col * cellW + cellW * (0.2 + el.ox * 0.6);
        el.y = row * cellH + cellH * (0.2 + el.oy * 0.6);
        el.node.style.left = `${el.x}px`;
        el.node.style.top = `${el.y}px`;
      });
    }
    layout();

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
      if (frameId === null) {
        frameId = requestAnimationFrame(() => {
          frameId = null;
          elements.forEach(({ node, x, y }) => {
            const dx = pointerX - x;
            const dy = pointerY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 300) {
              const scale = 1 - dist / 300;
              const angle = Math.atan2(dy, dx);
              const push = 40 * scale;
              node.style.transform = `translate(${-Math.cos(angle) * push}px, ${-Math.sin(angle) * push}px) scale(${1 + scale * 0.2})`;
              node.style.opacity = (0.4 + scale * 0.5).toString();
            } else {
              node.style.transform = 'translate(0,0) scale(1)';
              node.style.opacity = '0.32';
            }
          });
        });
      }
    }

    function onResize() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 150);
    }

    if (!prefersReducedMotion) {
      container.addEventListener('mousemove', onMouseMove, { passive: true });
    }
    window.addEventListener('resize', onResize);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (frameId !== null) cancelAnimationFrame(frameId);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      elements.forEach((el) => el.node.remove());
    };
  }, []);

  return (
    <div
      className={`hero-root relative min-h-screen overflow-hidden${motionSettled ? ' hero-settled' : ''}`}
    >
      {/* Aurora mesh background */}
      <div className="aurora-mesh-bg absolute inset-0" />

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 dot-grid pointer-events-none opacity-50"
        style={{ maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)' }}
      />

      {/* Floating code elements (decorative) */}
      <div
        ref={containerRef}
        aria-hidden
        className="absolute inset-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
        }}
      />

      {/* Main content */}
      <div className="hero-shell relative z-10 container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal badge (isolated component) */}
          <HeroTerminal />

          {/* Kinetic heading (two compact lines) */}
          <h1 className="hero-h1 mb-6">
            {headingLines.map((line, li) => (
              <span
                key={li}
                className="block"
              >
                {line.map((word, wi) => {
                  const idx = li * 3 + wi;
                  return (
                    <span
                      key={word + idx}
                      className={`word-reveal inline-block${headingVisible ? ' visible' : ''}`}
                      style={{ animationDelay: `${idx * 80}ms`, marginRight: '0.25em' }}
                    >
                      {SWEEP_WORDS.has(word) ? (
                        <span className="text-aurora-sweep">{word}</span>
                      ) : (
                        word
                      )}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Subheading */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-[#f4f6ff] mb-12 max-w-2xl mx-auto subheading-reveal${headingVisible ? ' visible' : ''}`}
          >
            Full-stack engineering, design, and growth for FinTech, HealthTech, and SaaS companies.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 cta-reveal${headingVisible ? ' visible' : ''}`}
          >
            <GradientButton href="/contact">
              startProject
              <ArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden
              />
            </GradientButton>
            <GradientButton
              href="#services"
              variant="secondary"
            >
              exploreServices
              <ArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden
              />
            </GradientButton>
          </div>

          {/* Credibility strip */}
          <div
            className={`hero-trust stats-card glass-card rounded-xl${headingVisible ? ' visible' : ''}`}
            style={{ '--stagger': 0 } as React.CSSProperties}
          >
            {trustStats.map((stat) => (
              <HeroStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                Icon={stat.Icon}
                active={statsActive}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue: hands the hero off to the first section below */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className={`hero-scroll-cue${headingVisible ? ' visible' : ''}`}
      >
        <ChevronDown
          size={22}
          aria-hidden
        />
      </a>
    </div>
  );
}
