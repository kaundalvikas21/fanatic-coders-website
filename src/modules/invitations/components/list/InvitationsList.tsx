import { MailPlus } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { DataTable } from '@/components/ui/data-table';
import { getInvitations } from '../../data/queries';
import { invitationColumns } from './invitation-columns';

export async function InvitationsList() {
  const response = await getInvitations();
  const invitations = response.success && response.data ? response.data.invitations : [];

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load invitations"
        message={response.message}
      />
    );
  }

  if (invitations.length === 0) {
    return (
      <EmptyState
        entity="invitations"
        description="Sent organization invitations will appear here."
        Icon={MailPlus}
      />
    );
  }

  return (
    <DataTable
      columns={invitationColumns}
      data={invitations}
      tableClassName="min-w-[860px]"
    />
  );
}
