'use client';

import { useRouter } from 'next/navigation';
import { ActionDialog } from '@/components/shared/action-dialog';
import type { Media, Task } from '@/types';
import { TaskDetailView } from './TaskDetailView';

type TaskDetailDialogProps = {
  task: Task;
  projectName: string;
  attachments: Media[];
};

export function TaskDetailDialog({ task, projectName, attachments }: TaskDetailDialogProps) {
  const router = useRouter();

  return (
    <ActionDialog
      title={task.title}
      description={`Task in ${projectName}`}
      defaultOpen
      contentClassName="max-h-[calc(100svh-2rem)] overflow-y-auto sm:max-w-5xl"
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <TaskDetailView
        task={task}
        attachments={attachments}
      />
    </ActionDialog>
  );
}
