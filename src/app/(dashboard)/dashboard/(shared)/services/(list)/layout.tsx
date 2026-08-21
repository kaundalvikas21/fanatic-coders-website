import { Suspense, type ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { OverviewStatsSkeleton } from '@/components/dashboard/OverviewStatsCard';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getServiceRequestPermissions,
  ServiceCatalog,
  ServiceRequestFilters,
  ServiceRequestStatusStatsLoader,
} from '@/modules/service-requests';
import { WidgetCard } from '@/components/shared/widget-card';

async function ServicesHeader() {
  const permissions = await getServiceRequestPermissions();

  return (
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
  );
}

async function ServicesCatalog() {
  const permissions = await getServiceRequestPermissions();

  if (!permissions.canCreate) return null;

  return (
    <WidgetCard
      title="Available services"
      description="Choose a service to start a focused request."
      titleClassName="text-base font-semibold tracking-normal"
      contentClassNames="grid gap-2"
    >
      <ServiceCatalog />
    </WidgetCard>
  );
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <Suspense fallback={<Skeleton className="h-32 rounded-xl" />}>
          <ServicesHeader />
        </Suspense>
      }
    >
      <Suspense fallback={<OverviewStatsSkeleton />}>
        <ServiceRequestStatusStatsLoader />
      </Suspense>
      <Suspense fallback={null}>
        <ServicesCatalog />
      </Suspense>
      <FilterLayout filters={<ServiceRequestFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
