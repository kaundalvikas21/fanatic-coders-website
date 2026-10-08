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

const title = 'Portfolio | fanaticCoders';
const description =
  "Selected work from fanaticCoders: products we've designed and built across web, mobile, SaaS, and e-commerce, with the results they delivered.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary', title, description },
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
