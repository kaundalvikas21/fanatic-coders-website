import type { Metadata } from 'next';
import PartnersSection from '@/components/pages/home/PartnersSection';
import { PortfolioScrollToTop } from '@/components/pages/portfolio/PortfolioScrollToTop';
import {
  PortfolioCtaSection,
  PortfolioGridSection,
  PortfolioHeroSection,
  PortfolioProcessSection,
} from '@/components/pages/portfolio/sections';
import { getAllPublishedPortfolios } from '@/modules/portfolios/data/queries';

export const metadata: Metadata = {
  title: 'Portfolio | fanaticCoders',
  description:
    "Selected work from fanaticCoders: products we've designed and built across web, mobile, SaaS, and e-commerce, with the results they delivered.",
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const portfolios = await getAllPublishedPortfolios();

  return (
    <>
      <PortfolioScrollToTop />
      <PortfolioHeroSection portfolios={portfolios ?? []} />
      <PortfolioGridSection
        portfolios={portfolios ?? []}
        loadError={portfolios === null}
      />
      <PortfolioProcessSection />
      <PartnersSection />
      <PortfolioCtaSection />
    </>
  );
}
