import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { WidgetCard } from '@/components/shared/widget-card';
import { ProjectInfoCard, ProjectMembersCard } from '@/modules/projects';
import { getProjectById } from '@/modules/projects/data/queries';
import type { Project } from '@/types';

export const dynamic = 'force-dynamic';

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const { success, data: project } = (await getProjectById(id)) as {
    success: boolean;
    data?: Project | null;
  };

  if (!success || !project) {
    notFound();
  }

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        <PageHeader
          title={project.name}
          description={project.description ?? 'Project delivery workspace.'}
          showBackButton
          backLabel="Projects"
        />

        <WidgetCard
          title="Delivery board"
          description="Tasks will be created here in the next flow."
          titleClassName="text-xl font-semibold"
        >
          <p className="text-sm leading-6 text-muted-foreground">
            Project shell is ready. The next step is task statuses, task creation, and assignment
            inside this project.
          </p>
        </WidgetCard>
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        <ProjectInfoCard project={project} />
        <ProjectMembersCard project={project} />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
