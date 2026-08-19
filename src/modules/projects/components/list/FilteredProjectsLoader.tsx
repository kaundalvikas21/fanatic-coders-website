import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { createProjectDeliverySummary } from '@/modules/projects/utils/progress';
import type { GetProjectsInput, PaginatedProjects, Project, Task } from '@/types';
import { getProjects } from '../../data/queries';
import { getProjectTasks } from '../../data/tasks/queries';
import { FilteredProjectsTable } from './FilteredProjectsTable';

export async function FilteredProjectsLoader({ filters }: { filters: GetProjectsInput }) {
  const response = await getProjects(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load filtered projects"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedProjects | null | undefined;
  const projects = (data?.items ?? []) as Project[];
  const pagination = data?.pagination;

  if (projects.length === 0) {
    const hasFilters = Boolean(filters.name || filters.status || filters.serviceType);

    return (
      <EmptyState
        entity="projects"
        description={
          hasFilters
            ? 'No projects match the selected filters.'
            : 'Project workspaces will appear here once delivery starts.'
        }
      />
    );
  }

  const summaries = await Promise.all(
    projects.map(async (project) => {
      const tasksResponse = await getProjectTasks(project.id);
      const tasks: Task[] =
        tasksResponse.success && Array.isArray(tasksResponse.data)
          ? (tasksResponse.data as Task[])
          : [];

      return createProjectDeliverySummary(project, tasks);
    }),
  );

  return (
    <div className="space-y-4">
      <FilteredProjectsTable summaries={summaries} />
      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={pagination.totalItems === 1 ? 'project' : 'projects'}
          className="px-0 pb-0"
        />
      )}
    </div>
  );
}
