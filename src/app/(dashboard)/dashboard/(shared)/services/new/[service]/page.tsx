import { notFound } from 'next/navigation';
import { ServiceRequestForm } from '@/modules/service-requests';
import { PageHeader } from '@/components/shared/page-header';
import { SERVICE_INTEREST_OPTIONS, type ServiceInterest } from '@/types';
import {
  getServiceRequestRouteParams,
  parseServiceRequestService,
} from '@/modules/service-requests/config/service-routes';

export const dynamicParams = false;

const serviceLabels = Object.fromEntries(
  SERVICE_INTEREST_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ServiceInterest, string>;

export function generateStaticParams() {
  return getServiceRequestRouteParams();
}

export default async function ServiceRequestByServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSegment } = await params;
  const service = parseServiceRequestService(serviceSegment);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Start ${serviceLabels[service]} Request`}
        description="Complete the details for your selected service."
        showBackButton
      />
      <ServiceRequestForm
        initialService={service}
        lockService
      />
    </div>
  );
}
