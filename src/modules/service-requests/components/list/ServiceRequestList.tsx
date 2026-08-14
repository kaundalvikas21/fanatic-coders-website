'use client';

import Link from 'next/link';
import { EmptyState } from '@/components/shared/empty-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  SERVICE_REQUEST_SERVICE_LABELS,
  SERVICE_REQUEST_STATUS_LABELS,
} from '@/modules/service-requests/config/labels';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import { formatDate } from '@/utils/date';
import { SERVICE_REQUEST_STATUS_BADGE_VARIANTS, type ServiceRequest } from '@/types';

type ServiceRequestListProps = {
  requests: ServiceRequest[];
  hasFilters?: boolean;
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

function getClientLabel(request: ServiceRequest) {
  const client = request as ServiceRequestWithClient;
  const user = client.client?.member?.user;

  return user?.name || user?.email || request.clientId;
}

export function ServiceRequestList({ requests, hasFilters = false }: ServiceRequestListProps) {
  const permissions = useServiceRequestPermissions();

  if (requests.length === 0) {
    return (
      <EmptyState
        entity="service requests"
        description={
          hasFilters
            ? 'No service requests match the selected filters.'
            : permissions.isManagementView
              ? 'Client-submitted service requests will appear here for review.'
              : 'Your submitted service requests will appear here for follow-up.'
        }
      />
    );
  }

  return (
    <div className="grid gap-3">
      {requests.map((request) => (
        <article
          key={request.id}
          className="rounded-xl border bg-card p-4 text-card-foreground"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-base font-semibold tracking-normal">
                {SERVICE_REQUEST_SERVICE_LABELS[request.service]}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Submitted {formatDate(request.createdAt)}
              </p>
              {permissions.isManagementView && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Client: {getClientLabel(request)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={SERVICE_REQUEST_STATUS_BADGE_VARIANTS[request.status]}>
                {SERVICE_REQUEST_STATUS_LABELS[request.status]}
              </Badge>
              <Button
                asChild
                size="sm"
                variant="outline"
              >
                <Link href={`/dashboard/services/${request.id}`}>View details</Link>
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
