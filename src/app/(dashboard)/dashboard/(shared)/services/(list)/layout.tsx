import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import {
  getServiceRequestPermissions,
  ServiceCatalog,
  ServiceRequestFilters,
} from '@/modules/service-requests';
import { WidgetCard } from '@/components/shared/widget-card';

export default async function ServicesLayout({ children }: { children: ReactNode }) {
  const permissions = await getServiceRequestPermissions();

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
