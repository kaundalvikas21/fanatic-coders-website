import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { type ServiceGroup, type ServiceItem, iconColor } from '../data';

export function ServiceRelated({ service, group }: { service: ServiceItem; group: ServiceGroup }) {
  const related = group.items.filter((s) => s.slug !== service.slug);
  if (related.length === 0) return null;
  const accent = iconColor[group.accent];

  return (
    <section
      className="relative overflow-hidden section-y"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        <RevealSection>
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-white">
            more.in<span style={{ color: accent }}>{`("${group.label}")`}</span>
          </h2>
        </RevealSection>
        <RevealSection
          stagger
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {related.map((item) => (
            <Link
              key={item.slug}
              href="/login"
              className="no-underline group/card"
            >
              <GlassCard
                accent={group.accent}
                lift
                className="h-full p-6"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <item.Icon
                    size={20}
                    style={{ color: accent }}
                    aria-hidden
                  />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-blue-100/60 leading-relaxed mb-4">{item.description}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-mono"
                  style={{ color: accent }}
                >
                  explore
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/card:translate-x-1"
                    aria-hidden
                  />
                </span>
              </GlassCard>
            </Link>
          ))}
        </RevealSection>
      </div>
    </section>
  );
}
