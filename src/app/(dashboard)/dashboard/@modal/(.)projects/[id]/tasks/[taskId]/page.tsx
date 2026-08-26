import { notFound } from 'next/navigation';
import { TaskDetailDialog } from '@/modules/tasks';
import { getTaskMedia } from '@/modules/tasks/data/media';
import { getProjectTaskById, getTaskComments } from '@/modules/tasks/data/queries';
import type { Media, TaskCommentList } from '@/types';

type InterceptedTaskPageProps = {
  params: Promise<{ id: string; taskId: string }>;
};

export default async function InterceptedTaskPage({ params }: InterceptedTaskPageProps) {
  const { id: projectId, taskId } = await params;
  const [task, mediaResponse, commentsResponse] = await Promise.all([
    getProjectTaskById(projectId, taskId),
    getTaskMedia(taskId, { page: 1, pageSize: 20 }),
    getTaskComments(taskId, { page: 1, pageSize: 20 }),
  ]);

  if (!task) {
    notFound();
  }

  const attachments: Media[] = mediaResponse.success ? mediaResponse.data.items : [];
  const comments: TaskCommentList = commentsResponse.success
    ? commentsResponse.data
    : { items: [], pagination: { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 } };

  return (
    <TaskDetailDialog
      task={task}
      projectName={task.project?.name ?? 'project'}
      attachments={attachments}
      comments={comments}
    />
  );
}
