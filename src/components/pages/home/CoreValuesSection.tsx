import type { ElementType } from 'react';
import Link from 'next/link';
import { Hammer, Wrench, TrendingUp, ArrowRight } from 'lucide-react';
import { RevealSection } from '@/components/ui/RevealSection';

interface WorkStage {
  id: string;
  step: string;
  label: string;
  title: string;
  Icon: ElementType;
  /** rgba border + tag tints, all on the aurora palette. */
  borderColor: string;
  tagColor: string;
  /** CSS var for the accent (aurora light tone). */
  iconColor: string;
  description: string;
  /** Honest one-line mono note in the code voice. */
  note: string;
}

const stages: WorkStage[] = [
  {
    id: 'build',
    step: '01',
    label: 'build()',
    title: 'Build',
    Icon: Hammer,
    borderColor: 'rgba(124,58,237,0.3)',
    tagColor: 'rgba(124,58,237,0.12)',
    iconColor: 'var(--aurora-violet-light)',
    description:
      'A small senior team builds your product with weekly demos, so you always see where it stands.',
    note: '// small senior team, weekly demos',
  },
  {
    id: 'maintain',
    step: '02',
    label: 'maintain()',
    title: 'Maintain',
    Icon: Wrench,
    borderColor: 'rgba(37,99,235,0.3)',
    tagColor: 'rgba(37,99,235,0.12)',
    iconColor: 'var(--aurora-blue-light)',
    description:
      'We keep what we ship running: proactive monitoring, updates, and quick fixes when something breaks.',
    note: '// proactive monitoring, quick fixes',
  },
  {
    id: 'grow',
    step: '03',
    label: 'grow()',
    title: 'Grow',
    Icon: TrendingUp,
    borderColor: 'rgba(16,185,129,0.3)',
    tagColor: 'rgba(16,185,129,0.12)',
    iconColor: 'var(--aurora-green-light)',
    description:
      'We improve what works: tune performance, sharpen the funnel, and ship the next thing that moves the metric.',
    note: '// measure, optimize, scale',
  },
];

export default function CoreValuesSection() {
  return (
    <section
      className="section-y relative overflow-hidden"
      id="how-we-work"
    >
      {/* Aurora section background */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--dark-3)' }}
      />
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <RevealSection className="text-center mb-14">
          <div className="preheading-code">our.process</div>
          <h2 className="heading-code mt-2">
            how.<span style={{ color: 'var(--aurora-violet-light)' }}>weWork</span>()
          </h2>
          <p className="subheading-code mt-3">{'// build, maintain, and grow what we ship'}</p>
        </RevealSection>

        {/* Milestone timeline: all three stages visible on one connected track */}
        <RevealSection className="hww-tl-wrap max-w-4xl mx-auto">
          <span
            className="hww-track"
            aria-hidden
          />
          <ol className="hww-timeline">
            {stages.map((stage) => (
              <li
                key={stage.id}
                className="hww-ms"
                style={
                  {
                    '--accent-tag': stage.tagColor,
                    '--accent-border': stage.borderColor,
                    '--icon-color': stage.iconColor,
                  } as React.CSSProperties
                }
              >
                <span
                  className="hww-node"
                  aria-hidden
                >
                  {stage.step}
                </span>

                <div className="hww-ms-body">
                  <span
                    className="inline-flex items-center gap-2 font-mono text-xs font-semibold mb-1"
                    style={{ color: `color-mix(in srgb, ${stage.iconColor} 80%, white)` }}
                  >
                    <stage.Icon
                      size={15}
                      aria-hidden
                    />
                    {stage.label}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#fafafa] mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-blue-100/65 text-sm leading-relaxed">{stage.description}</p>
                  <p className="font-mono text-xs text-blue-100/65 mt-3">{stage.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </RevealSection>

        {/* Soft link forward */}
        <RevealSection className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="hww-link group inline-flex items-center gap-2 font-mono text-sm"
          >
            {'// scope your project'}
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </RevealSection>
      </div>
    </section>
  );
}
