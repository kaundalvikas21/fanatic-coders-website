'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  SERVICE_REQUEST_SERVICE_LABELS,
  SERVICE_REQUEST_STATUS_LABELS,
} from '@/modules/service-requests/config/labels';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import { formatDate } from '@/utils/date';
import { SERVICE_REQUEST_STATUS_COLORS, type ServiceRequest } from '@/types';

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

  const columns: ColumnDef<ServiceRequest>[] = [
    {
      id: 'service',
      header: 'Service',
      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {SERVICE_REQUEST_SERVICE_LABELS[row.original.service]}
        </span>
      ),
    },
    ...(permissions.isManagementView
      ? [
          {
            id: 'client',
            header: 'Client',
            cell: ({ row }: { row: { original: ServiceRequest } }) => (
              <span className="text-muted-foreground">{getClientLabel(row.original)}</span>
            ),
          } satisfies ColumnDef<ServiceRequest>,
        ]
      : []),
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          color={SERVICE_REQUEST_STATUS_COLORS[row.original.status]}
        >
          {SERVICE_REQUEST_STATUS_LABELS[row.original.status]}
        </Badge>
      ),
    },
    {
      id: 'submitted',
      header: 'Submitted',
      cell: ({ row }) => (
        <span className="text-muted-foreground">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      id: 'action',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label={`View ${SERVICE_REQUEST_SERVICE_LABELS[row.original.service]} request`}
            title={`View ${SERVICE_REQUEST_SERVICE_LABELS[row.original.service]} request`}
          >
            <Link href={`/dashboard/services/${row.original.id}`}>
              <Eye />
            </Link>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={requests}
      emptyMessage={
        hasFilters
          ? 'No service requests match the selected filters.'
          : permissions.isManagementView
            ? 'Client-submitted service requests will appear here for review.'
            : 'Your submitted service requests will appear here for follow-up.'
      }
      tableClassName="min-w-190"
    />
  );
}
