'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Task } from '@/types';

const TaskCardContext = createContext<Task | null>(null);

export function TaskCardProvider({ task, children }: { task: Task; children: ReactNode }) {
  return <TaskCardContext value={task}>{children}</TaskCardContext>;
}

export function useTaskCard() {
  const task = useContext(TaskCardContext);

  if (!task) {
    throw new Error('useTaskCard must be used within TaskCardProvider.');
  }

  return task;
}
