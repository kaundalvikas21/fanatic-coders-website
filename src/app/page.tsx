import HeroSection           from "@/components/sections/HeroSection"
import PartnersSection       from "@/components/sections/PartnersSection"
import TerminalAboutSection  from "@/components/sections/TerminalAboutSection"
import ServicesSection       from "@/components/sections/ServicesSection"
import ServiceCarousel       from "@/components/sections/ServiceCarousel"
import PortfolioSection      from "@/components/sections/PortfolioSection"
import CtaSection            from "@/components/sections/CtaSection"
import CoreValuesSection     from "@/components/sections/CoreValuesSection"
import TestimonialsSection   from "@/components/sections/TestimonialsSection"
import TechStackSection      from "@/components/sections/TechStackSection"
import FAQSection            from "@/components/sections/FAQSection"
import BlogSection           from "@/components/sections/BlogSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <TerminalAboutSection />
      <ServicesSection />
      <ServiceCarousel />
      <PortfolioSection />
      <CtaSection />
      <CoreValuesSection />
      <TestimonialsSection />
      <TechStackSection />
      <FAQSection />
      <BlogSection />
    </>
  )
}
