'use client';

import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { LockKeyhole } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/components/ui/message';
import { UserAvatar } from '@/components/shared/user-avatar';
import { getRoleLabel } from '@/lib/auth/roles';
import { EmptyLiveChat } from './EmptyLiveChat';
import { useChat } from './ChatProvider';

type ChatMessageThreadProps = {
  ariaLabel: string;
};

export function ChatMessageThread({ ariaLabel }: ChatMessageThreadProps) {
  const { messages } = useChat();
  const messageLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageLog = messageLogRef.current;

    if (messageLog) {
      messageLog.scrollTop = messageLog.scrollHeight;
    }
  }, [messages.length]);

  return (
    <CardContent
      ref={messageLogRef}
      className="min-h-0 flex-1 overflow-y-auto px-0"
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
    </CardContent>
  );
}
