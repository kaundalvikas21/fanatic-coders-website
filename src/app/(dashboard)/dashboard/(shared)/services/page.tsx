import { WidgetCard } from '@/components/shared/widget-card';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { ServiceCatalog, ServiceRequestList } from '@/modules/service-requests';
import { getServiceRequests } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';

export const metadata = {
  title: 'Services | fanaticCoders',
};

export default async function ServicesPage() {
  const access = await getCurrentAccess();
  const canCreateServiceRequest = access?.can('serviceRequest', 'create') ?? false;
  const response = await getServiceRequests();
  const hasServiceRequests = response.success && Array.isArray(response.data);
  const requests: ServiceRequest[] = hasServiceRequests ? (response.data as ServiceRequest[]) : [];

  return (
    <div className="flex flex-col gap-6">
      {canCreateServiceRequest && (
        <WidgetCard
          title="Available services"
          description="Choose a service to start a focused request."
          titleClassName="text-base font-semibold tracking-normal"
          contentClassNames="grid gap-2"
        >
          <ServiceCatalog />
        </WidgetCard>
      )}

      <ServiceRequestList requests={requests} />
    </div>
  );
}
