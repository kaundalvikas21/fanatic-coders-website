'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';
import type { TeamMember } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';
import { IconGithub, IconLinkedin } from '@/components/ui/SocialIcons';

// Unsplash portraits (allowed in next.config.ts). Replace with real team photos later.
const team: TeamMember[] = [
  {
    id: 'ava',
    name: 'Ava Reyes',
    role: 'Founder & Principal Engineer',
    bio: '15 years building product platforms. Obsessed with DX and shipping.',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=faces',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: 'noah',
    name: 'Noah Patel',
    role: 'Head of Design',
    bio: 'Turns fuzzy ideas into interfaces people love to use.',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces',
    socials: { linkedin: '#' },
  },
  {
    id: 'mia',
    name: 'Mia Chen',
    role: 'Lead Frontend Engineer',
    bio: 'React performance nerd. Ships accessible, buttery-smooth UI.',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&h=800&fit=crop&crop=faces',
    socials: { github: '#' },
  },
  {
    id: 'liam',
    name: "Liam O'Brien",
    role: 'Backend & Infra Lead',
    bio: "Keeps systems fast, observable, and awake at 3am so you aren't.",
    avatarUrl:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop&crop=faces',
    socials: { github: '#', linkedin: '#' },
  },
  {
    id: 'sara',
    name: 'Sara Kim',
    role: 'Product Strategist',
    bio: 'Connects business goals to the roadmap and the metrics that matter.',
    avatarUrl:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=800&fit=crop&crop=faces',
    socials: { linkedin: '#' },
  },
  {
    id: 'omar',
    name: 'Omar Haddad',
    role: 'DevOps Engineer',
    bio: 'Pipelines, IaC, and zero-downtime deploys are his love language.',
    avatarUrl:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&h=800&fit=crop&crop=faces',
    socials: { github: '#', linkedin: '#' },
  },
];

