import HeroSection from '@/components/pages/home/HeroSection';
import PartnersSection from '@/components/pages/home/PartnersSection';
import TerminalAboutSection from '@/components/pages/home/TerminalAboutSection';
import ServicesSection from '@/components/pages/home/ServicesSection';
import ServiceCarousel from '@/components/pages/home/ServiceCarousel';
import PortfolioSection from '@/components/pages/home/PortfolioSection';
import CtaSection from '@/components/pages/home/CtaSection';
import CoreValuesSection from '@/components/pages/home/CoreValuesSection';
import TestimonialsSection from '@/components/pages/home/TestimonialsSection';
import TechStackSection from '@/components/pages/home/TechStackSection';
import FAQSection from '@/components/pages/home/FAQSection';
import BlogSection from '@/components/pages/home/BlogSection';
import { getAllPublishedPortfolios } from '@/modules/portfolios/data/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const portfolios = await getAllPublishedPortfolios();
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <TerminalAboutSection />
      <ServicesSection />
      <ServiceCarousel />
      <PortfolioSection portfolios={portfolios ?? []} />
      <CtaSection />
      <CoreValuesSection />
      <TestimonialsSection />
      <TechStackSection />
      <FAQSection />
      <BlogSection />
    </>
  );
}
