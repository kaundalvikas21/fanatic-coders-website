'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePickerField } from '@/components/shared/forms/DatePickerField';
import { MultiSelectField } from '@/components/shared/forms/MultiSelectField';
import { SelectField } from '@/components/shared/forms/SelectField';
import { useSheet } from '@/components/shared/action-sheet';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProjectTask } from '@/modules/projects/data/tasks/mutations';
import {
  taskCreateSchema,
  type TaskCreateFormInput,
  type TaskCreateFormValues,
} from '@/modules/projects/schemas/task';
import type { CreateTaskRequest, TaskPriority, UserListItem } from '@/types';
import { TASK_PRIORITY_OPTIONS } from '@/types';
import { startOfToday } from '@/utils/date';

type TaskCreateFormProps = {
  projectId: string;
  assignableMembers: UserListItem[];
};

export function TaskCreateForm({ projectId, assignableMembers }: TaskCreateFormProps) {
  const sheet = useSheet();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<TaskCreateFormInput, unknown, TaskCreateFormValues>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
      estimatedHours: '',
      assigneeMemberIds: [],
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const titleError = form.formState.errors.title?.message;
  const dueDateError = form.formState.errors.dueDate?.message;
  const estimatedHoursError = form.formState.errors.estimatedHours?.message;
  const today = startOfToday();
  const assigneeOptions = assignableMembers.map((member) => ({
    label: member.user.name || member.user.email,
    value: member.id,
    name: member.user.name,
    email: member.user.email,
    image: member.user.image,
  }));

  async function handleSubmit(values: TaskCreateFormValues) {
    const payload: CreateTaskRequest = values;

    setMessage(null);

    try {
      const response = await createProjectTask(projectId, payload);

      if (!response.success) {
        setMessage(response.message || 'Could not create task.');
        return;
      }

      toast.success('Task created.');
      form.reset();
      sheet?.close();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create task.');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="task-title">Title</FieldLabel>
          <Input
            id="task-title"
            placeholder="Homepage wireframe"
            disabled={isSubmitting}
            aria-invalid={Boolean(titleError)}
            {...form.register('title')}
          />
          {titleError && <FieldError errors={[{ message: titleError }]} />}
        </Field>

        <Field>
          <FieldLabel htmlFor="task-description">Description</FieldLabel>
          <Textarea
            id="task-description"
            placeholder="Brief, acceptance notes, or links"
            disabled={isSubmitting}
            {...form.register('description')}
          />
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel>Priority</FieldLabel>
            <Controller
              control={form.control}
              name="priority"
              render={({ field }) => (
                <SelectField
                  id="task-priority"
                  value={field.value}
                  options={TASK_PRIORITY_OPTIONS}
                  onChange={(value) => field.onChange(value as TaskPriority)}
                  ariaLabel="Task priority"
                  disabled={isSubmitting}
                />
              )}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="task-due-date">Due date</FieldLabel>
            <Controller
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <DatePickerField
                  id="task-due-date"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Pick due date"
                  ariaLabel="Task due date"
                  disabled={isSubmitting}
                  minDate={today}
                  error={dueDateError}
                />
              )}
            />
            {dueDateError && <FieldError errors={[{ message: dueDateError }]} />}
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="task-estimated-hours">Estimated hours</FieldLabel>
          <Input
            id="task-estimated-hours"
            type="number"
            min="0"
            step="0.25"
            placeholder="8"
            disabled={isSubmitting}
            aria-invalid={Boolean(estimatedHoursError)}
            {...form.register('estimatedHours')}
          />
          {estimatedHoursError && <FieldError errors={[{ message: estimatedHoursError }]} />}
        </Field>

        <Field>
          <FieldLabel htmlFor="task-assignees">Assignees</FieldLabel>
          <Controller
            control={form.control}
            name="assigneeMemberIds"
            render={({ field }) => (
              <MultiSelectField
                id="task-assignees"
                options={assigneeOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Select assignees"
                noOptionsMessage="No internal members available for assignment."
                ariaLabel="Task assignees"
                disabled={isSubmitting || assigneeOptions.length === 0}
                renderOption={(option, context) =>
                  context === 'value' ? (
                    option.label
                  ) : (
                    <div className="flex min-w-0 items-center gap-2 cursor-pointer">
                      <UserAvatar
                        name={option.name}
                        email={option.email}
                        image={option.image}
                        className="size-7"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{option.label}</p>
                        <p className="truncate text-xs opacity-70">{option.email}</p>
                      </div>
                    </div>
                  )
                }
              />
            )}
          />
        </Field>

        {message && (
          <p
            className="text-sm text-destructive"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating task' : 'Create task'}
        </Button>
      </FieldGroup>
    </form>
  );
}
