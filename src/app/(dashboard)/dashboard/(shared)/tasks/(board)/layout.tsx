import { Suspense, type ReactNode } from 'react';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { TasksProjectToolbar } from '@/modules/tasks';

export default function TasksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tasks"
        description="Review and manage delivery tasks across projects."
        actionSlot={
          <Suspense fallback={null}>
            <TasksProjectToolbar />
          </Suspense>
        }
      />
      <DetailPageLayout className="xl:grid-cols-1">
        <DetailPageLayout.Main>{children}</DetailPageLayout.Main>
      </DetailPageLayout>
    </div>
  );
}
