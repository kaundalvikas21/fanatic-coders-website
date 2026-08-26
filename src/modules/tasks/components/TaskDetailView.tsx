import type { Media, Task } from '@/types';
import { TaskCardProvider } from '@/modules/tasks/context/task-card-context';
import { TaskDetailTabs } from './tabs';

export function TaskDetailView({ task, attachments }: { task: Task; attachments: Media[] }) {
  return (
    <TaskCardProvider task={task}>
      <TaskDetailTabs
        task={task}
        attachments={attachments}
      />
    </TaskCardProvider>
  );
}
