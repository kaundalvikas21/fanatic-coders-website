import { Suspense } from 'react';
import { Invitations } from '@/components/dashboard/invitations/Invitations';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';

export const metadata = {
  title: 'Invitations | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default function AdminInvitationsPage() {
  return (
    <Suspense
      fallback={
        <DataTableSkelton
          rows={10}
          cols={5}
          tableClassName="min-w-[860px]"
        />
      }
    >
      <Invitations />
    </Suspense>
  );
}
