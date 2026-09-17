'use client';

import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, LoaderCircle, Send, X } from 'lucide-react';
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
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
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

  if (mode === 'create') {
    return (
      <form
        className="w-full"
        onSubmit={form.handleSubmit(submit)}
        noValidate
      >
        <Field
          data-invalid={Boolean(contentError)}
          className="gap-3"
        >
          <FieldLabel
            htmlFor={fieldId}
            className="sr-only"
          >
            New task comment
          </FieldLabel>
          <div className="flex items-center gap-3">
            <Textarea
              id={fieldId}
              placeholder="Write a comment…"
              aria-invalid={Boolean(contentError)}
              aria-describedby={`${hintId}${contentError ? ` ${errorId}` : ''}`}
              maxLength={5000}
              disabled={isSubmitting}
              rows={1}
              className="field-sizing-fixed h-10 min-h-10 max-h-10 min-w-0 flex-1 resize-none overflow-y-auto rounded-xl bg-muted/30 px-3 py-2 text-sm leading-5 placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/30 md:text-sm motion-reduce:transition-none"
              {...form.register('content')}
              onKeyDown={(event) => {
                if (
                  event.key !== 'Enter' ||
                  event.shiftKey ||
                  event.nativeEvent.isComposing ||
                  isSubmitting ||
                  !content.trim()
                )
                  return;
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="size-9 rounded-lg text-primary hover:bg-primary/10 hover:text-primary motion-reduce:transition-none"
              aria-label={isSubmitting ? 'Posting comment' : 'Post comment'}
              title="Post comment"
              aria-busy={isSubmitting}
              disabled={isSubmitting || !content.trim()}
            >
              {isSubmitting ? (
                <LoaderCircle
                  className="size-5 animate-spin motion-reduce:animate-none"
                  aria-hidden="true"
                />
              ) : (
                <Send
                  className="size-5"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
          {contentError ? (
            <FieldError
              id={errorId}
              errors={[{ message: contentError }]}
            />
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5">
            <FieldDescription
              id={hintId}
              className="text-[11px] leading-4 text-foreground/70"
            >
              Enter to send. Shift+Enter for a new line.
            </FieldDescription>
            <span className="ml-auto text-[11px] leading-4 text-foreground/70 tabular-nums">
              {content.length.toLocaleString()} / 5,000
            </span>
          </div>
        </Field>
      </form>
    );
  }

  return (
    <form
      className="space-y-2"
      onSubmit={form.handleSubmit(submit)}
    >
      <Field data-invalid={Boolean(contentError)}>
        <FieldLabel
          htmlFor={fieldId}
          className="sr-only"
        >
          Edit task comment
        </FieldLabel>
        <Textarea
          id={fieldId}
          aria-invalid={Boolean(contentError)}
          maxLength={5000}
          disabled={isSubmitting}
          className="min-h-20 resize-y"
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
            size="sm"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            <X data-icon="inline-start" />
            Cancel
          </Button>
        ) : null}
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || !content.trim()}
        >
          <Check data-icon="inline-start" />
          {isSubmitting ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </form>
  );
}
