import { redirect } from 'next/navigation';
import { ServiceRequestForm } from '@/modules/service-requests';
import { PageHeader } from '@/components/shared/page-header';
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

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Start a Service Request"
        description="Choose a service to get started."
        showBackButton
      />
      <ServiceRequestForm />
    </div>
  );
}
