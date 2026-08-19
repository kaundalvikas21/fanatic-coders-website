import { CreditCard } from 'lucide-react';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { Pagination } from '@/components/shared/Pagination';
import { DataTable } from '@/components/ui/data-table';
import type { GetPaymentsInput, PaginatedPayments } from '@/types';
import { getPayments } from '../../data/queries';
import { paymentColumns } from './payment-columns';

export async function PaymentsTableLoader({ filters }: { filters: GetPaymentsInput }) {
  const response = await getPayments(filters);
  if (!response.success) {
    return (
      <ErrorState
        title="Could not load payments"
        message={response.message}
      />
    );
  }

  const data = response.data as PaginatedPayments | null | undefined;
  const payments = data?.items ?? [];
  const pagination = data?.pagination;
  const totalItems = pagination?.totalItems ?? payments.length;

  if (totalItems === 0) {
    const hasFilters = Boolean(filters.search || filters.status);
    return (
      <EmptyState
        entity="payments"
        description={
          hasFilters
            ? 'No payments match the selected filters.'
            : 'Stripe invoices will appear here after a proposal is accepted.'
        }
        Icon={CreditCard}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <DataTable
        columns={paymentColumns}
        data={payments}
        tableClassName="min-w-[980px]"
      />
      {pagination && (
        <Pagination
          pagination={pagination}
          itemLabel={totalItems === 1 ? 'payment' : 'payments'}
        />
      )}
    </div>
  );
}
