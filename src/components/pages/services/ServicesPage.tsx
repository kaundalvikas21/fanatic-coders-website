import TechStackSection from "@/components/pages/home/TechStackSection"
import TestimonialsSection from "@/components/pages/home/TestimonialsSection"
import {
  ServicesHeroSection,
  ServicesGroupsSection,
  ServicesProcessSection,
  ServicesEngagementSection,
  ServicesWhySection,
  ServicesCtaSection,
} from "./sections"

export function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesGroupsSection />
      <ServicesProcessSection />
      <ServicesEngagementSection />
      <ServicesWhySection />
      <TechStackSection />
      <TestimonialsSection />
      <ServicesCtaSection />
    </>
  )
}
