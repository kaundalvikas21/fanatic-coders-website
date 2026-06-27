import PartnersSection from '@/components/pages/home/PartnersSection';
import AboutScrollFX from './AboutScrollFX';
import {
  AboutHeroSection,
  StorySection,
  MissionSection,
  AboutValuesSection,
  AboutStatsSection,
  TeamSection,
  ProcessSection,
  AboutCtaSection,
} from './sections';

export function AboutPage() {
  return (
    <>
      <AboutScrollFX />
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
  );
}
