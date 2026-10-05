import type { ReactNode } from 'react';
import { FilterLayout, ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { PageHeader } from '@/components/shared/page-header';
import { NewsletterFilters } from '@/modules/newsletter';

export default function NewsletterLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Newsletter"
          description="Review everyone subscribed to newsletter updates."
          showBackButton={false}
        />
      }
    >
      <FilterLayout filters={<NewsletterFilters />}>{children}</FilterLayout>
    </ListsLayout>
  );
}
