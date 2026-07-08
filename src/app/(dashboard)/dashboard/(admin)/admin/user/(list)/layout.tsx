import type { ReactNode } from 'react';

import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { UsersFilters } from '@/components/dashboard/users/UsersFilters';

export default function AdminUsersLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Organization members"
          description="Accepted internal team members created through Better Auth invitations."
        />
      }
    >
      <UsersFilters />
      {children}
    </ListsLayout>
  );
}
