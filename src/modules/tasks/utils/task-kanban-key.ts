import type { Task } from '@/types';

export function getTaskKanbanKey(tasks: Task[]) {
  return tasks
    .map((task) => {
      const addOnKey = task.addOnTasks
        .map((item) => `${item.id}:${item.updatedAt}:${item.isCompleted}`)
        .join(',');

      return `${task.id}:${task.updatedAt}:${task.status}:${addOnKey}`;
    })
    .join('|');
}
