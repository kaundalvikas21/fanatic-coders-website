import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import {
  getServiceRequestPermissions,
  ServiceCatalog,
  ServiceRequestFilters,
  ServiceRequestStatusStats,
} from '@/modules/service-requests';
import { WidgetCard } from '@/components/shared/widget-card';
import { getServiceRequests } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';

export default async function ServicesLayout({ children }: { children: ReactNode }) {
  const [permissions, response] = await Promise.all([
    getServiceRequestPermissions(),
    getServiceRequests(),
  ]);
  const requests =
    response.success && Array.isArray(response.data) ? (response.data as ServiceRequest[]) : [];

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Services"
          description={
            permissions.isManagementView
              ? 'Review client service requests and track their progress.'
              : 'Choose a service or track your submitted requests.'
          }
          action={
            permissions.canCreate
              ? { label: 'New Request', href: '/dashboard/services/new', icon: Plus }
              : undefined
          }
        />
      }
    >
      {response.success ? (
        <ServiceRequestStatusStats requests={requests} />
      ) : (
        <ErrorState
          title="Could not load service totals"
          message={response.message}
        />
      )}
      {/* Service catalog for clients who can create requests. */}
      {permissions.canCreate && (
        <WidgetCard
          title="Available services"
          description="Choose a service to start a focused request."
          titleClassName="text-base font-semibold tracking-normal"
          contentClassNames="grid gap-2"
        >
          <ServiceCatalog />
        </WidgetCard>
      )}
      <FilterLayout filters={<ServiceRequestFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