export function TeamSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  // Reachable snap positions (cards minus what fits in view, + 1).
  const [pages, setPages] = useState(team.length);

  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return track?.clientWidth ?? 0;
    const a = track.children[0] as HTMLElement;
    const b = track.children[1] as HTMLElement;
    return b.offsetLeft - a.offsetLeft;
  }, []);

  const recompute = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    const maxScroll = track.scrollWidth - track.clientWidth;
    const count = step > 0 ? Math.round(maxScroll / step) + 1 : team.length;
    setPages(Math.max(1, Math.min(team.length, count)));
  }, [stepWidth]);

  useEffect(() => {
    const raf = requestAnimationFrame(recompute);
    const id = setTimeout(recompute, 300);
    window.addEventListener('resize', recompute);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(id);
      window.removeEventListener('resize', recompute);
    };
  }, [recompute]);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const idx = Math.max(0, Math.min(pages - 1, i));
      const child = track.children[idx] as HTMLElement | undefined;
      if (!child) return;
      track.scrollTo({ left: child.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    },
    [pages, reduced],
  );

  const goNext = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    const current = step > 0 ? Math.round(track.scrollLeft / step) : 0;
    goTo(current >= pages - 1 ? 0 : current + 1);
  }, [goTo, pages, stepWidth]);

  const goPrev = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    const current = step > 0 ? Math.round(track.scrollLeft / step) : 0;
    goTo(current <= 0 ? pages - 1 : current - 1);
  }, [goTo, pages, stepWidth]);

  const onScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const track = trackRef.current;
      if (!track) return;
      const step = stepWidth();
      if (step <= 0) return;
      setActive(Math.max(0, Math.min(pages - 1, Math.round(track.scrollLeft / step))));
    });
  }, [pages, stepWidth]);

  // Autoplay (paused via the button, on hover/focus, or reduced motion).
  useEffect(() => {
    if (paused || hovered || reduced) return;
    intervalRef.current = setInterval(goNext, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, hovered, reduced, goNext]);

  return (
    <section
      id="team"
      className="scroll-mt-28 section-y relative overflow-hidden"
      style={{ background: 'var(--dark-1)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header + pause control (matches home portfolio.showcase) */}
        <RevealSection className="text-center">
          <SectionHeading
            badge="team.roster"
            title={
              <>
                meet.<span className="function">theCrew</span>()
              </>
            }
            comment="// senior people who do the actual work"
          />
          {!reduced && (
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--aurora-violet)_10%,transparent)] px-4 py-2 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-1)]"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? (
                <>
                  <Play
                    size={14}
                    aria-hidden
                  />{' '}
                  Resume team carousel
                </>
              ) : (
                <>
                  <Pause
                    size={14}
                    aria-hidden
                  />{' '}
                  Pause team carousel
                </>
              )}
            </button>
          )}
        </RevealSection>

        <RevealSection
          className="mt-12 max-w-6xl mx-auto"
          role="group"
          aria-roledescription="carousel"
          aria-label="Team members"
        >
          <div
            className="flex items-center gap-3 md:gap-5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={() => setHovered(false)}
          >
            {/* Arrow outside the cards (desktop) */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous team members"
              className="hidden md:flex shrink-0 items-center justify-center h-11 w-11 rounded-full border border-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)] text-[var(--aurora-violet-light)] backdrop-blur-sm transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] hover:text-[var(--color-text-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-1)]"
            >
              <ArrowLeft
                size={22}
                aria-hidden
              />
            </button>

            {/* Track */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex-1 min-w-0 flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none"
            >
              {team.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next team members"
              className="hidden md:flex shrink-0 items-center justify-center h-11 w-11 rounded-full border border-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)] text-[var(--aurora-violet-light)] backdrop-blur-sm transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] hover:text-[var(--color-text-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-1)]"
            >
              <ArrowRight
                size={22}
                aria-hidden
              />
            </button>
          </div>

          {/* Pager: dots, with prev/next arrows joining the row on mobile (md+ uses the
              flanking card arrows instead, so only one arrow pair is ever in the a11y tree). */}
          <div className="mt-10 flex justify-center items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous team members"
              className="md:hidden flex shrink-0 items-center justify-center h-11 w-11 rounded-full border border-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)] text-[var(--aurora-violet-light)] transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] hover:text-[var(--color-text-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-1)]"
            >
              <ArrowLeft
                size={18}
                aria-hidden
              />
            </button>

            <div
              className="flex items-center gap-2 sm:gap-4"
              role="tablist"
              aria-label="Select team slide"
            >
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)]"
                >
                  <span className="absolute h-1 w-5 rounded-full bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)]" />
                  <span
                    className="absolute h-1 w-5 rounded-full bg-[var(--aurora-violet-light)] transition-transform duration-300 motion-reduce:transition-none"
                    style={{
                      transform: `scaleX(${active === i ? 1 : 0})`,
                      transformOrigin: 'left',
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next team members"
              className="md:hidden flex shrink-0 items-center justify-center h-11 w-11 rounded-full border border-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] bg-[color-mix(in_oklab,var(--aurora-violet)_20%,transparent)] text-[var(--aurora-violet-light)] transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] hover:text-[var(--color-text-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aurora-violet-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--dark-1)]"
            >
              <ArrowRight
                size={18}
                aria-hidden
              />
            </button>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group team-card-glow shrink-0 grow-0 basis-[82%] sm:basis-[46%] lg:basis-[31.5%] snap-start relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1">
      <Image
        src={member.avatarUrl}
        alt={member.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 32vw"
      />
      {/* base gradient; extra scrim is on by default (touch) and hover-gated on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-black/45 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100" />

      {/* content pinned to bottom; bio + socials always show on touch, reveal on hover/focus at lg+ */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-xl font-bold text-[var(--color-text-base)] leading-tight">
          {member.name}
        </h3>
        <p className="mt-1 text-xs font-mono text-[var(--aurora-violet-light)]">{member.role}</p>

        <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-300 ease-out lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100 lg:group-focus-within:grid-rows-[1fr] lg:group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {member.bio}
            </p>
            {(() => {
              // Only render a link when the URL is real (placeholder "#" entries are skipped,
              // so we never ship a focusable link that goes nowhere).
              const gh = realUrl(member.socials?.github);
              const li = realUrl(member.socials?.linkedin);
              if (!gh && !li) return null;
              return (
                <div className="mt-4 flex gap-3">
                  {gh && (
                    <SocialLink
                      href={gh}
                      label={`${member.name} on GitHub`}
                    >
                      <IconGithub size={16} />
                    </SocialLink>
                  )}
                  {li && (
                    <SocialLink
                      href={li}
                      label={`${member.name} on LinkedIn`}
                    >
                      <IconLinkedin size={16} />
                    </SocialLink>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

// Treats placeholder "#" (and empty) as "no link" so dead links never render.
function realUrl(url?: string): string | null {
  return url && url !== '#' ? url : null;
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 backdrop-blur-sm transition-colors hover:bg-[color-mix(in_oklab,var(--aurora-violet)_30%,transparent)] hover:text-white"
    >
      {children}
    </a>
  );
}
