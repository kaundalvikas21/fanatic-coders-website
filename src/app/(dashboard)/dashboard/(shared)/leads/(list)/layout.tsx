import type { ReactNode } from 'react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';

export default function LeadsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Leads"
          description="Review contact requests and track follow-up."
          showBackButton
        />
      }
    >
      {children}
    </ListsLayout>
  );
}
