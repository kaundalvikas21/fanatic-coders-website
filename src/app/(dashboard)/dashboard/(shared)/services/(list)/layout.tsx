import type { ReactNode } from 'react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { getServiceRequestPermissions, ServiceRequestFilters } from '@/modules/service-requests';

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
          showBackButton
        />
      }
    >
      {permissions.isManagementView && <ServiceRequestFilters />}
      {children}
    </ListsLayout>
  );
}
