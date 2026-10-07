import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import type { PortfolioAddon, PortfolioStepCard } from '@/types';
import { PublicPortfolioHeading, PublicPortfolioSection } from './PublicPortfolioSection';

function isStepCard(card: PortfolioStepCard | object): card is PortfolioStepCard {
  return 'title' in card && 'duration' in card && 'desc' in card;
}

export function PublicPortfolioDelivery({ addon }: { addon?: PortfolioAddon }) {
  if (!addon) return null;
  const steps = (addon.cards ?? []).filter(isStepCard);

  return (
    <PublicPortfolioSection tone="--dark-2">
      <RevealSection>
        <PublicPortfolioHeading
          eyebrow="the steps"
          title={addon.title}
        />
        {addon.content && (
          <p className="mt-4 text-base leading-relaxed text-blue-100/65">{addon.content}</p>
        )}
        {steps.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <GlassCard
                key={`${step.title}-${index}`}
                lift
                className="group p-7"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="process-num font-mono text-4xl font-bold tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {step.duration && (
                    <span className="mt-1.5 font-mono text-xs uppercase tracking-wide text-blue-100/45">
                      {step.duration}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-blue-100/60">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        )}
      </RevealSection>
    </PublicPortfolioSection>
  );
}
