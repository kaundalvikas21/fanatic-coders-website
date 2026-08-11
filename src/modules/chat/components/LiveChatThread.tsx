'use client';

import { useEffect, useId, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CircleAlert, LockKeyhole, Radio, SendHorizontal } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/components/ui/message';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { UserAvatar } from '@/components/shared/user-avatar';
import { getRoleLabel } from '@/lib/auth/roles';
import {
  liveChatMessageSchema,
  LIVE_CHAT_MESSAGE_MAX_LENGTH,
} from '@/modules/chat/schemas/live-chat';
import { EmptyLiveChat } from './EmptyLiveChat';
import { useChat, type ChatConnectionStatus } from './ChatProvider';

export type LiveChatCapabilities = {
  canSend: boolean;
  canSendInternal: boolean;
};

type LiveChatThreadProps = {
  capabilities: LiveChatCapabilities;
  ariaLabel?: string;
};

const connectionStatusLabels = {
  connecting: 'Connecting',
  live: 'Live',
  reconnecting: 'Reconnecting',
  offline: 'Offline',
} as const satisfies Record<ChatConnectionStatus, string>;

type LiveChatFormInput = z.input<typeof liveChatMessageSchema>;
type LiveChatFormValues = z.output<typeof liveChatMessageSchema>;

export function LiveChatThread({
  capabilities,
  ariaLabel = 'Live chat messages',
}: LiveChatThreadProps) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const { messages, connectionStatus, connectionError, sendMessage } = useChat();
  const messageLogRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const messageLog = messageLogRef.current;

    if (messageLog) {
      messageLog.scrollTop = messageLog.scrollHeight;
    }
  }, [messages.length]);

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
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="shrink-0 flex items-start gap-3 border-b border-border bg-muted/40 px-6 py-3">
        <CircleAlert
          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs leading-5 text-muted-foreground">
            Recent messages are retained temporarily and may be removed after the retention period.
          </p>
          {connectionError && (
            <p
              className="mt-1 text-xs text-destructive"
              aria-live="polite"
            >
              {connectionError}
            </p>
          )}
        </div>
        <Badge
          variant={connectionStatus === 'live' ? 'secondary' : 'outline'}
          className="shrink-0 gap-1"
        >
          <Radio
            className="size-3"
            aria-hidden="true"
          />
          {connectionStatusLabels[connectionStatus]}
        </Badge>
      </div>

      <div
        ref={messageLogRef}
        className="min-h-0 flex-1 overflow-y-auto"
        role="log"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <EmptyLiveChat />
        ) : (
          <div className="space-y-4 p-4 sm:p-6">
            {messages.map((message) => (
              <Message
                key={message.id}
                className={message.isInternal ? 'rounded-lg bg-muted/40 p-3' : undefined}
              >
                <MessageAvatar>
                  <UserAvatar
                    name={message.author.user.name}
                    email={message.author.user.email}
                    image={message.author.user.image}
                    className="size-8"
                  />
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader className="flex-wrap gap-x-2 gap-y-1 px-0">
                    <span className="text-foreground">{message.author.user.name}</span>
                    <span>{getRoleLabel(message.author.role)}</span>
                    {message.isInternal && (
                      <Badge
                        variant="secondary"
                        className="gap-1"
                      >
                        <LockKeyhole aria-hidden="true" />
                        Internal
                      </Badge>
                    )}
                  </MessageHeader>
                  <div className="w-fit max-w-[75ch] whitespace-pre-wrap wrap-break-word rounded-lg bg-muted px-3 py-2 text-sm leading-6">
                    {message.body}
                  </div>
                  <MessageFooter className="px-0">
                    <time
                      dateTime={message.createdAt}
                      suppressHydrationWarning
                    >
                      {format(new Date(message.createdAt), 'MMM d, yyyy · h:mm a')}
                    </time>
                  </MessageFooter>
                </MessageContent>
              </Message>
            ))}
          </div>
        )}
      </div>

      {capabilities.canSend && (
        <form
          onSubmit={(event) => {
            void form.handleSubmit(submitMessage)(event);
          }}
          className="shrink-0 border-t border-border bg-background px-6 py-4"
          noValidate
        >
          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor={fieldId}>Add a message</FieldLabel>
            <Textarea
              id={fieldId}
              maxLength={LIVE_CHAT_MESSAGE_MAX_LENGTH}
              placeholder={isInternal ? 'Add a note for your internal team…' : 'Write a message…'}
              aria-invalid={Boolean(error)}
              aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
              disabled={isSubmitting}
              className="min-h-24 resize-y"
              {...form.register('body', {
                onChange: () => form.clearErrors('root.server'),
              })}
            />

            <div className="flex flex-wrap items-center gap-2">
              {capabilities.canSendInternal && (
                <Controller
                  control={form.control}
                  name="isInternal"
                  render={({ field }) => (
                    <Toggle
                      variant="outline"
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

              <FieldDescription
                id={hintId}
                className="mr-auto text-xs"
              >
                {body.length.toLocaleString()} / {LIVE_CHAT_MESSAGE_MAX_LENGTH.toLocaleString()}
              </FieldDescription>

              <Button
                type="submit"
                disabled={isSubmitting || connectionStatus !== 'live' || body.trim().length === 0}
              >
                <SendHorizontal aria-hidden="true" />
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
            </div>

            <FieldError
              id={errorId}
              errors={[bodyError, serverError]}
            />
          </Field>
        </form>
      )}
    </div>
  );
}
