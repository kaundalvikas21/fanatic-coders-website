import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { redirect } from 'next/navigation';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { PortfoliosFilters } from '@/modules/portfolios/components/list/PortfoliosFilters';

export default async function PortfoliosListLayout({ children }: { children: ReactNode }) {
  const access = await getCurrentAccess();
  if (!access?.can('portfolio', 'read')) redirect('/unauthorized');

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Portfolio"
          description="Review portfolio case studies and drafts."
          showBackButton
          action={
            access.can('portfolio', 'create')
              ? { label: 'New portfolio', href: '/dashboard/portfolios/new', icon: Plus }
              : undefined
          }
        />
      }
    >
      <FilterLayout filters={<PortfoliosFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
