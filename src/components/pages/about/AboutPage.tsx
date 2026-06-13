import PartnersSection from "@/components/pages/home/PartnersSection"
import {
  AboutHeroSection,
  MissionSection,
  AboutValuesSection,
  AboutStatsSection,
  TeamSection,
  ProcessSection,
  AboutCtaSection,
} from "./sections"

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <MissionSection />
      <AboutValuesSection />
      <AboutStatsSection />
      <TeamSection />
      <ProcessSection />
      <PartnersSection />
      <AboutCtaSection />
    </>
  )
}
