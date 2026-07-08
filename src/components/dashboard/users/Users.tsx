import { UsersRound } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { getUsers } from '@/lib/data/users/queries';
import type { GetUsersInput } from '@/types';
import { DataTable } from '@/components/ui/data-table';
import { userColumns } from './columns';

export async function Users({ filters }: { filters: GetUsersInput }) {
  const response = await getUsers(filters);
  const members = response.success && response.data ? response.data.members : [];

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load members"
        message={response.message}
      />
    );
  }

  if (members.length === 0) {
    return (
      <EmptyState
        entity="organization members"
        description="Accepted internal team invitations will appear here."
        Icon={UsersRound}
      />
    );
  }

  return (
    <DataTable
      columns={userColumns}
      data={members}
      tableClassName="min-w-[820px]"
    />
  );
}
