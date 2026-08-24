'use client';

import { createContext, useContext, type ReactNode } from 'react';

type TaskKanbanContextValue = {
  canUpdate: boolean;
  canDelete: boolean;
  showProjects: boolean;
  pendingTaskIds: Set<string>;
};

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
