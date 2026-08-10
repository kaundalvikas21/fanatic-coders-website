import PartnersSection from '@/components/pages/home/PartnersSection';
import TestimonialsSection from '@/components/pages/home/TestimonialsSection';
import { PortfolioScrollToTop } from './PortfolioScrollToTop';
import {
  PortfolioHeroSection,
  PortfolioGridSection,
  PortfolioProcessSection,
  PortfolioResultsSection,
  PortfolioCtaSection,
} from './sections';

export function PortfolioPage() {
  return (
    <>
      <PortfolioScrollToTop />
      <PortfolioHeroSection />
      <PortfolioGridSection />
      <PortfolioProcessSection />
      <PortfolioResultsSection />
      <PartnersSection />
      <TestimonialsSection />
      <PortfolioCtaSection />
    </>
  );
}
