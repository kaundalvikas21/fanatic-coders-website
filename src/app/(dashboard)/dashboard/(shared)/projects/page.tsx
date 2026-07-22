import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { ProjectList } from '@/modules/projects';
import { getProjects } from '@/modules/projects/data/queries';
import type { Project } from '@/types';

export const metadata = {
  title: 'Projects | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { success, data, message } = await getProjects();
  const projects: Project[] = success && Array.isArray(data) ? (data as Project[]) : [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Projects"
        description="Track delivery workspaces created from service requests."
      />

      {success ? (
        <ProjectList projects={projects} />
      ) : (
        <ErrorState
          title="Could not load projects"
          message={message}
        />
      )}
    </div>
  );
}
