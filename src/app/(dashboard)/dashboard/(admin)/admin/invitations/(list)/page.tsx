import { Suspense } from 'react';
import { DataTableSkelton } from '@/components/shared/skeleton/DataTableSkeleton';
import { InvitationsList } from '@/modules/invitations';

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
      <InvitationsList />
    </Suspense>
  );
}
