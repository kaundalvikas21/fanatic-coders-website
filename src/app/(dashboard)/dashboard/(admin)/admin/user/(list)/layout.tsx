import type { ReactNode } from 'react';

import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { MemberRoleStats } from '@/components/dashboard/users/MemberRoleStats';
import { PageHeader } from '@/components/shared/page-header';
import { ErrorState } from '@/components/shared/error-state';
import { UsersFilters } from '@/components/dashboard/users/UsersFilters';
import { getUsers } from '@/lib/data/users/queries';

export default async function AdminUsersLayout({ children }: { children: ReactNode }) {
  const response = await getUsers({ limit: 100 });

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Organization members"
          description="Accepted internal team members created through Better Auth invitations."
        />
      }
    >
      {response.success && response.data ? (
        <MemberRoleStats
          members={response.data.members}
          total={response.data.total}
        />
      ) : (
        <ErrorState
          title="Could not load member totals"
          message={response.message}
        />
      )}
      <FilterLayout filters={<UsersFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
