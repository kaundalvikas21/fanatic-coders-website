import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import {
  getServiceRequestPermissions,
  ServiceRequestConversation,
  ServiceRequestSummarySections,
} from '@/modules/service-requests';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { getServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import { getServiceRequestById } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';
import { ServiceRequestActionsCard } from '@/modules/service-requests/components/details/ServiceRequestActionsCard';
import { ServiceRequestStatusCard } from '@/modules/service-requests/components/details/ServiceRequestStatusCard';
import { ServiceRequestInfoCard } from '@/modules/service-requests/components/details/ServiceRequestInfoCard';
import { ServiceRequestNotificationsCard } from '@/modules/service-requests/components/details/ServiceRequestNotificationsCard';

export const dynamic = 'force-dynamic';

type ServiceRequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceRequestDetailPage({ params }: ServiceRequestDetailPageProps) {
  const { id } = await params;
  const permissions = await getServiceRequestPermissions();
  const { success, data: request } = (await getServiceRequestById(id)) as {
    success: boolean;
    data?: ServiceRequest | null;
  };

  // Hide requests that are unavailable to the current viewer.
  if (!success || !request) {
    notFound();
  }

  const template = getServiceRequestTemplate(request.service);

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        {/* Describe the request according to the viewer's responsibilities. */}
        <PageHeader
          title={SERVICE_REQUEST_SERVICE_LABELS[request.service]}
          description={
            permissions.isManagementView
              ? 'Review and manage this client service request.'
              : 'Review your submitted service request.'
          }
          showBackButton
          backLabel="Services"
        />

        {/* Keep submitted requirements available during consultation. */}
        <ServiceRequestSummarySections
          template={template}
          data={request.data ?? {}}
        />

        {/* Keep client and management consultation with the original request. */}
        <ServiceRequestConversation serviceRequestId={request.id} />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {/* Show management controls only to viewers with update access. */}
        {permissions.canUpdate && <ServiceRequestActionsCard request={request} />}

        {/* Keep shared status and request context visible to every viewer. */}
        <ServiceRequestStatusCard request={request} />
        <ServiceRequestInfoCard request={request} />
        <ServiceRequestNotificationsCard />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
