'use client';

import { Card, CardFooter } from '@/components/ui/card';
import { ChatComposer } from './ChatComposer';
import { ChatMessageThread } from './ChatMessageThread';
import { ChatStatusBanner } from './ChatStatusBanner';

export type LiveChatCapabilities = {
  canSend: boolean;
  canSendInternal: boolean;
};

type LiveChatThreadProps = {
  capabilities: LiveChatCapabilities;
  ariaLabel?: string;
};

export function LiveChatThread({
  capabilities,
  ariaLabel = 'Live chat messages',
}: LiveChatThreadProps) {
  return (
    <Card className="h-full min-h-0 gap-0 rounded-none bg-background py-0 text-foreground ring-0">
      <ChatStatusBanner />
      <ChatMessageThread ariaLabel={ariaLabel} />
      {capabilities.canSend && (
        <CardFooter className="shrink-0 rounded-none border-border bg-background px-4 py-4 sm:px-6">
          <ChatComposer canSendInternal={capabilities.canSendInternal} />
        </CardFooter>
      )}
    </Card>
  );
}
