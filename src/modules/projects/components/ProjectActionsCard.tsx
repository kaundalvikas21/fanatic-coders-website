import { Settings2 } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import type { Project } from '@/types';
import { ProjectStatusForm } from './form/ProjectStatusForm';

type ProjectActionsCardProps = {
  project: Project;
};

export function ProjectActionsCard({ project }: ProjectActionsCardProps) {
  return (
    <WidgetCard
      icon={Settings2}
      title="Project status"
      description="Move this project through its delivery stages."
      className="overflow-visible"
    >
      <ProjectStatusForm
        projectId={project.id}
        initialStatus={project.status}
      />
    </WidgetCard>
  );
}
