'use client';

import { BriefcaseBusiness, Calendar, Mail, RefreshCw, UserRound } from 'lucide-react';
import { DetailItem } from '@/components/shared/detail-item';
import { WidgetCard } from '@/components/shared/widget-card';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import type { ServiceRequest } from '@/types';
import { formatDate } from '@/utils/date';

type ServiceRequestInfoCardProps = {
  request: ServiceRequest;
};

const requestInfoItemClassName = 'min-w-0 flex-row items-start gap-3 border-0 bg-muted/40';
const requestInfoIconClassName = 'bg-background text-muted-foreground ring-1 ring-foreground/10';

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
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-3">
        <DetailItem
          label="Service"
          value={SERVICE_REQUEST_SERVICE_LABELS[request.service]}
          icon={BriefcaseBusiness}
          className={requestInfoItemClassName}
          iconClassName={requestInfoIconClassName}
        />
        {permissions.isManagementView && (
          <>
            <DetailItem
              label="Client"
              value={client.name}
              icon={UserRound}
              className={requestInfoItemClassName}
              iconClassName={requestInfoIconClassName}
            />
            <DetailItem
              label="Client email"
              value={client.email ?? 'Not available'}
              icon={Mail}
              className={requestInfoItemClassName}
              iconClassName={requestInfoIconClassName}
            />
          </>
        )}
        <DetailItem
          label="Submitted"
          value={formatDate(request.createdAt)}
          icon={Calendar}
          className={requestInfoItemClassName}
          iconClassName={requestInfoIconClassName}
        />
        <DetailItem
          label="Updated"
          value={formatDate(request.updatedAt)}
          icon={RefreshCw}
          className={requestInfoItemClassName}
          iconClassName={requestInfoIconClassName}
        />
      </dl>
    </WidgetCard>
  );
}
