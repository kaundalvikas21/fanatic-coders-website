import { ErrorState } from '@/components/shared/error-state';
import { WidgetCard } from '@/components/shared/widget-card';
import {
  getServiceRequestPermissions,
  ServiceCatalog,
  ServiceRequestList,
} from '@/modules/service-requests';
import { getServiceRequests } from '@/modules/service-requests/data/queries';
import {
  parseServiceRequestsSearchParams,
  type ServiceRequestsSearchParams,
} from '@/modules/service-requests/config/search-params';
import type { ServiceRequest } from '@/types';

export const metadata = {
  title: 'Services | fanaticCoders',
};

type ServicesPageProps = {
  searchParams: Promise<ServiceRequestsSearchParams>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const permissions = await getServiceRequestPermissions();
  const filters = parseServiceRequestsSearchParams(await searchParams);
  const { success, data, message } = await getServiceRequests(filters);
  const requests: ServiceRequest[] =
    success && Array.isArray(data) ? (data as ServiceRequest[]) : [];
  const hasFilters = Boolean(filters.client || filters.status || filters.serviceType);

  return (
    <>
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

      {/* Service request list or load failure for the current viewer. */}
      {success ? (
        <ServiceRequestList
          requests={requests}
          hasFilters={hasFilters}
        />
      ) : (
        <ErrorState
          title="Could not load service requests"
          message={message}
        />
      )}
    </>
  );
}
