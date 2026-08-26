'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Task } from '@/types';

/**
 * Shares one current task with nested task UI such as card content, checklist
 * actions, and delete actions without passing the task through every component.
 */
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
