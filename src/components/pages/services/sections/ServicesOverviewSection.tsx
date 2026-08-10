import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';
import { getService, iconColor, type Accent } from '../data';

const accentMap: Record<Accent, { border: string; icon: string; glow: string; tag: string }> = {
  violet: {
    border: 'rgba(124,58,237,0.22)',
    icon: 'rgba(124,58,237,0.10)',
    glow: '0 0 0 1px rgba(124,58,237,0.45), 0 10px 34px rgba(124,58,237,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(124,58,237,0.08)',
  },
  cyan: {
    border: 'rgba(6,182,212,0.22)',
    icon: 'rgba(6,182,212,0.10)',
    glow: '0 0 0 1px rgba(6,182,212,0.45), 0 10px 34px rgba(6,182,212,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(6,182,212,0.08)',
  },
  green: {
    border: 'rgba(16,185,129,0.22)',
    icon: 'rgba(16,185,129,0.10)',
    glow: '0 0 0 1px rgba(16,185,129,0.45), 0 10px 34px rgba(16,185,129,0.18), inset 0 1px 0 rgba(255,255,255,0.05)',
    tag: 'rgba(16,185,129,0.08)',
  },
};

function accentVars(accent: Accent): CSSProperties {
  const a = accentMap[accent];
  // `.bento-card` carries global nth-child grid placement (for the home 4-col
  // `.services-bento`); reset it so this section keeps its own 3-col grid.
  return {
    '--accent-border': a.border,
    '--accent-icon': a.icon,
    '--accent-glow': a.glow,
    '--accent-tag': a.tag,
    background: '#00000063',
    gridColumn: 'auto',
    gridRow: 'auto',
  } as CSSProperties;
}

interface CardConfig {
  slug: string;
  accent: Accent;
  bullets: string[];
}

const cards: CardConfig[] = [
  {
    slug: 'web-development',
    accent: 'violet',
    bullets: [
      'Server-rendered React',
      'Type-safe APIs',
      'Performance budgets',
      'Accessible by default',
    ],
  },
  {
    slug: 'ecommerce',
    accent: 'cyan',
    bullets: ['Headless commerce', 'Payments and tax', 'Cart and checkout', 'Inventory sync'],
  },
  {
    slug: 'mobile-apps',
    accent: 'violet',
    bullets: ['React Native', 'Offline support', 'Push notifications', 'Store release'],
  },
  {
    slug: 'design',
    accent: 'cyan',
    bullets: ['Design systems', 'Prototypes', 'User research', 'Handoff specs'],
  },
  {
    slug: 'cloud',
    accent: 'green',
    bullets: ['CI/CD pipelines', 'Containers', 'Monitoring', 'Cost control'],
  },
];

export function ServicesOverviewSection() {
  return (
    <section
      id="services-overview"
      className="section-y relative overflow-hidden"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection>
          <SectionHeading
            badge="what.we.do"
            title={
              <>
                our.<span className="function">services</span>()
              </>
            }
            comment="// five core practices, one team"
          />
        </RevealSection>

        <RevealSection
          stagger
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {cards.map((card) => {
            const entry = getService(card.slug);
            if (!entry) return null;
            const { service } = entry;
            const color = iconColor[card.accent];
            return (
              <Link
                key={card.slug}
                href={`/services/${card.slug}`}
                className="no-underline group/card block"
              >
                <div
                  className="bento-card rounded-2xl p-6 h-full"
                  style={accentVars(card.accent)}
                >
                  <div className="relative z-[1] flex flex-col h-full">
                    <div className="icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                      <service.Icon
                        size={20}
                        style={{ color }}
                        aria-hidden
                      />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-blue-100/60 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {card.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2 text-sm text-blue-100/70"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ background: color }}
                            aria-hidden
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <span
                      className="mt-auto inline-flex items-center gap-1.5 text-sm font-mono"
                      style={{ color }}
                    >
                      viewService
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/card:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          <div
            className="bento-card rounded-2xl p-6 h-full"
            style={accentVars('violet')}
          >
            <div className="relative z-[1] flex flex-col justify-center h-full">
              <p className="subheading-code">{'// not sure where to start?'}</p>
              <h3 className="text-xl font-bold text-white mt-3 mb-3">Tell us the problem.</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed mb-6">
                We&apos;ll help you pick the right service and scope it with you. No pressure.
              </p>
              <GradientButton
                href="/contact#contact-form"
                variant="secondary"
                size="sm"
              >
                talkToUs
              </GradientButton>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
