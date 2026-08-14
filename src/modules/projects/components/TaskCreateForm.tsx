'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePickerField } from '@/components/shared/forms/DatePickerField';
import { SelectField } from '@/components/shared/forms/SelectField';
import { useSheet } from '@/components/shared/action-sheet';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProjectTask } from '@/modules/projects/data/tasks';
import type { CreateTaskRequest, TaskPriority, UserListItem } from '@/types';
import { TASK_PRIORITY_OPTIONS } from '@/types';
import { formatDateInputValue, startOfToday } from '@/utils/date';

type TaskCreateFormProps = {
  projectId: string;
  assignableMembers: UserListItem[];
};

type TaskCreateFormValues = {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  estimatedHours: string;
  assigneeMemberIds: string[];
};

export function TaskCreateForm({ projectId, assignableMembers }: TaskCreateFormProps) {
  const sheet = useSheet();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<TaskCreateFormValues>({
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
  const estimatedHoursError = form.formState.errors.estimatedHours?.message;
  const today = startOfToday();
  const todayValue = formatDateInputValue(today);

  async function handleSubmit(values: TaskCreateFormValues) {
    const title = values.title.trim();
    const description = values.description.trim();
    const estimatedHours = values.estimatedHours.trim();
    const payload: CreateTaskRequest = {
      title,
      priority: values.priority,
      assigneeMemberIds: values.assigneeMemberIds,
    };

    setMessage(null);

    if (description) {
      payload.description = description;
    }

    if (values.dueDate) {
      if (values.dueDate < todayValue) {
        setMessage('Due date cannot be in the past.');
        return;
      }

      payload.dueDate = values.dueDate;
    }

    if (estimatedHours) {
      const parsedHours = Number(estimatedHours);

      if (!Number.isFinite(parsedHours) || parsedHours < 0) {
        form.setError('estimatedHours', {
          message: 'Enter valid hours greater than or equal to 0.',
        });
        return;
      }

      payload.estimatedHours = parsedHours;
    }

    const response = await createProjectTask(projectId, payload);

    if (!response.success) {
      setMessage(response.message || 'Could not create task.');
      return;
    }

    toast.success('Task created.');
    form.reset({
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
      estimatedHours: '',
      assigneeMemberIds: [],
    });
    sheet?.close();
  }

  return (
    <form
      className="px-4 pb-5"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="task-title">Title</FieldLabel>
          <Input
            id="task-title"
            placeholder="Homepage wireframe"
            disabled={isSubmitting}
            aria-invalid={Boolean(titleError)}
            {...form.register('title', {
              required: 'Enter a task title.',
            })}
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
            <FieldLabel>Due date</FieldLabel>
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
                />
              )}
            />
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
          <FieldLabel>Assignees</FieldLabel>
          <Controller
            control={form.control}
            name="assigneeMemberIds"
            render={({ field }) => (
              <div className="grid gap-2 rounded-lg border p-3">
                {assignableMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No internal members available for assignment.
                  </p>
                ) : (
                  assignableMembers.map((member) => {
                    const checked = field.value.includes(member.id);

                    return (
                      <label
                        key={member.id}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                      >
                        <input
                          type="checkbox"
                          className="size-4"
                          checked={checked}
                          disabled={isSubmitting}
                          onChange={(event) => {
                            const nextValue = event.target.checked
                              ? [...field.value, member.id]
                              : field.value.filter((memberId) => memberId !== member.id);

                            field.onChange(nextValue);
                          }}
                        />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{member.user.name}</span>
                          <span className="block truncate text-muted-foreground">
                            {member.user.email}
                          </span>
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
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
