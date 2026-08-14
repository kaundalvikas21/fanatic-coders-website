import type { CSSProperties } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealSection } from '@/components/ui/RevealSection';
import { type Accent, type ServiceGroup, type ServiceItem, iconColor, accentToken } from '../data';

// Accent-tinted card vars built from the token via color-mix. `.bento-card`
// carries global nth-child grid placement (for the home 4-col `.services-bento`);
// reset gridColumn/gridRow so this section keeps its own 3-col grid.
function accentVars(accent: Accent): CSSProperties {
  const c = accentToken[accent];
  return {
    '--accent-border': `color-mix(in srgb, ${c} 22%, transparent)`,
    '--accent-icon': `color-mix(in srgb, ${c} 10%, transparent)`,
    '--accent-glow': `0 0 0 1px color-mix(in srgb, ${c} 45%, transparent), 0 10px 34px color-mix(in srgb, ${c} 18%, transparent), inset 0 1px 0 rgba(255,255,255,0.05)`,
    gridColumn: 'auto',
    gridRow: 'auto',
  } as CSSProperties;
}

export function ServiceCapabilities({
  service,
  group,
}: {
  service: ServiceItem;
  group: ServiceGroup;
}) {
  const color = iconColor[group.accent];
  const capabilities = service.capabilities ?? [];

  return (
    <section
      className="relative overflow-hidden section-y cv-auto"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div
        className="dot-grid absolute inset-0 pointer-events-none opacity-30"
        style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 70%)' }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <SectionHeading
            badge="what.is.included"
            title={
              <>
                our.<span className="function">capabilities</span>()
              </>
            }
            comment="// everything this engagement covers, under one team"
          />
        </RevealSection>

        <RevealSection
          as="ul"
          stagger
          className="mt-14 grid list-none sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {capabilities.map((cap) => (
            <li
              key={cap.title}
              className="bento-card cap-card rounded-2xl p-6 h-full"
              style={accentVars(group.accent)}
            >
              <div className="relative z-1 flex flex-col h-full">
                <div className="icon-box mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                  <cap.Icon
                    size={20}
                    style={{ color }}
                    aria-hidden
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-blue-100/60 leading-relaxed">{cap.description}</p>
              </div>
            </li>
          ))}

          <li
            className="bento-card cap-card rounded-2xl p-6 h-full"
            style={accentVars(group.accent)}
          >
            <div className="relative z-1 flex flex-col justify-center h-full">
              <p className="text-xs font-mono text-blue-100/50">{'// need something specific?'}</p>
              <h3 className="text-xl font-bold text-white mt-3 mb-3">Tell us the problem.</h3>
              <p className="text-sm text-blue-100/60 leading-relaxed mb-6">
                We&apos;ll scope the right slice of work with you.
              </p>
              <Link
                href="/contact#contact-form"
                className="group/cta inline-flex items-center gap-1.5 text-sm font-mono no-underline"
                style={{ color }}
              >
                talk to us
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/cta:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </li>
        </RevealSection>
      </div>
    </section>
  );
}
