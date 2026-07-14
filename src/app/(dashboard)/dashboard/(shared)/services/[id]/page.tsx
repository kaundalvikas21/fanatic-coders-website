import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { ServiceRequestAside, ServiceRequestDetails } from '@/modules/service-requests';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { getServiceRequestById } from '@/modules/service-requests/data/queries';
import type { ServiceRequest } from '@/types';

export const dynamic = 'force-dynamic';

type ServiceRequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceRequestDetailPage({ params }: ServiceRequestDetailPageProps) {
  const { id } = await params;
  const access = await getCurrentAccess();
  const canManageServiceRequest = access?.can('serviceRequest', 'update') ?? false;

  const response = await getServiceRequestById(id);
  const request = response.success && response.data ? (response.data as ServiceRequest) : null;

  if (!request) {
    notFound();
  }

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        <PageHeader
          title={SERVICE_REQUEST_SERVICE_LABELS[request.service]}
          description="Review your submitted service request."
          showBackButton
          backLabel="Services"
        />

        <ServiceRequestDetails request={request} />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        <ServiceRequestAside
          request={request}
          canManageActions={canManageServiceRequest}
        />
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
