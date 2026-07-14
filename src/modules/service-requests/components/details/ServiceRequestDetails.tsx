import { getServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import type { ServiceRequest } from '@/types';
import { ServiceRequestSummarySections } from './ServiceRequestSummarySections';

type ServiceRequestDetailsProps = {
  request: ServiceRequest;
};

export function ServiceRequestDetails({ request }: ServiceRequestDetailsProps) {
  const template = getServiceRequestTemplate(request.service);
  const requestData = request.data ?? {};

  return (
    <div className="grid gap-6">
      <ServiceRequestSummarySections
        template={template}
        data={requestData}
      />
    </div>
  );
}
