import { WidgetCard } from '@/components/shared/widget-card';
import type { Project } from '@/types';
import { ProjectStatusForm } from './form/ProjectStatusForm';

type ProjectActionsCardProps = {
  project: Project;
};

export function ProjectActionsCard({ project }: ProjectActionsCardProps) {
  return (
    <WidgetCard
      title="Actions"
      description="Manage this project."
      className="overflow-visible"
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <ProjectStatusForm
        projectId={project.id}
        initialStatus={project.status}
      />
    </WidgetCard>
  );
}
