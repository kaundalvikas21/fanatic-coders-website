import type { ReactNode } from 'react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectsFilters, ProjectTaskStats } from '@/modules/projects';
import { getTasks } from '@/modules/projects/data/tasks/queries';
import type { Task } from '@/types';

export default async function ProjectsLayout({ children }: { children: ReactNode }) {
  const response = await getTasks();
  const tasks = response.success && Array.isArray(response.data) ? (response.data as Task[]) : [];

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Projects"
          description="Track delivery workspaces created from service requests."
        />
      }
    >
      <ProjectTaskStats tasks={tasks} />
      <FilterLayout filters={<ProjectsFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
