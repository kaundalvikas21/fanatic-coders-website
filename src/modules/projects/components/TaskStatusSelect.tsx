'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { updateTaskById } from '@/modules/projects/data/tasks';
import type { Task, TaskStatus } from '@/types';
import { TASK_STATUS_OPTIONS } from '@/types';

type TaskStatusSelectProps = {
  task: Task;
  canUpdateStatus: boolean;
};

export function TaskStatusSelect({ task, canUpdateStatus }: TaskStatusSelectProps) {
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleStatusChange(value: string) {
    const nextStatus = value as TaskStatus;
    const previousStatus = status;

    if (nextStatus === previousStatus) {
      return;
    }

    setStatus(nextStatus);
    setIsUpdating(true);

    const response = await updateTaskById(task.id, task.projectId, {
      status: nextStatus,
    });

    setIsUpdating(false);

    if (!response.success) {
      setStatus(previousStatus);
      toast.error(response.message || 'Could not update task.');
      return;
    }

    toast.success('Task status updated.');
  }

  return (
    <SelectField
      id={`task-status-${task.id}`}
      value={status}
      options={TASK_STATUS_OPTIONS}
      onChange={handleStatusChange}
      ariaLabel="Task status"
      disabled={isUpdating || !canUpdateStatus}
      className="h-9"
    />
  );
}
