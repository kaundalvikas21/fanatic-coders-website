import { Settings2 } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import type { ServiceRequest } from '@/types';
import { ServiceRequestStatusForm } from './ServiceRequestStatusForm';

type ServiceRequestActionsCardProps = {
  request: ServiceRequest;
};

export function ServiceRequestActionsCard({ request }: ServiceRequestActionsCardProps) {
  return (
    <WidgetCard
      icon={Settings2}
      title="Request status"
      description="Move this request through its review stages."
      className="overflow-visible"
    >
      <ServiceRequestStatusForm
        requestId={request.id}
        initialStatus={request.status}
      />
    </WidgetCard>
  );
}
