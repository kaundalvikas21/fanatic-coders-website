'use client';

import Image from 'next/image';
import { Search, X, Code2, BookOpen, Compass, Rss } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { RevealSection } from '@/components/ui/RevealSection';
import { categories } from '../data';
import { useBlogFilter } from '../BlogFilterContext';

const valueProps: { Icon: LucideIcon; label: string; sub: string }[] = [
  {
    Icon: Code2,
    label: 'By the people who ship',
    sub: 'Working engineers and designers, not ghostwriters.',
  },
  {
    Icon: BookOpen,
    label: 'Real production lessons',
    sub: 'Decisions from live projects, no filler.',
  },
  {
    Icon: Compass,
    label: 'Engineering, design, growth',
    sub: 'Craft across the work we actually do.',
  },
  { Icon: Rss, label: 'Fresh thinking, often', sub: 'New deep-dives from the team regularly.' },
];

export function BlogHeroSection() {
  const { query, setQuery, category, setCategory, tag, setTag } = useBlogFilter();

  return (
    <section
      id="blog-hero"
      className="relative overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8 min-h-[100svh] flex flex-col"
      style={{ background: 'var(--dark-1)' }}
    >
      <Image
        src="/blog_hero_bg.png"
        alt=""
        fill
        priority
        aria-hidden
        sizes="100vw"
        className="object-cover hero-bg-img"
      />
      <div
        className="hero-bg-scrim absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="hero-bg-sweep"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 flex w-full flex-1 flex-col justify-center">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <div className="preheading-code">blog.module</div>
          <h1 className="hero-h1 mt-3">
            Notes from the people who <span className="text-aurora-sweep">ship</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-blue-100/70 leading-relaxed max-w-2xl mx-auto">
            Practical writing from the team on architecture decisions, design craft, and the lessons
            we learn shipping real products.
          </p>

          {/* Search */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-100/40"
              aria-hidden
            />
            <label
              htmlFor="blog-search"
              className="sr-only"
            >
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full bg-white/5 border border-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-blue-100/35 outline-none transition-colors focus:border-indigo-400/60 focus:bg-white/[0.07]"
            />
          </div>

          {/* Category chips */}
          <div
            className="mt-5 flex flex-wrap gap-2 justify-center"
            role="tablist"
            aria-label="Filter posts by category"
          >
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-mono transition-colors ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/40'
                      : 'bg-white/5 text-blue-100/60 border border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Active tag filter */}
          {tag !== '' && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setTag('')}
                aria-label={`Clear tag filter ${tag}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1.5 text-sm font-mono text-indigo-200 border border-indigo-400/40 transition-colors hover:bg-indigo-500/30 hover:text-white"
              >
                #{tag}
                <X
                  size={13}
                  aria-hidden
                />
              </button>
            </div>
          )}
        </RevealSection>

        {/* Why read here — trust + expectation, no overlap with the featured lead or Popular section below */}
        <RevealSection
          stagger
          className="mt-10 grid w-full max-w-4xl mx-auto grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {valueProps.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/8 bg-white/2 p-4 text-center"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/3 text-aurora-violet-light">
                <Icon
                  size={18}
                  aria-hidden
                />
              </span>
              <div>
                <div className="text-sm font-bold text-white">{label}</div>
                <p className="mt-1 text-xs text-blue-100/60 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
