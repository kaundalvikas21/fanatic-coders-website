import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/ui/CtaBand';
import {
  PublicPortfolioApproach,
  PublicPortfolioChallenge,
  PublicPortfolioDelivery,
  PublicPortfolioHero,
  PublicPortfolioRelated,
  PublicPortfolioResults,
} from '@/modules/portfolios/components/public';
import {
  getPublishedPortfolioBySlug,
  getPublishedPortfolios,
} from '@/modules/portfolios/data/queries';
import {
  normalizePublicPortfolio,
  normalizePublicPortfolioPage,
} from '@/modules/portfolios/utils/normalize-public-portfolio';
import type { Portfolio } from '@/types';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ portfolioSlug: string }> };

const getPublicPortfolio = cache(async (slug: string): Promise<Portfolio | null> => {
  const response = await getPublishedPortfolioBySlug(slug);
  const portfolio = response.success ? normalizePublicPortfolio(response.data) : null;
  return portfolio?.isPublished && portfolio.slug === slug ? portfolio : null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { portfolioSlug } = await params;
  const portfolio = await getPublicPortfolio(portfolioSlug);
  if (!portfolio) notFound();

  const title = `${portfolio.title} | fanaticCoders`;
  return {
    title,
    description: portfolio.description,
    openGraph: {
      title,
      description: portfolio.description,
      images: portfolio.imageUrl ? [portfolio.imageUrl] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { portfolioSlug } = await params;
  const portfolio = await getPublicPortfolio(portfolioSlug);
  if (!portfolio) notFound();

  const relatedResponse = await getPublishedPortfolios({ page: 1, pageSize: 4 });
  const related = relatedResponse.success
    ? (normalizePublicPortfolioPage(relatedResponse.data)?.portfolios ?? [])
        .filter((item) => item.id !== portfolio.id)
        .slice(0, 3)
    : [];
  const challenge = portfolio.addons.find((addon) => addon.type === 'CHALLENGE');
  const approach = portfolio.addons.find((addon) => addon.type === 'APPROACH');
  const delivery = portfolio.addons.find((addon) => addon.type === 'DELIVERY');
  const results = portfolio.addons.find((addon) => addon.type === 'RESULTS');

  return (
    <>
      <PublicPortfolioHero portfolio={portfolio} />
      <PublicPortfolioChallenge addon={challenge} />
      <PublicPortfolioApproach addon={approach} />
      <PublicPortfolioDelivery addon={delivery} />
      <PublicPortfolioResults addon={results} />
      <PublicPortfolioRelated
        portfolio={portfolio}
        related={related}
      />
      <CtaBand
        title="Want results like these?"
        subtitle="Tell us what you're building and we'll bring the team to make it real."
      />
    </>
  );
}
