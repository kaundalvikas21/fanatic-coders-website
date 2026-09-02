import { notFound } from 'next/navigation';
import { ErrorState } from '@/components/shared/error-state';
import { TaskDetailTabs } from '@/modules/tasks/components/tabs';
import { TaskCardProvider } from '@/modules/tasks/context/task-card-context';
import { getTaskDetailData } from '@/modules/tasks/data/task-detail';

export const dynamic = 'force-dynamic';

type TaskDetailPageProps = {
  params: Promise<{ taskId: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = await params;
  const taskDetail = await getTaskDetailData(taskId);

  if (!taskDetail.success) {
    if (taskDetail.status === 404) {
      notFound();
    }

    return (
      <ErrorState
        title="Could not load task"
        message={taskDetail.message}
      />
    );
  }

  const { task, attachments, comments } = taskDetail.data;

  return (
    <TaskCardProvider task={task}>
      <TaskDetailTabs
        task={task}
        attachments={attachments}
        comments={comments}
      />
    </TaskCardProvider>
  );
}
