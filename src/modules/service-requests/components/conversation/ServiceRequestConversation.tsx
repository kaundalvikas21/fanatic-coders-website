import { MessageSquareText } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { getServiceRequestMessages } from '@/modules/service-requests/data/messages';
import { ServiceRequestMessageThread } from './ServiceRequestMessageThread';

type ServiceRequestConversationProps = {
  serviceRequestId: string;
};

export async function ServiceRequestConversation({
  serviceRequestId,
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
