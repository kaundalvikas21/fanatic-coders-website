'use client';

import { Calendar, ClipboardList, Mail, RefreshCw, UserRound } from 'lucide-react';
import { DetailItem } from '@/components/shared/detail-item';
import { WidgetCard } from '@/components/shared/widget-card';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import type { ServiceRequest } from '@/types';
import { formatDate } from '@/utils/date';

type ServiceRequestInfoCardProps = {
  request: ServiceRequest;
};

const requestInfoItemClassName = 'min-w-0 flex-row items-start gap-3 border-0 p-0';
const requestInfoIconClassName = 'size-8 rounded-md bg-muted text-muted-foreground';

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
      icon={ClipboardList}
      title="Request info"
      description="Client and request timeline."
    >
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,12rem),1fr))] gap-x-6 gap-y-5">
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
