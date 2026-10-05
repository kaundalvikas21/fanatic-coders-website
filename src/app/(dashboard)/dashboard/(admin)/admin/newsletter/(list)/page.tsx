import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/shared/skeleton/DataTableSkeleton';
import { NewsletterTableLoader } from '@/modules/newsletter';
import {
  type NewsletterSearchParams,
  parseNewsletterSearchParams,
} from '@/modules/newsletter/config/search-params';

export const metadata = {
  title: 'Newsletter | fanaticCoders',
};

export const dynamic = 'force-dynamic';

type NewsletterPageProps = {
  searchParams: Promise<NewsletterSearchParams>;
};

export default async function NewsletterPage({ searchParams }: NewsletterPageProps) {
  const filters = parseNewsletterSearchParams(await searchParams);
  const suspenseKey = JSON.stringify(filters);

  return (
    <Suspense
      key={suspenseKey}
      fallback={
        <DataTableSkeleton
          rows={10}
          cols={2}
          showPagination
          tableClassName="min-w-160"
          cellClassName="py-3"
        />
      }
    >
      <NewsletterTableLoader filters={filters} />
    </Suspense>
  );
}
