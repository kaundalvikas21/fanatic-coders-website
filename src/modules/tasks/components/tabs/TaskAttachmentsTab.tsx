'use client';

import dynamic from 'next/dynamic';
import { Paperclip, Plus } from 'lucide-react';
import { ActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { useTaskPermissions } from '@/modules/tasks/hooks/use-task-permissions';
import type { Media, Task } from '@/types';
import { TaskDetailTabPanel, TaskTabEmptyState, TaskTabSkeleton } from './TaskDetailTabPanel';
import type { TaskDetailTab } from './types';

const TaskAttachmentsPanel = dynamic(
  () => import('../TaskAttachmentsPanel').then((module) => module.TaskAttachmentsPanel),
  { loading: () => <TaskTabSkeleton /> },
);

const TaskMediaUploader = dynamic(
  () => import('../TaskMediaUploader').then((module) => module.TaskMediaUploader),
  { ssr: false },
);

export function TaskAttachmentsTab({
  task,
  attachments,
  activeTab,
}: {
  task: Task;
  attachments: Media[];
  activeTab: TaskDetailTab;
}) {
  const { canUpdate } = useTaskPermissions();

  return (
    <TaskDetailTabPanel
      value="attachments"
      activeTab={activeTab}
      icon={Paperclip}
      title="Attachments"
      description="Images and PDFs attached to this task."
      actionSlot={
        canUpdate ? (
          <ActionDialog
            title="Add task attachment"
            description="Upload one image or PDF to this task."
            contentClassName="sm:max-w-lg"
            trigger={
              <Button
                size="sm"
                type="button"
              >
                <Plus data-icon="inline-start" />
                Add attachment
              </Button>
            }
          >
            <TaskMediaUploader taskId={task.id} />
          </ActionDialog>
        ) : undefined
      }
      lazy
    >
      {attachments.length ? (
        <TaskAttachmentsPanel
          taskId={task.id}
          attachments={attachments}
        />
      ) : (
        <TaskTabEmptyState
          icon={Paperclip}
          title="No attachments yet"
          description="Add an image or PDF that supports this task."
        />
      )}
    </TaskDetailTabPanel>
  );
}
