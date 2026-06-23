import TechStackSection from "@/components/pages/home/TechStackSection"
import TestimonialsSection from "@/components/pages/home/TestimonialsSection"
import {
  ServicesHeroSection,
  ServicesOverviewSection,
  ServicesProcessSection,
  ServicesEngagementSection,
  ServicesWhySection,
  ServicesFaqSection,
  ServicesCtaSection,
} from "./sections"

export function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <ServicesProcessSection />
      <TechStackSection />
      <ServicesEngagementSection />
      <ServicesWhySection />
      <TestimonialsSection />
      <ServicesFaqSection />
      <ServicesCtaSection />
    </>
  )
}
