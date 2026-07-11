import { ServiceRequestForm } from '@/modules/service-requests';
import { PageHeader } from '@/components/shared/page-header';

export const metadata = {
  title: 'New Service Request | fanaticCoders',
};

export default function NewServiceRequestPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create service request"
        description="Select a service and answer the request questions for that service."
        showBackButton
      />
      <ServiceRequestForm />
    </div>
  );
}
