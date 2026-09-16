'use client';

import { useState } from 'react';
import { useTaskCommentPermissions } from '@/modules/tasks/hooks/use-task-comment-permissions';
import { ClipboardList, FileText, MessageSquare, Paperclip } from 'lucide-react';
import { SectionTabs, type SectionTabItem } from '@/components/shared/section-tabs';
import type { Media, Task, TaskCommentList } from '@/types';
import { TaskAttachmentsTab } from './TaskAttachmentsTab';
import { TaskChecklistTab } from './TaskChecklistTab';
import { TaskCommentsTab } from './TaskCommentsTab';
import { TaskOverviewTab } from './TaskOverviewTab';
import type { TaskDetailTab } from './types';

export function TaskDetailTabs({
  task,
  attachments,
  comments,
}: {
  task: Task;
  attachments: Media[];
  comments: TaskCommentList;
}) {
  const { canRead: canReadComments } = useTaskCommentPermissions();
  const [activeTab, setActiveTab] = useState<TaskDetailTab>('overview');
  const [commentCount, setCommentCount] = useState(comments.pagination.totalItems);
  const addOnTasks = task.addOnTasks ?? [];
  const completedAddOns = addOnTasks.filter((item) => item.isCompleted).length;
  const tabs: SectionTabItem[] = [
    { value: 'overview', label: 'Overview', Icon: FileText },
    {
      value: 'checklist',
      label: 'Checklist',
      Icon: ClipboardList,
      count: `${completedAddOns}/${addOnTasks.length}`,
      compactLabel: true,
    },
    {
      value: 'attachments',
      label: 'Attachments',
      Icon: Paperclip,
      count: attachments.length,
      compactLabel: true,
    },
  ];

  if (canReadComments) {
    tabs.splice(2, 0, {
      value: 'comments',
      label: 'Comments',
      Icon: MessageSquare,
      count: commentCount,
      compactLabel: true,
    });
  }

  const visibleTab = activeTab === 'comments' && !canReadComments ? 'overview' : activeTab;

  return (
    <SectionTabs
      value={visibleTab}
      onValueChange={(value) => setActiveTab(value as TaskDetailTab)}
      items={tabs}
      ariaLabel="Task detail sections"
      variant="folder"
      fill
    >
      <TaskOverviewTab
        task={task}
        activeTab={visibleTab}
      />
      <TaskChecklistTab activeTab={visibleTab} />
      {canReadComments && (
        <TaskCommentsTab
          task={task}
          comments={comments}
          activeTab={visibleTab}
          onCountChange={setCommentCount}
        />
      )}
      <TaskAttachmentsTab
        task={task}
        attachments={attachments}
        activeTab={visibleTab}
      />
    </SectionTabs>
  );
}
