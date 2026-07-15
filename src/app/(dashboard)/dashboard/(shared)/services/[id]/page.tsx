import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import {
  getServiceRequestPermissions,
  ServiceRequestAside,
  ServiceRequestDetails,
} from '@/modules/service-requests';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { getServiceRequestById } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';

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

  if (!success || !request) {
    notFound();
  }

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        {/* Service request title and viewer-specific context. */}
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

        {/* Submitted service request answers. */}
        <ServiceRequestDetails request={request} />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {/* Status, metadata, and permitted management actions. */}
        <ServiceRequestAside request={request} />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
