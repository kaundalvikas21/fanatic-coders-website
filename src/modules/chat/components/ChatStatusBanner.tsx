'use client';

import { CircleAlert, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardDescription, CardHeader } from '@/components/ui/card';
import { useChat, type ChatConnectionStatus } from './ChatProvider';

const connectionStatusLabels = {
  connecting: 'Connecting',
  live: 'Live',
  reconnecting: 'Reconnecting',
  offline: 'Offline',
} as const satisfies Record<ChatConnectionStatus, string>;

export function ChatStatusBanner() {
  const { connectionStatus, connectionError } = useChat();

  return (
    <CardHeader
      className="flex shrink-0 items-start gap-3 rounded-none border-b border-amber-500/25 bg-amber-500/10 px-6 py-3 [.border-b]:pb-3"
      role="note"
      aria-label="Message retention notice"
    >
      <CircleAlert
        className="mt-0.5 size-4 shrink-0 text-amber-700 dark:text-amber-300"
        aria-hidden="true"
      />
      <CardDescription className="min-w-0 flex-1 text-foreground">
        <p className="text-xs font-medium leading-5 text-foreground">
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
      </CardDescription>
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
    </CardHeader>
  );
}
