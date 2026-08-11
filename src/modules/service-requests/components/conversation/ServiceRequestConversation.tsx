'use client';

import { MessageSquareText } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { LiveChatThread, type LiveChatCapabilities } from '@/modules/chat';

type ServiceRequestConversationProps = {
  capabilities: LiveChatCapabilities;
  showHeader?: boolean;
};

export function ServiceRequestConversation({
  capabilities,
  showHeader = true,
}: ServiceRequestConversationProps) {
  const content = (
    <LiveChatThread
      capabilities={capabilities}
      ariaLabel="Service request chat messages"
    />
  );

  if (!showHeader) {
    return content;
  }

  return (
    <WidgetCard
      icon={MessageSquareText}
      title="Request chat"
      description="Discuss requirements, scope, timing, and next steps for this request."
      contentClassNames="p-0"
    >
      {content}
    </WidgetCard>
  );
}
