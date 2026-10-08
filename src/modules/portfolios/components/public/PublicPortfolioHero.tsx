import Image from 'next/image';
import {
  ArrowRight,
  Cloud,
  Globe,
  Palette,
  ShoppingBag,
  Smartphone,
  Tag,
  type LucideIcon,
} from 'lucide-react';
import { CodeBreadcrumb } from '@/components/shared/CodeBreadcrumb';
import GradientButton from '@/components/ui/GradientButton';
import { RevealSection } from '@/components/ui/RevealSection';
import type { Portfolio } from '@/types';
import { PublicPortfolioFacts } from './PublicPortfolioFacts';
import { PublicPortfolioTechTile } from './PublicPortfolioTechTile';

const tagIcons: Record<string, LucideIcon> = {
  'E-Commerce': ShoppingBag,
  Web: Globe,
  SaaS: Cloud,
  Mobile: Smartphone,
  Branding: Palette,
};

export function PublicPortfolioHero({ portfolio }: { portfolio: Portfolio }) {
  const titleWords = portfolio.title.trim().split(' ');
  const titleLast = titleWords.pop() ?? portfolio.title;
  const titleHead = titleWords.join(' ');
  const hasFacts = Boolean(
    portfolio.client ||
    portfolio.industry ||
    portfolio.year ||
    portfolio.duration ||
    portfolio.services?.length,
  );

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden hero-shell [--hero-pt:7.5rem] pb-8">
      {portfolio.imageUrl ? (
        <>
          <Image
            src={portfolio.imageUrl}
            alt={`${portfolio.title} cover`}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 -z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-t from-[#080810] via-[#080810]/75 to-[#080810]/25" />
          <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-[#080810]/80 via-[#080810]/25 to-transparent" />
          <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero opacity-30" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 pointer-events-none aurora-bg-hero" />
      )}
      <div className="relative z-10 container mx-auto flex max-w-6xl flex-1 flex-col justify-center px-4 sm:px-6">
        <RevealSection>
          <CodeBreadcrumb
            items={[
              { label: 'home', href: '/' },
              { label: 'portfolio', href: '/portfolio' },
              { label: portfolio.title },
            ]}
          />
        </RevealSection>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <RevealSection>
            <div className="flex flex-wrap gap-1.5">
              {portfolio.tags.map((tag) => {
                const Icon = tagIcons[tag] ?? Tag;
                return (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 font-mono text-xs text-indigo-200 ring-1 ring-indigo-400/30 backdrop-blur-sm"
                  >
                    <Icon
                      size={13}
                      aria-hidden
                      className="shrink-0"
                    />
                    {tag}
                  </span>
                );
              })}
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-[1.03] tracking-tight text-white md:text-6xl">
              {titleHead && <>{titleHead} </>}
              <span className="text-aurora-sweep">{titleLast}</span>
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-blue-100/85">
              {portfolio.overview || portfolio.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GradientButton href="/contact#contact-form">
                startAProject
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </GradientButton>
              <GradientButton
                href="/portfolio"
                variant="secondary"
              >
                allWork
              </GradientButton>
            </div>
          </RevealSection>
          {hasFacts && (
            <RevealSection>
              <PublicPortfolioFacts portfolio={portfolio} />
            </RevealSection>
          )}
        </div>
        {portfolio.tech && portfolio.tech.length > 0 && (
          <RevealSection className="mt-14 md:mt-16">
            <div className="border-t border-white/10 pt-8 text-center">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-100/45">
                built with
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                {portfolio.tech.map((name) => (
                  <PublicPortfolioTechTile
                    key={name}
                    name={name}
                  />
                ))}
              </div>
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  );
}
