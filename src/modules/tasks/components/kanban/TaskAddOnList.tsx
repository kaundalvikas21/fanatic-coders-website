'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ActionDialog, useActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  createTaskAddOn,
  deleteTaskAddOnById,
  updateTaskAddOnById,
} from '@/modules/tasks/data/mutations';
import {
  taskAddOnCreateSchema,
  taskAddOnUpdateSchema,
  type TaskAddOnCreateFormInput,
  type TaskAddOnCreateFormValues,
  type TaskAddOnUpdateFormInput,
  type TaskAddOnUpdateFormValues,
} from '@/modules/tasks/schemas/task';
import type { AddOnTask } from '@/types';
import { useTaskCard } from './TaskCardContext';
import { useTaskKanban } from './TaskKanbanContext';

function DeleteAddOnActions({ addOnTask }: { addOnTask: AddOnTask }) {
  const task = useTaskCard();
  const router = useRouter();
  const { close } = useActionDialog();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);

    try {
      const response = await deleteTaskAddOnById(task.id, addOnTask.id, task.projectId);

      if (!response.success) {
        toast.error(response.message || 'Could not delete add-on.');
        return;
      }

      toast.success('Add-on deleted.');
      close();
      router.refresh();
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

function TaskAddOnRow({ addOnTask }: { addOnTask: AddOnTask }) {
  const task = useTaskCard();
  const router = useRouter();
  const { canUpdate, canDelete: canManage } = useTaskKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<TaskAddOnUpdateFormInput, unknown, TaskAddOnUpdateFormValues>({
    resolver: zodResolver(taskAddOnUpdateSchema),
    defaultValues: {
      name: addOnTask.name,
    },
  });
  const nameError = form.formState.errors.name?.message;

  async function toggleCompletion() {
    setIsPending(true);

    try {
      const response = await updateTaskAddOnById(task.id, addOnTask.id, task.projectId, {
        isCompleted: !addOnTask.isCompleted,
      });

      if (!response.success) {
        toast.error(response.message || 'Could not update add-on.');
        return;
      }

      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  async function updateName(values: TaskAddOnUpdateFormValues) {
    setIsPending(true);

    try {
      const response = await updateTaskAddOnById(task.id, addOnTask.id, task.projectId, values);

      if (!response.success) {
        toast.error(response.message || 'Could not update add-on.');
        return;
      }

      setIsEditing(false);
      toast.success('Add-on updated.');
      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  if (isEditing) {
    return (
      <form
        className="space-y-1.5"
        onSubmit={form.handleSubmit(updateName)}
      >
        <div className="flex items-start gap-1">
          <Input
            aria-label="Add-on name"
            disabled={isPending}
            aria-invalid={Boolean(nameError)}
            className="h-7 text-xs"
            {...form.register('name')}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon-sm"
            disabled={isPending}
            aria-label="Save add-on"
          >
            <Check aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={isPending}
            aria-label="Cancel editing"
            onClick={() => {
              form.reset({ name: addOnTask.name });
              setIsEditing(false);
            }}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        {nameError && <FieldError errors={[{ message: nameError }]} />}
      </form>
    );
  }

  return (
    <div className="group/addon flex items-center gap-1.5">
      <button
        type="button"
        aria-label={`${addOnTask.isCompleted ? 'Mark incomplete' : 'Mark complete'}: ${addOnTask.name}`}
        aria-pressed={addOnTask.isCompleted}
        disabled={!canUpdate || isPending}
        onClick={() => void toggleCompletion()}
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded border transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          addOnTask.isCompleted
            ? 'border-emerald-500 bg-emerald-500 text-white'
            : 'border-input bg-background hover:border-primary',
        )}
      >
        {addOnTask.isCompleted ? (
          <Check
            className="size-3"
            aria-hidden="true"
          />
        ) : null}
      </button>
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-xs',
          addOnTask.isCompleted && 'text-muted-foreground line-through',
        )}
      >
        {addOnTask.name}
      </span>
      {canManage ? (
        <div className="flex opacity-0 transition-opacity group-hover/addon:opacity-100 group-focus-within/addon:opacity-100">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={isPending}
            aria-label={`Edit ${addOnTask.name}`}
            onClick={() => setIsEditing(true)}
          >
            <Pencil aria-hidden="true" />
          </Button>
          <ActionDialog
            title="Delete this add-on?"
            description="This checklist item will be removed from the task."
            trigger={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                disabled={isPending}
                aria-label={`Delete ${addOnTask.name}`}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            }
          >
            <DeleteAddOnActions addOnTask={addOnTask} />
          </ActionDialog>
        </div>
      ) : null}
    </div>
  );
}

export function TaskAddOnList() {
  const task = useTaskCard();
  const router = useRouter();
  const { canDelete: canManage } = useTaskKanban();
  const addOnTasks = task.addOnTasks ?? [];
  const form = useForm<TaskAddOnCreateFormInput, unknown, TaskAddOnCreateFormValues>({
    resolver: zodResolver(taskAddOnCreateSchema),
    defaultValues: { name: '' },
  });
  const isCreating = form.formState.isSubmitting;
  const reachedLimit = addOnTasks.length >= 5;
  const nameError = form.formState.errors.name?.message;

  async function createAddOn(values: TaskAddOnCreateFormValues) {
    const response = await createTaskAddOn(task.id, task.projectId, values);

    if (!response.success) {
      toast.error(response.message || 'Could not add checklist item.');
      return;
    }

    form.reset();
    toast.success('Checklist item added.');
    router.refresh();
  }

  return (
    <div className="space-y-5">
      {canManage ? (
        <form
          className="space-y-2"
          onSubmit={form.handleSubmit(createAddOn)}
        >
          <div className="flex gap-2">
            <Input
              aria-label="New checklist item"
              placeholder="Add a checklist item"
              disabled={isCreating || reachedLimit}
              aria-invalid={Boolean(nameError)}
              {...form.register('name')}
            />
            <Button
              type="submit"
              disabled={isCreating || reachedLimit}
            >
              {isCreating ? 'Adding...' : 'Add'}
            </Button>
          </div>
          {nameError ? <FieldError errors={[{ message: nameError }]} /> : null}
          {reachedLimit ? (
            <p className="text-xs text-muted-foreground">This task has the maximum of 5 items.</p>
          ) : null}
        </form>
      ) : null}

      {addOnTasks.length > 0 ? (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">
            {addOnTasks.filter((item) => item.isCompleted).length} of {addOnTasks.length} complete
          </p>
          <div className="space-y-2.5">
            {addOnTasks.map((addOnTask) => (
              <TaskAddOnRow
                key={`${addOnTask.id}:${addOnTask.updatedAt}`}
                addOnTask={addOnTask}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No checklist items yet.
        </p>
      )}
    </div>
  );
}
