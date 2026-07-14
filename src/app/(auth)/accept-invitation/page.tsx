import { AcceptInvitationFlow } from '@/modules/invitations';
import {
  getServiceRequestRoute,
  parseServiceRequestService,
} from '@/modules/service-requests/config/service-routes';

type AcceptInvitationPageProps = {
  searchParams: Promise<{
    invitationId?: string;
    email?: string;
    serviceInterest?: string;
  }>;
};

export const metadata = {
  title: 'Accept invitation | fanaticCoders',
};

export default async function AcceptInvitationPage({ searchParams }: AcceptInvitationPageProps) {
  const params = await searchParams;
  const service = parseServiceRequestService(params.serviceInterest);

  return (
    <AcceptInvitationFlow
      invitationId={params.invitationId}
      invitedEmail={params.email}
      redirectPath={service ? getServiceRequestRoute(service) : '/dashboard'}
    />
  );
}
