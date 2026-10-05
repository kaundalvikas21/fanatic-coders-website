import { Mail } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetNewsletterSubscriptionsInput, NewsletterSubscriptionsData } from '@/types';
import { getNewsletterSubscriptions } from '../../data/queries';
import { newsletterColumns } from './newsletter-columns';

export async function NewsletterTableLoader({
  filters,
}: {
  filters: GetNewsletterSubscriptionsInput;
}) {
  const response = await getNewsletterSubscriptions(filters);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load newsletter subscribers"
        message={response.message}
      />
    );
  }

  const data = response.data as NewsletterSubscriptionsData | null | undefined;
  const subscribers = data?.items ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? subscribers.length;

  if (totalItems === 0) {
    return (
      <EmptyState
        entity="newsletter subscribers"
        description={
          filters.email
            ? 'No subscribers match this email search.'
            : 'New newsletter subscriptions will appear here.'
        }
        Icon={Mail}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={newsletterColumns}
        data={subscribers}
        pageSize={subscribers.length || 10}
        tableClassName="min-w-160"
        cellClassName="py-3"
      />

      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={totalItems === 1 ? 'subscriber' : 'subscribers'}
        />
      )}
    </div>
  );
}
