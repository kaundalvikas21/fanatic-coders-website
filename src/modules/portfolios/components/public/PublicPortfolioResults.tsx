import { Activity, Gauge, TrendingUp, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import type { PortfolioAddon, PortfolioMetricCard } from '@/types';
import { PublicPortfolioHeading, PublicPortfolioSection } from './PublicPortfolioSection';

const metricIcons = [TrendingUp, Zap, Gauge, Activity] as const;

function isMetricCard(card: PortfolioMetricCard | object): card is PortfolioMetricCard {
  return 'label' in card && 'value' in card;
}

export function PublicPortfolioResults({ addon }: { addon?: PortfolioAddon }) {
  if (!addon) return null;
  const metrics = (addon.cards ?? []).filter(isMetricCard);

  return (
    <PublicPortfolioSection tone="--dark-1">
      <RevealSection>
        <PublicPortfolioHeading
          eyebrow="the outcome"
          title={addon.title}
        />
        {addon.content && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100/75 md:text-lg">
            {addon.content}
          </p>
        )}
        {metrics.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metricIcons[index % metricIcons.length];
              return (
                <GlassCard
                  key={`${metric.label}-${index}`}
                  accent="cyan"
                  lift
                  className="p-6 text-center"
                >
                  <Icon
                    size={24}
                    aria-hidden
                    className="mx-auto"
                    style={{ color: 'var(--aurora-cyan-light)' }}
                  />
                  <div
                    className="mt-3 font-mono text-3xl font-bold tabular-nums md:text-4xl"
                    style={{ color: 'var(--aurora-cyan-light)' }}
                  >
                    {metric.value}
                  </div>
                  <div className="mt-1.5 text-xs text-blue-100/55">
                    {metric.caption || metric.label}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </RevealSection>
    </PublicPortfolioSection>
  );
}
