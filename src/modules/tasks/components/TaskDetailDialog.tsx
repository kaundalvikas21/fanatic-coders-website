'use client';

import { useRouter } from 'next/navigation';
import { ActionDialog } from '@/components/shared/action-dialog';
import { TaskCardProvider } from '@/modules/tasks/context/task-card-context';
import type { Media, Task, TaskCommentList } from '@/types';
import { TaskDetailTabs } from './tabs';

type TaskDetailDialogProps = {
  task: Task;
  attachments: Media[];
  comments: TaskCommentList;
};

export function TaskDetailDialog({ task, attachments, comments }: TaskDetailDialogProps) {
  const router = useRouter();

  return (
    <ActionDialog
      title={task.title}
      description={`Task in ${task.project?.name ?? 'project'}`}
      defaultOpen
      contentClassName="max-h-[calc(100svh-2rem)] overflow-y-auto sm:max-w-5xl"
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <TaskCardProvider task={task}>
        <TaskDetailTabs
          task={task}
          attachments={attachments}
          comments={comments}
        />
      </TaskCardProvider>
    </ActionDialog>
  );
}
