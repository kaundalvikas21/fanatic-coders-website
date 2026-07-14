import { WidgetCard } from '@/components/shared/widget-card';
import type { ServiceRequest } from '@/types';
import { ServiceRequestStatusForm } from './ServiceRequestStatusForm';

type ServiceRequestActionsCardProps = {
  request: ServiceRequest;
};

export function ServiceRequestActionsCard({ request }: ServiceRequestActionsCardProps) {
  return (
    <WidgetCard
      title="Actions"
      description="Manage this service request."
      className="overflow-visible"
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <ServiceRequestStatusForm
        requestId={request.id}
        initialStatus={request.status}
      />
    </WidgetCard>
  );
}
