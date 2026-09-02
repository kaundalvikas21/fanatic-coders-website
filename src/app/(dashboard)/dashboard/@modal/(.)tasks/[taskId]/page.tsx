import { notFound } from 'next/navigation';
import { TaskDetailDialog } from '@/modules/tasks';
import { getTaskDetailData } from '@/modules/tasks/data/task-detail';

type InterceptedTaskPageProps = {
  params: Promise<{ taskId: string }>;
};

export default async function InterceptedTaskPage({ params }: InterceptedTaskPageProps) {
  const { taskId } = await params;
  const taskDetail = await getTaskDetailData(taskId);

  if (!taskDetail.success) {
    if (taskDetail.status === 404) {
      notFound();
    }

    throw new Error(taskDetail.message);
  }

  const { task, attachments, comments } = taskDetail.data;

  return (
    <TaskDetailDialog
      task={task}
      attachments={attachments}
      comments={comments}
    />
  );
}
