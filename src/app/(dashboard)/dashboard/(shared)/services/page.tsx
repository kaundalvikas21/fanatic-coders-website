import { ErrorState } from '@/components/shared/error-state';
import { WidgetCard } from '@/components/shared/widget-card';
import {
  getServiceRequestPermissions,
  ServiceCatalog,
  ServiceRequestList,
} from '@/modules/service-requests';
import { getServiceRequests } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';

export const metadata = {
  title: 'Services | fanaticCoders',
};

export default async function ServicesPage() {
  const permissions = await getServiceRequestPermissions();
  const { success, data, message } = await getServiceRequests();
  const requests: ServiceRequest[] =
    success && Array.isArray(data) ? (data as ServiceRequest[]) : [];

  return (
    <div className="flex flex-col gap-6">
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
        <ServiceRequestList requests={requests} />
      ) : (
        <ErrorState
          title="Could not load service requests"
          message={message}
        />
      )}
    </div>
  );
}
