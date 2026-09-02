export const getTaskDetailPath = (taskId: string) =>
  `/dashboard/tasks/${encodeURIComponent(taskId)}`;
