'use client';

import type { ServiceRequest } from '@/types';
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import { ServiceRequestActionsCard } from './ServiceRequestActionsCard';
import { ServiceRequestInfoCard } from './ServiceRequestInfoCard';
import { ServiceRequestNotificationsCard } from './ServiceRequestNotificationsCard';
import { ServiceRequestStatusCard } from './ServiceRequestStatusCard';

type ServiceRequestAsideProps = {
  request: ServiceRequest;
};

export function ServiceRequestAside({ request }: ServiceRequestAsideProps) {
  const permissions = useServiceRequestPermissions();

  return (
    <>
      {permissions.canUpdate && <ServiceRequestActionsCard request={request} />}
      <ServiceRequestStatusCard request={request} />
      <ServiceRequestInfoCard request={request} />
      <ServiceRequestNotificationsCard />
    </>
  );
}
