import { DetailItem } from '@/components/shared/detail-item';
import { WidgetCard } from '@/components/shared/widget-card';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import type { ServiceRequest } from '@/types';
import { formatDate } from '@/utils/date';

type ServiceRequestInfoCardProps = {
  request: ServiceRequest;
};

export function ServiceRequestInfoCard({ request }: ServiceRequestInfoCardProps) {
  return (
    <WidgetCard
      title="Request info"
      description="Service and timeline."
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <dl className="grid gap-4">
        <DetailItem
          label="Service"
          value={SERVICE_REQUEST_SERVICE_LABELS[request.service]}
        />
        <DetailItem
          label="Submitted"
          value={formatDate(request.createdAt)}
        />
        <DetailItem
          label="Updated"
          value={formatDate(request.updatedAt)}
        />
      </dl>
    </WidgetCard>
  );
}
