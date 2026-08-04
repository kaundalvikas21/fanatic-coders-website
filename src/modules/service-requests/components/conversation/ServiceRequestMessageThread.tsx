'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { LockKeyhole, SendHorizontal } from 'lucide-react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Toggle } from '@/components/ui/toggle';
import { getRoleLabel } from '@/lib/auth/roles';
import { createServiceRequestMessage } from '@/modules/service-requests/data/messages';
import { useServiceRequestMessagePermissions } from '@/modules/service-requests/hooks/use-service-request-message-permissions';
import {
  createServiceRequestMessageSchema,
  SERVICE_REQUEST_MESSAGE_MAX_LENGTH,
} from '@/modules/service-requests/schemas/message';
import type { ServiceRequestMessage } from '@/types';
import { ServiceRequestMessageItem } from './ServiceRequestMessageItem';
import { NoConversationFound } from './NoConversationFound';

type ServiceRequestMessageThreadProps = {
  serviceRequestId: string;
  initialMessages: ServiceRequestMessage[];
};

type ServiceRequestMessageFormInput = z.input<typeof createServiceRequestMessageSchema>;
type ServiceRequestMessageFormValues = z.output<typeof createServiceRequestMessageSchema>;

export function ServiceRequestMessageThread({
  serviceRequestId,
  initialMessages,
}: ServiceRequestMessageThreadProps) {
  const permissions = useServiceRequestMessagePermissions();
  const [messages, setMessages] = useState(initialMessages);
  const messageLogRef = useRef<HTMLDivElement>(null);
  const form = useForm<ServiceRequestMessageFormInput, unknown, ServiceRequestMessageFormValues>({
    resolver: zodResolver(createServiceRequestMessageSchema),
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

  async function submitMessage(values: ServiceRequestMessageFormValues) {
    form.clearErrors('root.server');

    try {
      const response = await createServiceRequestMessage(serviceRequestId, values);

      if (!response.success) {
        const message = response.message || 'Could not send your message.';
        form.setError('root.server', { message });
        toast.error(message);
        return;
      }

      setMessages((current) => [...current, response.data]);
      form.reset();
    } catch {
      const message = 'Could not send your message. Please try again.';
      form.setError('root.server', { message });
      toast.error(message);
    }
  }

  return (
    <div>
      <div
        ref={messageLogRef}
        className="max-h-[32rem] overflow-y-auto"
        role="log"
        aria-label="Service request consultation messages"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <NoConversationFound />
        ) : (
          <div className="divide-y divide-border">
            {messages.map((message) => (
              <ServiceRequestMessageItem
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
              </ServiceRequestMessageItem>
            ))}
          </div>
        )}
      </div>

      {permissions.canCreate && (
        <form
          onSubmit={form.handleSubmit(submitMessage)}
          className="border-t border-border px-6 py-4"
          noValidate
        >
          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="service-request-message">Add a message</FieldLabel>
            <Textarea
              id="service-request-message"
              maxLength={SERVICE_REQUEST_MESSAGE_MAX_LENGTH}
              placeholder={isInternal ? 'Add a note for your internal team…' : 'Write a message…'}
              aria-invalid={Boolean(error)}
              aria-describedby={`service-request-message-hint${error ? ' service-request-message-error' : ''}`}
              disabled={isSubmitting}
              className="min-h-24 resize-y"
              {...form.register('body', {
                onChange: () => form.clearErrors('root.server'),
              })}
            />

            <div className="flex flex-wrap items-center gap-2">
              {permissions.canCreateInternal && (
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
                id="service-request-message-hint"
                className="mr-auto text-xs"
              >
                {body.length.toLocaleString()} /{' '}
                {SERVICE_REQUEST_MESSAGE_MAX_LENGTH.toLocaleString()}
              </FieldDescription>

              <Button
                type="submit"
                disabled={isSubmitting || body.trim().length === 0}
              >
                <SendHorizontal aria-hidden="true" />
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
            </div>

            <FieldError
              id="service-request-message-error"
              errors={[bodyError, serverError]}
            />
          </Field>
        </form>
      )}
    </div>
  );
}
