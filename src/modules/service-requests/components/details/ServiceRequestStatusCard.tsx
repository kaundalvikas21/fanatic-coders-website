import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { SERVICE_REQUEST_STATUS_LABELS } from '@/modules/service-requests/config/labels';
import { SERVICE_REQUEST_STATUS_BADGE_VARIANTS, type ServiceRequest } from '@/types';

type ServiceRequestStatusCardProps = {
  request: ServiceRequest;
};

export function ServiceRequestStatusCard({ request }: ServiceRequestStatusCardProps) {
  return (
    <WidgetCard
      title="Status"
      description="Current request stage."
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <Badge variant={SERVICE_REQUEST_STATUS_BADGE_VARIANTS[request.status]}>
        {SERVICE_REQUEST_STATUS_LABELS[request.status]}
      </Badge>
    </WidgetCard>
  );
}
