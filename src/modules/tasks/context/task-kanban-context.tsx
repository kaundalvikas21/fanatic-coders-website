'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { UserListItem } from '@/types';

type TaskKanbanContextValue = {
  canUpdate: boolean;
  canDelete: boolean;
  showProjects: boolean;
  pendingTaskIds: Set<string>;
  assignableMembers: UserListItem[];
};

/**
 * Shares Kanban-only interaction state: task permissions, project-label mode,
 * assignable members, and pending task IDs used during board updates.
 */
const TaskKanbanContext = createContext<TaskKanbanContextValue | null>(null);

export function TaskKanbanProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: TaskKanbanContextValue;
}) {
  return <TaskKanbanContext value={value}>{children}</TaskKanbanContext>;
}

export function useTaskKanban() {
  const context = useContext(TaskKanbanContext);

  if (!context) {
    throw new Error('useTaskKanban must be used within TaskKanbanProvider.');
  }

  return context;
}
