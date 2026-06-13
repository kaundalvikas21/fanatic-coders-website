import TestimonialsSection from "@/components/pages/home/TestimonialsSection"
import PartnersSection from "@/components/pages/home/PartnersSection"
import {
  ContactHeroSection,
  ContactSection,
  ContactReasonsSection,
  ContactProcessSection,
  ContactFaqSection,
} from "./sections"

export function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactSection />
      <ContactReasonsSection />
      <ContactProcessSection />
      <TestimonialsSection />
      <PartnersSection />
      <ContactFaqSection />
    </>
  )
}
