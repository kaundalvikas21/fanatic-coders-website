'use client';

import { MessageSquareText } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { LiveChatThread } from '@/modules/chat';
import { useServiceRequestChatCapabilities } from '@/modules/service-requests/hooks/use-service-request-chat-capabilities';

type ServiceRequestConversationProps = {
  serviceRequestId: string;
  showHeader?: boolean;
};

export function ServiceRequestConversation({
  serviceRequestId,
  showHeader = true,
}: ServiceRequestConversationProps) {
  const capabilities = useServiceRequestChatCapabilities();
  const content = (
    <LiveChatThread
      channel={{ type: 'service-request', id: serviceRequestId }}
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
