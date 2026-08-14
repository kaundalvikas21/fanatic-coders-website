import { notFound } from 'next/navigation';
import { ServiceRequestForm } from '@/modules/service-requests';
import {
  getServiceRequestRouteParams,
  parseServiceRequestService,
} from '@/modules/service-requests/config/service-routes';

export const dynamicParams = false;

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
    <ServiceRequestForm
      initialService={service}
      lockService
    />
  );
}
