import { Activity } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { SERVICE_REQUEST_STATUS_LABELS } from '@/modules/service-requests/config/labels';
import {
  SERVICE_REQUEST_STATUS_BADGE_VARIANTS,
  SERVICE_REQUEST_STATUS_COLORS,
  type ServiceRequest,
} from '@/types';

type ServiceRequestStatusCardProps = {
  request: ServiceRequest;
};

export function ServiceRequestStatusCard({ request }: ServiceRequestStatusCardProps) {
  return (
    <WidgetCard
      icon={Activity}
      title="Request status"
      description="Current review stage."
      actionSlot={
        <Badge
          variant={SERVICE_REQUEST_STATUS_BADGE_VARIANTS[request.status]}
          color={SERVICE_REQUEST_STATUS_COLORS[request.status]}
        >
          {SERVICE_REQUEST_STATUS_LABELS[request.status]}
        </Badge>
      }
    >
      <p className="text-sm leading-6 text-muted-foreground">
        {request.status === 'NEW'
          ? 'This request is ready for review.'
          : request.status === 'IN_PROGRESS'
            ? 'Scope and next steps are being reviewed.'
            : request.status === 'COMPLETED'
              ? 'Review is complete and the request is resolved.'
              : 'This request is no longer active.'}
      </p>
    </WidgetCard>
  );
}
