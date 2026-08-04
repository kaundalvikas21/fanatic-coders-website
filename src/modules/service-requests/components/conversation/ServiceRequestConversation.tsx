import { MessageSquareText } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { getServiceRequestMessages } from '@/modules/service-requests/data/messages';
import { ServiceRequestMessageThread } from './ServiceRequestMessageThread';

type ServiceRequestConversationProps = {
  serviceRequestId: string;
  showHeader?: boolean;
};

export async function ServiceRequestConversation({
  serviceRequestId,
  showHeader = true,
}: ServiceRequestConversationProps) {
  const response = await getServiceRequestMessages(serviceRequestId);

  const content = response.success ? (
    <ServiceRequestMessageThread
      serviceRequestId={serviceRequestId}
      initialMessages={response.data}
    />
  ) : (
    <p className="px-6 py-8 text-sm text-destructive">
      {response.message || 'Could not load consultation messages.'}
    </p>
  );

  if (!showHeader) {
    return content;
  }

  return (
    <WidgetCard
      icon={MessageSquareText}
      title="Consultation"
      description="Discuss requirements, scope, timing, and next steps for this request."
      contentClassNames="p-0"
    >
      {content}
    </WidgetCard>
  );
}
