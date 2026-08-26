import type { Media, Task, TaskCommentList } from '@/types';
import { TaskCardProvider } from '@/modules/tasks/context/task-card-context';
import { TaskDetailTabs } from './tabs';

export function TaskDetailView({
  task,
  attachments,
  comments,
}: {
  task: Task;
  attachments: Media[];
  comments: TaskCommentList;
}) {
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
