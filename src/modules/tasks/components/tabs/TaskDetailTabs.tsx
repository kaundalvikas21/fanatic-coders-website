'use client';

import { useState } from 'react';
import { ClipboardList, FileText, MessageSquare, Paperclip } from 'lucide-react';
import { SectionTabs } from '@/components/shared/section-tabs';
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
  const [activeTab, setActiveTab] = useState<TaskDetailTab>('overview');
  const [commentCount, setCommentCount] = useState(comments.pagination.totalItems);
  const addOnTasks = task.addOnTasks ?? [];
  const completedAddOns = addOnTasks.filter((item) => item.isCompleted).length;
  const tabs = [
    { value: 'overview', label: 'Overview', Icon: FileText },
    {
      value: 'checklist',
      label: 'Checklist',
      Icon: ClipboardList,
      count: `${completedAddOns}/${addOnTasks.length}`,
      compactLabel: true,
    },
    {
      value: 'comments',
      label: 'Comments',
      Icon: MessageSquare,
      count: commentCount,
      compactLabel: true,
    },
    {
      value: 'attachments',
      label: 'Attachments',
      Icon: Paperclip,
      count: attachments.length,
      compactLabel: true,
    },
  ] as const;

  return (
    <SectionTabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TaskDetailTab)}
      items={tabs}
      ariaLabel="Task detail sections"
      fill
    >
      <TaskOverviewTab
        task={task}
        activeTab={activeTab}
      />
      <TaskChecklistTab activeTab={activeTab} />
      <TaskCommentsTab
        task={task}
        comments={comments}
        activeTab={activeTab}
        onCountChange={setCommentCount}
      />
      <TaskAttachmentsTab
        task={task}
        attachments={attachments}
        activeTab={activeTab}
      />
    </SectionTabs>
  );
}
