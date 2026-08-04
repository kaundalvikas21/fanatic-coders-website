import { notFound } from 'next/navigation';
import { MessageSquareText } from 'lucide-react';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import {
  getServiceRequestPermissions,
  ServiceRequestConversation,
  ServiceRequestSummarySections,
} from '@/modules/service-requests';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { getServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import { getServiceRequestById } from '@/modules/service-requests/data/queries';
import type { Proposal, ServiceRequest } from '@/types';
import { ServiceRequestActionsCard } from '@/modules/service-requests/components/details/ServiceRequestActionsCard';
import { ServiceRequestStatusCard } from '@/modules/service-requests/components/details/ServiceRequestStatusCard';
import { ServiceRequestInfoCard } from '@/modules/service-requests/components/details/ServiceRequestInfoCard';
import { ServiceRequestProjectAcknowledgement } from '@/modules/service-requests/components/details/ServiceRequestProjectAcknowledgement';
import { CreateProjectFromServiceRequestForm } from '@/modules/projects';
import { getServiceRequestProposal, ProposalPanel } from '@/modules/proposals';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getOrganizationMembersByRole } from '@/lib/data/users/queries';
import type { OrganizationMemberRole } from '@/types';

export const dynamic = 'force-dynamic';

const PROJECT_MANAGER_ASSIGNMENT_ROLES = [
  'MANAGER',
] as const satisfies readonly OrganizationMemberRole[];

type ServiceRequestDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceRequestDetailPage({ params }: ServiceRequestDetailPageProps) {
  const { id } = await params;
  const permissions = await getServiceRequestPermissions();
  const access = await getCurrentAccess();
  const { success, data: request } = (await getServiceRequestById(id)) as {
    success: boolean;
    data?: ServiceRequest | null;
  };

  // Hide requests that are unavailable to the current viewer.
  if (!success || !request) {
    notFound();
  }

  const template = getServiceRequestTemplate(request.service);
  const managers = permissions.canUpdate
    ? await getOrganizationMembersByRole(PROJECT_MANAGER_ASSIGNMENT_ROLES)
    : [];
  const proposalResponse = await getServiceRequestProposal(request.id);
  const proposal =
    proposalResponse.success && proposalResponse.data ? (proposalResponse.data as Proposal) : null;
  const proposalError =
    !proposalResponse.success && proposalResponse.error?.code !== 'PROPOSAL_NOT_FOUND'
      ? proposalResponse.message
      : null;

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

        {/* Present request context before its submitted requirement details. */}
        <ServiceRequestInfoCard request={request} />

        {/* Keep submitted requirements available during consultation. */}
        <ServiceRequestSummarySections
          template={template}
          data={request.data ?? {}}
        />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {/* Keep status as the dedicated top-level state display for every viewer. */}
        <ServiceRequestStatusCard request={request} />

        {/* Keep consultation available without crowding request actions. */}
        <ActionSheet
          title="Consultation"
          description="Discuss requirements, scope, timing, and next steps."
          trigger={
            <ActionSheetButton
              variant="outline"
              className="w-full justify-start"
            >
              <MessageSquareText data-icon="inline-start" />
              Open consultation
            </ActionSheetButton>
          }
        >
          <div className="min-h-0 flex-1 overflow-hidden border-y border-border">
            <ServiceRequestConversation
              serviceRequestId={request.id}
              showHeader={false}
            />
          </div>
        </ActionSheet>

        {proposalError ? (
          <ErrorState
            title="Could not load proposal"
            message={proposalError}
          />
        ) : (
          <ProposalPanel
            serviceRequestId={request.id}
            initialProposal={proposal}
          />
        )}

        {/* Point clients to delivery once this request becomes a project. */}
        {request.project && <ServiceRequestProjectAcknowledgement projectId={request.project.id} />}

        {/* Show management controls below status only to viewers with update access. */}
        {permissions.canUpdate && <ServiceRequestActionsCard request={request} />}
        {/* Start delivery only after the client accepts the proposal. */}
        {permissions.canUpdate &&
          proposal?.status === 'ACCEPTED' &&
          request.status !== 'COMPLETED' &&
          !request.project && (
            <CreateProjectFromServiceRequestForm
              request={request}
              managers={managers}
              canAssignManager={access?.role === 'ADMIN'}
            />
          )}
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
