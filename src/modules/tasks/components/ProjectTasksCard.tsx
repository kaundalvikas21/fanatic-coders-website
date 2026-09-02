'use client';

import dynamic from 'next/dynamic';
import { ListChecks, Plus } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import type { Task } from '@/types';
import { TaskKanbanBoard } from './kanban';
import { getTaskKanbanKey } from '../utils/task-kanban-key';
import { useTaskPermissions } from '../hooks/use-task-permissions';

const TaskForm = dynamic(() => import('./forms').then((module) => module.TaskForm), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
  ),
});

type ProjectTasksCardProps = {
  projectId?: string;
  tasks: Task[];
};

export function ProjectTasksCard({ projectId, tasks }: ProjectTasksCardProps) {
  const permissions = useTaskPermissions();
  const safeTasks = tasks ?? [];

  return (
    <WidgetCard
      icon={ListChecks}
      title="Delivery tasks"
      description="Assign work and track progress inside this project."
      titleClassName="text-xl font-semibold"
      actionSlot={
        permissions.canCreate && projectId ? (
          <ActionSheet
            title="Create task"
            description="Add delivery work to this project and optionally assign team members."
            trigger={
              <ActionSheetButton>
                <Plus data-icon="inline-start" />
                New task
              </ActionSheetButton>
            }
          >
            <div className="min-h-0 flex-1 p-3">
              <TaskForm projectId={projectId} />
            </div>
          </ActionSheet>
        ) : undefined
      }
    >
      <TaskKanbanBoard
        key={getTaskKanbanKey(safeTasks)}
        tasks={safeTasks}
        showProjects={false}
      />
    </WidgetCard>
  );
}
