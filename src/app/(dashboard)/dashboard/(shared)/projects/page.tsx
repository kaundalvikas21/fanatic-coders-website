import { BriefcaseBusiness } from 'lucide-react';
import { ComingSoonCard } from '@/components/shared/coming-soon-card';

export const metadata = {
  title: 'Projects | fanaticCoders',
};

export default function ProjectsPage() {
  return (
    <ComingSoonCard
      Icon={BriefcaseBusiness}
      title="Projects coming soon"
      description="Project workspace, delivery tracking, and client visibility will be available here."
    />
  );
}
