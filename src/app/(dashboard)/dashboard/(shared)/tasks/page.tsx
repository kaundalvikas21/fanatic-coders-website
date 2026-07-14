import { ListChecks } from 'lucide-react';
import { ComingSoonCard } from '@/components/shared/coming-soon-card';

export const metadata = {
  title: 'Tasks | fanaticCoders',
};

export default function TasksPage() {
  return (
    <ComingSoonCard
      Icon={ListChecks}
      title="Tasks coming soon"
      description="Task assignment, progress updates, and team execution views will be available here."
    />
  );
}
