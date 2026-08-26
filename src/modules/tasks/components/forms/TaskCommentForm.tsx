'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Send, X } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import {
  taskCommentSchema,
  type TaskCommentFormInput,
  type TaskCommentFormValues,
} from '@/modules/tasks/schemas/task-comment';

type TaskCommentFormProps = {
  initialContent?: string;
  mode?: 'create' | 'edit';
  onSubmit: (values: TaskCommentFormValues) => Promise<boolean>;
  onCancel?: () => void;
};

export function TaskCommentForm({
  initialContent = '',
  mode = 'create',
  onSubmit,
  onCancel,
}: TaskCommentFormProps) {
  const form = useForm<TaskCommentFormInput, unknown, TaskCommentFormValues>({
    resolver: zodResolver(taskCommentSchema),
    defaultValues: { content: initialContent },
  });
  const content = useWatch({ control: form.control, name: 'content' }) ?? '';
  const contentError = form.formState.errors.content?.message;
  const isSubmitting = form.formState.isSubmitting;

  async function submit(values: TaskCommentFormValues) {
    const saved = await onSubmit(values);
    if (saved && mode === 'create') form.reset();
  }

  return (
    <form
      className="space-y-2"
      onSubmit={form.handleSubmit(submit)}
    >
      <Field data-invalid={Boolean(contentError)}>
        <FieldLabel
          htmlFor={`task-comment-${mode}`}
          className="sr-only"
        >
          {mode === 'create' ? 'New task comment' : 'Edit task comment'}
        </FieldLabel>
        <Textarea
          id={`task-comment-${mode}`}
          placeholder={mode === 'create' ? 'Write a comment…' : undefined}
          aria-invalid={Boolean(contentError)}
          maxLength={5000}
          disabled={isSubmitting}
          className={mode === 'create' ? 'min-h-24 resize-y' : 'min-h-20 resize-y'}
          {...form.register('content')}
        />
        <div className="flex min-h-5 items-start justify-between gap-3">
          <FieldError errors={contentError ? [{ message: contentError }] : undefined} />
          {!contentError ? (
            <FieldDescription className="ml-auto text-xs tabular-nums">
              {content.length}/5000
            </FieldDescription>
          ) : null}
        </div>
      </Field>

      <div className="flex justify-end gap-1">
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            size={mode === 'edit' ? 'sm' : 'default'}
            disabled={isSubmitting}
            onClick={onCancel}
          >
            <X data-icon="inline-start" />
            Cancel
          </Button>
        ) : null}
        <Button
          type="submit"
          size={mode === 'edit' ? 'sm' : 'default'}
          disabled={isSubmitting || !content.trim()}
        >
          {mode === 'create' ? (
            <Send data-icon="inline-start" />
          ) : (
            <Check data-icon="inline-start" />
          )}
          {isSubmitting
            ? mode === 'create'
              ? 'Posting…'
              : 'Saving…'
            : mode === 'create'
              ? 'Post comment'
              : 'Save'}
        </Button>
      </div>
    </form>
  );
}
