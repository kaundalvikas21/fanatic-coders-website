'use client';

import { useRef, useState } from 'react';
import { Code2, Database, Brain, TrendingUp, Bot, Link, LineChart } from 'lucide-react';
import type { ElementType, KeyboardEvent } from 'react';
import { RevealSection } from '@/components/ui/RevealSection';
import type { SimpleIcon } from 'simple-icons';
import {
  siReact,
  siVuedotjs,
  siAngular,
  siSvelte,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siSass,
  siNodedotjs,
  siPython,
  siDjango,
  siLaravel,
  siPostgresql,
  siMongodb,
  siGraphql,
  siRedis,
  siTensorflow,
  siPytorch,
  siScikitlearn,
  siKeras,
  siPandas,
  siNumpy,
  siJupyter,
  siGoogleads,
  siGoogleanalytics,
  siMeta,
  siMailchimp,
  siHubspot,
  siSemrush,
} from 'simple-icons';
import TechLogo from '@/components/ui/TechLogo';

interface Tech {
  name: string;
  brandIcon: SimpleIcon | null;
  FallbackIcon?: ElementType;
}

interface Category {
  id: string;
  name: string;
  Icon: ElementType;
  accent: string;
  technologies: Tech[];
}

const categories: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    Icon: Code2,
    accent: '#7c3aed',
    technologies: [
      { name: 'React', brandIcon: siReact },
      { name: 'Vue.js', brandIcon: siVuedotjs },
      { name: 'Angular', brandIcon: siAngular },
      { name: 'Svelte', brandIcon: siSvelte },
      { name: 'Next.js', brandIcon: siNextdotjs },
      { name: 'TypeScript', brandIcon: siTypescript },
      { name: 'Tailwind CSS', brandIcon: siTailwindcss },
      { name: 'SASS', brandIcon: siSass },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    Icon: Database,
    accent: '#2563eb',
    technologies: [
      { name: 'Node.js', brandIcon: siNodedotjs },
      { name: 'Python', brandIcon: siPython },
      { name: 'Django', brandIcon: siDjango },
      { name: 'Laravel', brandIcon: siLaravel },
      { name: 'PostgreSQL', brandIcon: siPostgresql },
      { name: 'MongoDB', brandIcon: siMongodb },
      { name: 'GraphQL', brandIcon: siGraphql },
      { name: 'Redis', brandIcon: siRedis },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & ML',
    Icon: Brain,
    accent: '#06b6d4',
    technologies: [
      { name: 'TensorFlow', brandIcon: siTensorflow },
      { name: 'PyTorch', brandIcon: siPytorch },
      { name: 'Scikit-learn', brandIcon: siScikitlearn },
      { name: 'OpenAI', brandIcon: null, FallbackIcon: Bot },
      { name: 'Keras', brandIcon: siKeras },
      { name: 'Pandas', brandIcon: siPandas },
      { name: 'NumPy', brandIcon: siNumpy },
      { name: 'Jupyter', brandIcon: siJupyter },
    ],
  },
  {
    id: 'digital',
    name: 'Digital Marketing',
    Icon: TrendingUp,
    accent: '#10b981',
    technologies: [
      { name: 'Google Ads', brandIcon: siGoogleads },
      { name: 'Google Analytics', brandIcon: siGoogleanalytics },
      { name: 'Meta Ads', brandIcon: siMeta },
      { name: 'Mailchimp', brandIcon: siMailchimp },
      { name: 'HubSpot', brandIcon: siHubspot },
      { name: 'Semrush', brandIcon: siSemrush },
      { name: 'Ahrefs', brandIcon: null, FallbackIcon: Link },
      { name: 'Moz', brandIcon: null, FallbackIcon: LineChart },
    ],
  },
];

export default function TechStackSection() {
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [fadeKey, setFadeKey] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function switchCategory(cat: Category) {
    setActiveCat(cat);
    setFadeKey((k) => k + 1);
  }

  // Roving-tabindex keyboard nav across the category tabs (WAI-ARIA tablist).
  function onTabsKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const cur = categories.findIndex((c) => c.id === activeCat.id);
    const last = categories.length - 1;
    let next = cur;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = cur === last ? 0 : cur + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = cur === 0 ? last : cur - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    switchCategory(categories[next]);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      className="techstack-section section-y relative overflow-hidden"
      id="tech-stack"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--dark-3)' }}
      />
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-35"
        style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <RevealSection className="text-center mb-16">
          <div className="preheading-code">tech.stack</div>
          <h2 className="heading-code mt-2">
            our.<span style={{ color: 'var(--aurora-violet-light)' }}>technologies</span>()
          </h2>
          <p className="subheading-code mt-3">{'// the tools we reach for to build and ship'}</p>
        </RevealSection>

        {/* Category tabs */}
        <RevealSection
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="tablist"
          aria-label="Technology categories"
        >
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              id={`tech-tab-${cat.id}`}
              className={`cat-tab flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200${activeCat.id === cat.id ? ' cat-active' : ''}`}
              style={{ '--cat-accent': cat.accent } as React.CSSProperties}
              role="tab"
              aria-selected={activeCat.id === cat.id}
              aria-controls={`tech-category-${cat.id}`}
              tabIndex={activeCat.id === cat.id ? 0 : -1}
              onClick={() => switchCategory(cat)}
              onKeyDown={onTabsKeyDown}
            >
              <cat.Icon
                size={16}
                aria-hidden
              />
              {cat.name}
            </button>
          ))}
        </RevealSection>

        {/* Tech grid — key-based remount triggers CSS fade-in */}
        <div
          key={fadeKey}
          id={`tech-category-${activeCat.id}`}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto tech-grid-fade"
          role="tabpanel"
          aria-labelledby={`tech-tab-${activeCat.id}`}
          tabIndex={0}
        >
          {activeCat.technologies.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-card group rounded-xl p-5"
              style={
                {
                  '--tech-accent': activeCat.accent,
                  transitionDelay: `${i * 30}ms`,
                } as React.CSSProperties
              }
            >
              <div className="flex flex-col items-center gap-3">
                <div className="tech-icon w-14 h-14 rounded-xl flex items-center justify-center">
                  {tech.brandIcon ? (
                    <TechLogo
                      icon={tech.brandIcon}
                      size={28}
                    />
                  ) : tech.FallbackIcon ? (
                    <tech.FallbackIcon
                      size={28}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <span className="text-sm text-blue-100/60 group-hover:text-white transition-colors text-center font-mono">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest code-voice closer (decorative) */}
        <p
          className="mt-14 text-center font-mono text-xs text-blue-100/45"
          aria-hidden
        >
          {'// we pick the right tool for the job, not the trendiest'}
        </p>
      </div>
    </section>
  );
}
