'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { deleteTaskById } from '@/modules/projects/data/tasks';
import type { Task } from '@/types';

type TaskDeleteButtonProps = {
  task: Task;
};

export function TaskDeleteButton({ task }: TaskDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm('Delete this task?');

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const response = await deleteTaskById(task.id, task.projectId);
    setIsDeleting(false);

    if (!response.success) {
      toast.error(response.message || 'Could not delete task.');
      return;
    }

    toast.success('Task deleted.');
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete task"
      title="Delete task"
    >
      <Trash2 className="size-4" />
    </Button>
  );
}
