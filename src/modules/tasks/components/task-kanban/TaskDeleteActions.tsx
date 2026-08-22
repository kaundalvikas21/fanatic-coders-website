'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { deleteTaskById } from '@/modules/tasks/data/mutations';
import { useTaskCard } from './TaskCardContext';
import { useTaskKanban } from './TaskKanbanContext';

export function TaskDeleteActions() {
  const task = useTaskCard();
  const { close } = useActionDialog();
  const { onTaskDeleted } = useTaskKanban();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await deleteTaskById(task.id, task.projectId);

      if (!response.success) {
        toast.error(response.message || 'Could not delete task.');
        return;
      }

      toast.success('Task deleted.');
      onTaskDeleted(task.id);
      close();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={isDeleting}
        onClick={close}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        disabled={isDeleting}
        onClick={() => void handleDelete()}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
}
