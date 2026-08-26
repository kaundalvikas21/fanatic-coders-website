'use client';

import dynamic from 'next/dynamic';
import { ClipboardList } from 'lucide-react';
import { TaskDetailTabPanel, TaskTabSkeleton } from './TaskDetailTabPanel';
import type { TaskDetailTab } from './types';

const TaskAddOnList = dynamic(
  () => import('../TaskAddOnList').then((module) => module.TaskAddOnList),
  { loading: () => <TaskTabSkeleton /> },
);

export function TaskChecklistTab({ activeTab }: { activeTab: TaskDetailTab }) {
  return (
    <TaskDetailTabPanel
      value="checklist"
      activeTab={activeTab}
      icon={ClipboardList}
      title="Checklist"
      description="Create, complete, rename, or remove task checklist items."
      lazy
    >
      <TaskAddOnList />
    </TaskDetailTabPanel>
  );
}
