'use client';

import { DetailItem } from '@/components/shared/detail-item';
import { WidgetCard } from '@/components/shared/widget-card';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import type { ServiceRequest } from '@/types';
import { formatDate } from '@/utils/date';

type ServiceRequestInfoCardProps = {
  request: ServiceRequest;
};

type ServiceRequestWithClient = ServiceRequest & {
  client?: {
    member?: {
      user?: {
        name?: string | null;
        email?: string | null;
      } | null;
    } | null;
  } | null;
};

function getClientDetails(request: ServiceRequest) {
  const client = request as ServiceRequestWithClient;
  const user = client.client?.member?.user;

  return {
    name: user?.name || request.clientId,
    email: user?.email ?? null,
  };
}

export function ServiceRequestInfoCard({ request }: ServiceRequestInfoCardProps) {
  const permissions = useServiceRequestPermissions();
  const client = getClientDetails(request);

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
        {permissions.isManagementView && (
          <>
            <DetailItem
              label="Client"
              value={client.name}
            />
            <DetailItem
              label="Client email"
              value={client.email ?? 'Not available'}
            />
          </>
        )}
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
