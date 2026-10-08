import PartnersSection from '@/components/pages/home/PartnersSection';
import AboutScrollFX from './AboutScrollFX';
import type { TeamMember } from '@/types';
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

export function AboutPage({ team }: { team: TeamMember[] }) {
  return (
    <>
      <AboutScrollFX />
      <AboutHeroSection />
      <StorySection />
      <MissionSection />
      <AboutStatsSection />
      <AboutValuesSection />
      {team.length > 0 && <TeamSection team={team} />}
      <ProcessSection />
      <PartnersSection />
      <AboutCtaSection />
    </>
  );
}
