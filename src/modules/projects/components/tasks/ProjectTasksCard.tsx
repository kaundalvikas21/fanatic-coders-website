'use client';

import { ListChecks, Plus } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import type { Task, UserListItem } from '@/types';
import { TaskCreateForm } from './TaskCreateForm';
import { TaskKanbanBoard } from './TaskKanbanBoard';
import { useTaskPermissions } from '../../hooks/use-task-permissions';

type ProjectTasksCardProps = {
  projectId?: string;
  tasks: Task[];
  assignableMembers?: UserListItem[];
};

export function ProjectTasksCard({
  projectId,
  tasks,
  assignableMembers = [],
}: ProjectTasksCardProps) {
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
              <TaskCreateForm
                projectId={projectId}
                assignableMembers={assignableMembers}
              />
            </div>
          </ActionSheet>
        ) : undefined
      }
    >
      <TaskKanbanBoard
        key={safeTasks.map((task) => `${task.id}:${task.status}`).join('|')}
        tasks={safeTasks}
        showProjects={false}
      />
    </WidgetCard>
  );
}
