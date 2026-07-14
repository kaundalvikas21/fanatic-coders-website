import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WidgetCard } from '@/components/shared/widget-card';
import {
  SERVICE_REQUEST_SERVICE_LABELS,
  SERVICE_REQUEST_STATUS_LABELS,
} from '@/modules/service-requests/config/labels';
import { formatDate } from '@/utils/date';
import { SERVICE_REQUEST_STATUS_BADGE_VARIANTS, type ServiceRequest } from '@/types';

type ServiceRequestListProps = {
  requests: ServiceRequest[];
};

export function ServiceRequestList({ requests }: ServiceRequestListProps) {
  if (requests.length === 0) {
    return (
      <WidgetCard title="Submitted requests">
        <p className="text-sm leading-6 text-muted-foreground">
          Your submitted service requests will appear here for follow-up.
        </p>
      </WidgetCard>
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
