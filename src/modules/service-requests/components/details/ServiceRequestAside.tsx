import type { ServiceRequest } from '@/types';
import { ServiceRequestActionsCard } from './ServiceRequestActionsCard';
import { ServiceRequestInfoCard } from './ServiceRequestInfoCard';
import { ServiceRequestNotificationsCard } from './ServiceRequestNotificationsCard';
import { ServiceRequestStatusCard } from './ServiceRequestStatusCard';

type ServiceRequestAsideProps = {
  request: ServiceRequest;
  canManageActions?: boolean;
};

export function ServiceRequestAside({
  request,
  canManageActions = false,
}: ServiceRequestAsideProps) {
  return (
    <>
      {canManageActions && <ServiceRequestActionsCard request={request} />}
      <ServiceRequestStatusCard request={request} />
      <ServiceRequestInfoCard request={request} />
      <ServiceRequestNotificationsCard />
    </>
  );
}
