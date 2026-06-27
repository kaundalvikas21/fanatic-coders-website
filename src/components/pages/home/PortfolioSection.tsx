'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Code2, Play, Pause } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';
import { projects as allProjects } from '@/components/pages/portfolio/data';

// Home showcase pulls the first four real case studies from the single
// portfolio source of truth so copy, imagery, and links never drift.
const featured = allProjects.slice(0, 4).map((p) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  image: p.imageUrl ?? '',
  category: p.industry ?? p.tags[0] ?? '',
  tech: (p.tech ?? p.tags).slice(0, 5),
  stats: p.stats.slice(0, 3),
  href: `/portfolio/${p.id}`,
}));

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideKey, setSlideKey] = useState(0); // drives fade-in re-trigger
  const [isHovered, setIsHovered] = useState(false);

  const project = featured[currentIndex];

  function goTo(i: number) {
    setCurrentIndex(i);
    setSlideKey((k) => k + 1);
  }
  function next() {
    goTo((currentIndex + 1) % featured.length);
  }
  function prev() {
    goTo((currentIndex - 1 + featured.length) % featured.length);
  }

  // Point the interval at the latest `next` without rebuilding the timer every
  // slide (classic useInterval): the auto-advance effect depends only on whether
  // the carousel is active, so the 5s cadence stays steady.
  const savedNext = useRef(next);
  useEffect(() => {
    savedNext.current = next;
  });

  // Auto-advance, paused on hover, on manual pause, or under reduced motion.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || isPaused || isHovered) return;
    const id = setInterval(() => savedNext.current(), 5000);
    return () => clearInterval(id);
  }, [isPaused, isHovered]);

  return (
    <section
      className="min-h-screen section-y relative overflow-hidden"
      id="portfolio"
      style={{ background: 'var(--dark-3)' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 -z-10">
        <div className="portfolio-bg-grid absolute inset-0 opacity-10" />
      </div>

      <RevealSection
        stagger
        className="container mx-auto px-4"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="preheading-code">portfolio.showcase</div>
          <h2 className="heading-code">
            case_studies.<span className="function">featured</span>()
          </h2>
          <p className="subheading-code">{'// Real builds, shipped. Pick one to read the work.'}</p>
          <button
            type="button"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.1)] px-4 py-2 text-sm text-blue-100/80 transition-colors hover:bg-[rgba(124,58,237,0.2)]"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
          >
            {isPaused ? (
              <>
                <Play
                  size={14}
                  aria-hidden
                />{' '}
                Resume project carousel
              </>
            ) : (
              <>
                <Pause
                  size={14}
                  aria-hidden
                />{' '}
                Pause project carousel
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
          {`Project ${currentIndex + 1} of ${featured.length}: ${project.title}, ${project.category}`}
        </p>

        <div className="max-w-6xl mx-auto">
          {/* Main showcase */}
          <div
            className="relative grid md:grid-cols-2 gap-8 items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Desktop prev arrow */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -translate-x-full -left-4 z-10 min-h-11 min-w-11 rounded-full bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] hover:bg-[rgba(124,58,237,0.3)] transition-colors border border-[rgba(124,58,237,0.3)] backdrop-blur-sm"
              aria-label="Previous featured project"
              onClick={prev}
            >
              <ArrowLeft
                size={24}
                aria-hidden
              />
            </button>

            {/* Desktop next arrow */}
            <button
              type="button"
              className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 translate-x-full -right-4 z-10 min-h-11 min-w-11 rounded-full bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] hover:bg-[rgba(124,58,237,0.3)] transition-colors border border-[rgba(124,58,237,0.3)] backdrop-blur-sm"
              aria-label="Next featured project"
              onClick={next}
            >
              <ArrowRight
                size={24}
                aria-hidden
              />
            </button>

            {/* Project image */}
            <div className="relative overflow-hidden rounded-2xl h-56 sm:h-72 md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(124,58,237,0.2)] to-transparent z-10" />
              <Image
                key={slideKey}
                src={project.image}
                alt={`${project.title}, ${project.category} project`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover portfolio-img-fade"
                loading="lazy"
              />
            </div>

            {/* Project info card */}
            <div
              className="portfolio-glass-card p-4 sm:p-8 rounded-2xl"
              key={`info-${slideKey}`}
            >
              <div className="portfolio-slide-in space-y-4 sm:space-y-6">
                {/* Category */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-sm font-mono bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] border border-[rgba(124,58,237,0.3)]">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold portfolio-gradient-text">
                  {project.title}
                </h3>

                <p className="text-blue-100/70 leading-relaxed">{project.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="portfolio-stat-card"
                    >
                      <div className="text-sm sm:text-lg md:text-xl font-bold text-[var(--aurora-violet-light)]">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-100/60">
                        {stat.caption ?? stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-sm py-1 px-3 rounded-full font-mono bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)]"
                    >
                      <Code2
                        size={12}
                        aria-hidden
                      />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <GradientButton href={project.href}>
                  viewCaseStudy
                  <ArrowRight
                    size={14}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    aria-hidden
                  />
                </GradientButton>
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="mt-6 flex md:hidden items-center justify-between gap-2">
            <button
              type="button"
              className="flex items-center justify-center min-h-11 min-w-11 rounded-full bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] border border-[rgba(124,58,237,0.3)] transition-colors hover:bg-[rgba(124,58,237,0.3)]"
              aria-label="Previous featured project"
              onClick={prev}
            >
              <ArrowLeft
                size={20}
                aria-hidden
              />
            </button>
            <div className="flex items-center gap-1">
              {featured.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full"
                  aria-label={`Go to ${p.title}`}
                  aria-current={currentIndex === i || undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="absolute h-1 w-5 rounded-full bg-[rgba(124,58,237,0.25)]" />
                  <span
                    className="absolute h-1 w-5 rounded-full bg-[var(--aurora-violet)] transition-transform duration-300"
                    style={{
                      transform: `scaleX(${currentIndex === i ? 1 : 0})`,
                      transformOrigin: 'left',
                    }}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="flex items-center justify-center min-h-11 min-w-11 rounded-full bg-[rgba(124,58,237,0.2)] text-[var(--aurora-violet-light)] border border-[rgba(124,58,237,0.3)] transition-colors hover:bg-[rgba(124,58,237,0.3)]"
              aria-label="Next featured project"
              onClick={next}
            >
              <ArrowRight
                size={20}
                aria-hidden
              />
            </button>
          </div>

          {/* Desktop dot navigation */}
          <div className="mt-12 hidden md:flex justify-center items-center gap-2">
            {featured.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full transition-all duration-300"
                aria-label={`Go to ${p.title}`}
                aria-current={currentIndex === i || undefined}
                onClick={() => goTo(i)}
              >
                <span className="absolute h-1 w-5 rounded-full bg-[rgba(124,58,237,0.25)]" />
                <span
                  className="absolute h-1 w-5 rounded-full bg-[var(--aurora-violet)] transition-transform duration-300"
                  style={{
                    transform: `scaleX(${currentIndex === i ? 1 : 0})`,
                    transformOrigin: 'left',
                  }}
                />
              </button>
            ))}
          </div>

          {/* View all */}
          <div className="mt-10 flex justify-center">
            <GradientButton
              href="/portfolio"
              variant="secondary"
            >
              viewAllProjects
              <ArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-1 transition-transform"
                aria-hidden
              />
            </GradientButton>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
