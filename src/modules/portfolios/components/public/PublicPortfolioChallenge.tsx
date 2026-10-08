import { RevealSection } from '@/components/ui/RevealSection';
import type { PortfolioAddon } from '@/types';
import { PublicPortfolioHeading, PublicPortfolioSection } from './PublicPortfolioSection';

export function PublicPortfolioChallenge({ addon }: { addon?: PortfolioAddon }) {
  if (!addon) return null;

  return (
    <PublicPortfolioSection tone="--dark-2">
      <RevealSection>
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <PublicPortfolioHeading
              eyebrow="the problem"
              title={addon.title}
            />
          </div>
          {addon.content && (
            <p className="text-base leading-relaxed text-blue-100/75 md:text-lg">{addon.content}</p>
          )}
        </div>
      </RevealSection>
    </PublicPortfolioSection>
  );
}
