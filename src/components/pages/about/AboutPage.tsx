import PartnersSection from "@/components/pages/home/PartnersSection"
import {
  AboutHeroSection,
  StorySection,
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
      <StorySection />
      <MissionSection />
      <AboutStatsSection />
      <AboutValuesSection />
      <TeamSection />
      <ProcessSection />
      <PartnersSection />
      <AboutCtaSection />
    </>
  )
}
