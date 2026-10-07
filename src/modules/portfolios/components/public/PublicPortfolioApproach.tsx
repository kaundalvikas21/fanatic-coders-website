import Image from 'next/image';
import { RevealSection } from '@/components/ui/RevealSection';
import type { PortfolioAddon } from '@/types';
import { PublicPortfolioHeading, PublicPortfolioSection } from './PublicPortfolioSection';

export function PublicPortfolioApproach({ addon }: { addon?: PortfolioAddon }) {
  if (!addon) return null;

  return (
    <PublicPortfolioSection tone="--dark-1">
      <RevealSection>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <PublicPortfolioHeading
              eyebrow="the strategy"
              title={addon.title}
            />
            {addon.content && (
              <p className="mt-4 text-base leading-relaxed text-blue-100/72 md:text-lg">
                {addon.content}
              </p>
            )}
          </div>
          {addon.imageUrl && (
            <div className="relative aspect-[3/2] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src={addon.imageUrl}
                alt={`${addon.title} project detail`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </RevealSection>
    </PublicPortfolioSection>
  );
}
