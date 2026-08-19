import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import type { GetProjectsInput, PaginatedProjects } from '@/types';
import { getProjects } from '../../data/queries';
import { ProjectList } from './ProjectList';

export async function ProjectListLoader({ filters }: { filters: GetProjectsInput }) {
  const response = await getProjects(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load projects"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedProjects | null | undefined;
  const projects = data?.items ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? projects.length;

  if (totalItems === 0) {
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

  return (
    <div className="flex flex-col gap-4">
      <ProjectList projects={projects} />
      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={totalItems === 1 ? 'project' : 'projects'}
        />
      )}
    </div>
  );
}
