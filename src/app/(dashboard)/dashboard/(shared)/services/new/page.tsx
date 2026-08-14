import { redirect } from 'next/navigation';
import { ServiceRequestForm } from '@/modules/service-requests';
import {
  getServiceRequestRoute,
  parseServiceRequestService,
} from '@/modules/service-requests/config/service-routes';

export const metadata = {
  title: 'New Service Request | fanaticCoders',
};

type NewServiceRequestPageProps = {
  searchParams: Promise<{
    serviceInterest?: string;
  }>;
};

export default async function NewServiceRequestPage({ searchParams }: NewServiceRequestPageProps) {
  const params = await searchParams;
  const service = parseServiceRequestService(params.serviceInterest);

  if (service) {
    redirect(getServiceRequestRoute(service));
  }

  return <ServiceRequestForm />;
}
