import type { PortfolioProject } from '@/types';
import { CtaBand } from '@/components/ui/CtaBand';
import { CaseHero } from './case-sections/CaseHero';
import { CaseStory } from './case-sections/CaseStory';
import { CaseQuote } from './case-sections/CaseQuote';
import { CaseRelated } from './case-sections/CaseRelated';

export function CaseStudyPage({ project }: { project: PortfolioProject }) {
  return (
    <>
      <CaseHero project={project} />
      <CaseStory project={project} />
      <CaseQuote project={project} />
      <CaseRelated project={project} />
      <CtaBand
        title="Want results like these?"
        subtitle="Tell us what you're building and we'll bring the team to make it real."
      />
    </>
  );
}
