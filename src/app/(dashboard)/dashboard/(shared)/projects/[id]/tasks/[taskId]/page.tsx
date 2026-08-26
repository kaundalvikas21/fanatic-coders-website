import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { getProjectTaskById, getTaskComments } from '@/modules/tasks/data/queries';
import { getTaskMedia } from '@/modules/tasks/data/media';
import { TaskDetailView } from '@/modules/tasks';
import type { Media, TaskCommentList } from '@/types';

export const dynamic = 'force-dynamic';

type TaskDetailPageProps = {
  params: Promise<{ id: string; taskId: string }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
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
    <div className="flex flex-col gap-6">
      <PageHeader
        title={task.title}
        description={`Task in ${task.project?.name ?? 'project'}`}
        backLabel="Project tasks"
      />
      <TaskDetailView
        task={task}
        attachments={attachments}
        comments={comments}
      />
    </div>
  );
}
