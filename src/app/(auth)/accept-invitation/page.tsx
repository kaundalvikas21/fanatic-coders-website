import { AcceptInvitationFlow } from '@/components/auth/AcceptInvitationFlow';

type AcceptInvitationPageProps = {
  searchParams: Promise<{
    invitationId?: string;
    email?: string;
  }>;
};

export const metadata = {
  title: 'Accept invitation | fanaticCoders',
};

export default async function AcceptInvitationPage({ searchParams }: AcceptInvitationPageProps) {
  const params = await searchParams;

  return (
    <AcceptInvitationFlow
      invitationId={params.invitationId}
      invitedEmail={params.email}
    />
  );
}
