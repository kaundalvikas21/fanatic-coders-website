'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePickerField } from '@/components/shared/forms/DatePickerField';
import { MultiSelectField } from '@/components/shared/forms/MultiSelectField';
import { SelectField } from '@/components/shared/forms/SelectField';
import { useSheet } from '@/components/shared/action-sheet';
import { UserAvatar } from '@/components/shared/user-avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrganizationMemberOptions } from '@/hooks/useOrganizationMemberOptions';
import {
  taskCreateSchema,
  type TaskFormInput,
  type TaskFormValues,
  taskUpdateSchema,
} from '@/modules/tasks/schemas/task';
import { createProjectTask, updateTaskById } from '@/modules/tasks/data/mutations';
import type {
  CreateTaskRequest,
  OrganizationMemberRole,
  Task,
  TaskPriority,
  UpdateTaskRequest,
} from '@/types';
import { TASK_PRIORITY_OPTIONS } from '@/types';
import { startOfToday } from '@/utils/date';
import { TaskCreateAddOnFields } from './TaskCreateAddOnFields';

type TaskFormProps = {
  projectId: string;
  task?: Task;
};

const TASK_ASSIGNMENT_ROLES = [
  'MANAGER',
  'MEMBER',
] as const satisfies readonly OrganizationMemberRole[];

export function TaskForm({ projectId, task }: TaskFormProps) {
  const router = useRouter();
  const sheet = useSheet();
  const {
    memberOptions: assigneeOptions,
    error: assigneeOptionsError,
    isLoading: isLoadingAssigneeOptions,
  } = useOrganizationMemberOptions(TASK_ASSIGNMENT_ROLES);
  const isEditing = Boolean(task);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<TaskFormInput, unknown, TaskFormValues>({
    resolver: zodResolver(isEditing ? taskUpdateSchema : taskCreateSchema),
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      priority: task?.priority ?? 'MEDIUM',
      dueDate: task?.dueDate?.slice(0, 10) ?? '',
      estimatedHours: task?.estimatedHours?.toString() ?? '',
      assigneeMemberIds: task?.assignees.map((assignee) => assignee.memberId) ?? [],
      addOnTasks: [{ name: '' }],
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const titleError = form.formState.errors.title?.message;
  const estimatedHoursError = form.formState.errors.estimatedHours?.message;
  const today = startOfToday();

  async function handleSubmit(values: TaskFormValues) {
    setMessage(null);

    try {
      if (task) {
        const { addOnTasks: _addOnTasks, ...payload } = values;
        const response = await updateTaskById(task.id, projectId, payload as UpdateTaskRequest);

        if (!response.success) {
          setMessage(response.message || 'Could not update task.');
          return;
        }

        toast.success('Task updated.');
        sheet.close();
        router.refresh();
        return;
      }

      const payload: CreateTaskRequest = values;
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
    <FormProvider {...form}>
      <form onSubmit={(event) => event.preventDefault()}>
        <FieldSet loading={isSubmitting}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="task-title">Title</FieldLabel>
              <Input
                id="task-title"
                placeholder="Homepage wireframe"
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
                    />
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="task-due-date">Due date</FieldLabel>
                <Controller
                  control={form.control}
                  name="dueDate"
                  render={({ field, fieldState }) => (
                    <>
                      <DatePickerField
                        id="task-due-date"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Pick due date"
                        ariaLabel="Task due date"
                        minDate={today}
                        error={fieldState.error?.message}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </>
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
                aria-invalid={Boolean(estimatedHoursError)}
                {...form.register('estimatedHours')}
              />
              {estimatedHoursError && <FieldError errors={[{ message: estimatedHoursError }]} />}
            </Field>

            <Controller
              control={form.control}
              name="assigneeMemberIds"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || Boolean(assigneeOptionsError)}>
                  <FieldLabel htmlFor="task-assignees">Assignees</FieldLabel>
                  <MultiSelectField
                    id="task-assignees"
                    options={assigneeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={
                      isLoadingAssigneeOptions ? 'Loading assignees...' : 'Select assignees'
                    }
                    noOptionsMessage={
                      assigneeOptionsError
                        ? 'Could not load assignable members.'
                        : 'No internal members available for assignment.'
                    }
                    ariaLabel="Task assignees"
                    invalid={fieldState.invalid || Boolean(assigneeOptionsError)}
                    disabled={isSubmitting || isLoadingAssigneeOptions}
                    renderOption={(option, context) =>
                      context === 'value' ? (
                        option.label
                      ) : (
                        <div className="flex min-w-0 items-center gap-2">
                          <UserAvatar
                            name={option.name}
                            email={option.email}
                            image={option.image}
                            className="size-7"
                          />
                          <span className="truncate">{option.label}</span>
                        </div>
                      )
                    }
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  {assigneeOptionsError && (
                    <FieldError errors={[{ message: 'Could not load assignable members.' }]} />
                  )}
                </Field>
              )}
            />

            {!isEditing ? <TaskCreateAddOnFields /> : null}

            {message && (
              <p
                className="text-sm text-destructive"
                aria-live="polite"
              >
                {message}
              </p>
            )}

            <Button
              type="button"
              aria-busy={isSubmitting}
              onClick={() => form.handleSubmit(handleSubmit)()}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="animate-spin motion-reduce:animate-none"
                    aria-hidden="true"
                  />
                  <span>{isEditing ? 'Saving task…' : 'Creating task…'}</span>
                </>
              ) : isEditing ? (
                'Save changes'
              ) : (
                'Create task'
              )}
            </Button>
            <span
              className="sr-only"
              role="status"
              aria-live="polite"
            >
              {isSubmitting ? (isEditing ? 'Saving task…' : 'Creating task…') : ''}
            </span>
          </FieldGroup>
        </FieldSet>
      </form>
    </FormProvider>
  );
}
