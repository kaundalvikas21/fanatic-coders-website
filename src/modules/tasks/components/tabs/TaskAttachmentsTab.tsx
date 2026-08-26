'use client';

import dynamic from 'next/dynamic';
import { TabsContent } from '@/components/ui/tabs';
import type { Media, Task } from '@/types';
import { TaskTabSkeleton } from './TaskDetailTabPanel';
import type { TaskDetailTab } from './types';

const TaskAttachmentsPanel = dynamic(
  () => import('../TaskAttachmentsPanel').then((module) => module.TaskAttachmentsPanel),
  { loading: () => <TaskTabSkeleton /> },
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
  return (
    <TabsContent value="attachments">
      {activeTab === 'attachments' ? (
        <TaskAttachmentsPanel
          projectId={task.projectId}
          taskId={task.id}
          attachments={attachments}
        />
      ) : null}
    </TabsContent>
  );
}
