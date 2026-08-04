'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CircleAlert, LockKeyhole, Radio, SendHorizontal } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { io, type Socket } from 'socket.io-client';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { env } from '@/config/env';
import { FCOP_AUTH_TOKEN_STORAGE_KEY } from '@/lib/auth/bearer-token';
import { getRoleLabel } from '@/lib/auth/roles';
import {
  liveChatMessageSchema,
  LIVE_CHAT_MESSAGE_MAX_LENGTH,
} from '@/modules/chat/schemas/live-chat';
import { EmptyLiveChat } from './EmptyLiveChat';
import { LiveChatMessageItem } from './LiveChatMessageItem';

export type LiveChatCapabilities = {
  canSend: boolean;
  canSendInternal: boolean;
};

export type LiveChatChannel = {
  type: 'service-request';
  id: string;
};

type LiveChatThreadProps = {
  channel: LiveChatChannel;
  capabilities: LiveChatCapabilities;
  ariaLabel?: string;
};

type LiveChatMessage = {
  id: string;
  channel: LiveChatChannel;
  authorMemberId: string;
  body: string;
  isInternal: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    role: string;
    user: {
      id: string;
      name: string;
      email?: string | null;
      image: string | null;
    };
  };
};

type ChatResponse<T = undefined> =
  | { success: true; data?: T }
  | { success: false; message: string; code: string };

type ServerToClientEvents = {
  'chat:message': (message: LiveChatMessage) => void;
};

type ClientToServerEvents = {
  'chat:join': (
    payload: { channel: LiveChatChannel },
    acknowledge: (response: ChatResponse) => void,
  ) => void;
  'chat:leave': (payload: { channel: LiveChatChannel }) => void;
  'chat:send': (
    payload: { channel: LiveChatChannel; body: string; isInternal: boolean },
    acknowledge: (response: ChatResponse<LiveChatMessage>) => void,
  ) => void;
};

type ChatSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
type ConnectionStatus = 'connecting' | 'live' | 'reconnecting' | 'offline';

const connectionStatusLabels = {
  connecting: 'Connecting',
  live: 'Live',
  reconnecting: 'Reconnecting',
  offline: 'Offline',
} as const satisfies Record<ConnectionStatus, string>;

type LiveChatFormInput = z.input<typeof liveChatMessageSchema>;
type LiveChatFormValues = z.output<typeof liveChatMessageSchema>;

export function LiveChatThread({
  channel,
  capabilities,
  ariaLabel = 'Live chat messages',
}: LiveChatThreadProps) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const channelType = channel.type;
  const channelId = channel.id;
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const messageLogRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<ChatSocket | null>(null);
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
    const activeChannel: LiveChatChannel = { type: channelType, id: channelId };
    const token = localStorage.getItem(FCOP_AUTH_TOKEN_STORAGE_KEY);
    const socket: ChatSocket = io(env.NEXT_PUBLIC_API_URL, {
      auth: { token },
      transports: ['websocket'],
      withCredentials: true,
    });

    socketRef.current = socket;

    const joinRoom = () => {
      setConnectionStatus('connecting');
      setConnectionError(null);
      socket.emit('chat:join', { channel: activeChannel }, (response) => {
        if (!response.success) {
          setConnectionStatus('offline');
          setConnectionError(response.message);
          return;
        }

        setConnectionStatus('live');
      });
    };

    const receiveMessage = (message: LiveChatMessage) => {
      setMessages((current) =>
        current.some((item) => item.id === message.id) ? current : [...current, message],
      );
    };

    socket.on('connect', joinRoom);
    socket.on('chat:message', receiveMessage);
    socket.on('connect_error', (error) => {
      setConnectionStatus('offline');
      setConnectionError(error.message || 'Could not connect to live chat.');
    });
    socket.io.on('reconnect_attempt', () => {
      setConnectionStatus('reconnecting');
      setConnectionError(null);
    });

    return () => {
      socket.emit('chat:leave', { channel: activeChannel });
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [channelId, channelType]);

  useEffect(() => {
    const messageLog = messageLogRef.current;

    if (messageLog) {
      messageLog.scrollTop = messageLog.scrollHeight;
    }
  }, [messages.length]);

  async function submitMessage(values: LiveChatFormValues, socket: ChatSocket | null) {
    form.clearErrors('root.server');

    if (!socket?.connected || connectionStatus !== 'live') {
      const message = 'Live chat is offline. Reconnect before sending.';
      form.setError('root.server', { message });
      toast.error(message);
      return;
    }

    await new Promise<void>((resolve) => {
      socket.timeout(10_000).emit(
        'chat:send',
        {
          channel,
          body: values.body,
          isInternal: values.isInternal,
        },
        (error, response) => {
          if (error || !response?.success) {
            const message =
              response?.success === false ? response.message : 'Message delivery timed out.';
            form.setError('root.server', { message });
            toast.error(message);
            resolve();
            return;
          }

          form.reset();
          resolve();
        },
      );
    });
  }

  return (
    <div>
      <div className="flex items-start gap-3 border-b border-border bg-muted/40 px-6 py-3">
        <CircleAlert
          className="mt-0.5 size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs leading-5 text-muted-foreground">
            Live messages are temporary and are not saved. Refreshing or leaving this page clears
            the conversation.
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
        className="max-h-[32rem] overflow-y-auto"
        role="log"
        aria-label={ariaLabel}
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <EmptyLiveChat />
        ) : (
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <LiveChatMessageItem
                key={message.id}
                author={message.author.user}
                label={getRoleLabel(message.author.role)}
                meta={
                  message.isInternal ? (
                    <Badge
                      variant="secondary"
                      className="gap-1"
                    >
                      <LockKeyhole aria-hidden="true" />
                      Internal
                    </Badge>
                  ) : undefined
                }
                timestamp={
                  <time
                    dateTime={message.createdAt}
                    className="text-xs text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {format(new Date(message.createdAt), 'MMM d, yyyy · h:mm a')}
                  </time>
                }
                className={message.isInternal ? 'bg-muted/50' : undefined}
              >
                {message.body}
              </LiveChatMessageItem>
            ))}
          </div>
        )}
      </div>

      {capabilities.canSend && (
        <form
          onSubmit={(event) => {
            const socket = socketRef.current;
            void form.handleSubmit((values) => submitMessage(values, socket))(event);
          }}
          className="border-t border-border px-6 py-4"
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
