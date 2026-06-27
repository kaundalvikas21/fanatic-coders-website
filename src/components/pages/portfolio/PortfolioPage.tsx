import PartnersSection from '@/components/pages/home/PartnersSection';
import TestimonialsSection from '@/components/pages/home/TestimonialsSection';
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
