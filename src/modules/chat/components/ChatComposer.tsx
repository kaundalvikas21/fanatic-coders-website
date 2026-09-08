'use client';

import { useId } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert, LoaderCircle, LockKeyhole, Send } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import {
  liveChatMessageSchema,
  LIVE_CHAT_MESSAGE_MAX_LENGTH,
} from '@/modules/chat/schemas/live-chat';
import { useChat } from './ChatProvider';

type ChatComposerProps = {
  canSendInternal: boolean;
};

type LiveChatFormInput = z.input<typeof liveChatMessageSchema>;
type LiveChatFormValues = z.output<typeof liveChatMessageSchema>;

export function ChatComposer({ canSendInternal }: ChatComposerProps) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const { connectionStatus, sendMessage } = useChat();
  const form = useForm<LiveChatFormInput, unknown, LiveChatFormValues>({
    resolver: zodResolver(liveChatMessageSchema),
    mode: 'onChange',
    defaultValues: {
      body: '',
      isInternal: false,
    },
  });
  const body = useWatch({ control: form.control, name: 'body' }) ?? '';
  const isInternal = useWatch({ control: form.control, name: 'isInternal' }) ?? false;
  const bodyError = form.formState.errors.body;
  const serverError = form.formState.errors.root?.server;
  const error = bodyError?.message ?? serverError?.message;
  const isSubmitting = form.formState.isSubmitting;

  async function submitMessage(values: LiveChatFormValues) {
    form.clearErrors('root.server');
    const response = await sendMessage(values);

    if (!response.success) {
      form.setError('root.server', { message: response.message });
      toast.error(response.message);
      return;
    }

    form.reset();
  }

  return (
    <form
      onSubmit={(event) => {
        void form.handleSubmit(submitMessage)(event);
      }}
      className="w-full"
      noValidate
    >
      <Field
        data-invalid={Boolean(error)}
        className="gap-3"
      >
        <FieldLabel
          htmlFor={fieldId}
          className="sr-only"
        >
          Add a message
        </FieldLabel>
        <div className="flex items-center gap-3">
          <Textarea
            id={fieldId}
            maxLength={LIVE_CHAT_MESSAGE_MAX_LENGTH}
            placeholder={isInternal ? 'Add a note for your internal team…' : 'Write a message…'}
            aria-invalid={Boolean(error)}
            aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
            disabled={isSubmitting}
            rows={1}
            className="field-sizing-fixed h-11 min-h-11 max-h-11 min-w-0 flex-1 resize-none overflow-y-auto rounded-xl bg-muted/30 px-4 py-2.5 text-base leading-5 placeholder:text-foreground/60 focus-visible:ring-2 focus-visible:ring-ring/30 md:text-base motion-reduce:transition-none"
            {...form.register('body', {
              onChange: () => form.clearErrors('root.server'),
            })}
            onKeyDown={(event) => {
              if (
                event.key !== 'Enter' ||
                event.shiftKey ||
                event.nativeEvent.isComposing ||
                isSubmitting ||
                connectionStatus !== 'live' ||
                body.trim().length === 0
              ) {
                return;
              }

              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }}
          />
          <Button
            type="submit"
            size="icon-lg"
            variant="ghost"
            className="size-11 rounded-lg text-primary hover:bg-primary/10 hover:text-primary motion-reduce:transition-none"
            aria-label={isSubmitting ? 'Sending message' : 'Send message'}
            title="Send message"
            aria-busy={isSubmitting}
            disabled={isSubmitting || connectionStatus !== 'live' || body.trim().length === 0}
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

        {error && (
          <FieldError
            id={errorId}
            className="-mt-1 flex items-start gap-1.5 text-xs leading-5"
          >
            <CircleAlert
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <span className="min-w-0 wrap-break-word">{error}</span>
          </FieldError>
        )}

        <div className="flex min-h-8 items-center justify-between gap-3">
          {canSendInternal && (
            <Controller
              control={form.control}
              name="isInternal"
              render={({ field }) => (
                <Toggle
                  variant="outline"
                  size="sm"
                  className="shrink-0 gap-1.5 text-xs"
                  pressed={field.value ?? false}
                  onPressedChange={field.onChange}
                  disabled={isSubmitting}
                >
                  <LockKeyhole aria-hidden="true" />
                  Internal note
                </Toggle>
              )}
            />
          )}

          <span className="ml-auto whitespace-nowrap text-xs leading-5 text-foreground/70 tabular-nums">
            {body.length.toLocaleString()} / {LIVE_CHAT_MESSAGE_MAX_LENGTH.toLocaleString()}
          </span>
        </div>
        <FieldDescription
          id={hintId}
          className="-mt-1 text-xs leading-5 text-foreground/70"
        >
          Enter to send. Shift+Enter for a new line.
        </FieldDescription>
      </Field>
    </form>
  );
}
