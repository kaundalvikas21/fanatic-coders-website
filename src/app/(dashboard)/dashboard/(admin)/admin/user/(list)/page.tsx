import { Suspense } from 'react';
import { Users } from '@/components/dashboard/users/Users';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';
import { parseUsersSearchParams, UsersSearchParams } from '../search-params';

export const metadata = {
  title: 'Organization Members | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type AdminUsersPageProps = {
  searchParams: Promise<UsersSearchParams>;
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const filters = parseUsersSearchParams(await searchParams);
  const suspenseKey = JSON.stringify(filters);

  return (
    <Suspense
      key={suspenseKey}
      fallback={
        <DataTableSkelton
          rows={10}
          cols={4}
          tableClassName="min-w-[820px]"
        />
      }
    >
      <Users filters={filters} />
    </Suspense>
  );
}
