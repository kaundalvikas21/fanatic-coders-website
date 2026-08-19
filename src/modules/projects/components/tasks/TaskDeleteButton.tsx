'use client';

import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteDialog } from '@/components/shared/delete-dialog';
import { Button } from '@/components/ui/button';
import { deleteTaskById } from '@/modules/projects/data/tasks/mutations';
import type { Task } from '@/types';

type TaskDeleteButtonProps = {
  task: Task;
  onDeleted?: (taskId: string) => void;
};

export function TaskDeleteButton({ task, onDeleted }: TaskDeleteButtonProps) {
  async function handleDelete() {
    const response = await deleteTaskById(task.id, task.projectId);

    if (!response.success) {
      toast.error(response.message || 'Could not delete task.');
      throw new Error(response.message || 'Could not delete task.');
    }

    toast.success('Task deleted.');
    onDeleted?.(task.id);
  }

  return (
    <DeleteDialog
      title="Delete this task?"
      description="The task will be removed from this project."
      onConfirm={handleDelete}
      trigger={
        <Button
          type="button"
          variant="destructive"
          size="icon"
          aria-label="Delete task"
          title="Delete task"
        >
          <Trash2 />
        </Button>
      }
    />
  );
}
