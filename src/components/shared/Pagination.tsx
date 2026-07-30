'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type * as ApiTypes from '@/types/api';

type PaginationProps = {
  pagination?: Partial<ApiTypes.Pagination> | null;
  itemLabel?: string;
  queryKey?: string;
  className?: string;
};

export function Pagination({
  pagination,
  itemLabel = 'items',
  queryKey = 'page',
  className,
}: PaginationProps) {
  const page = pagination?.page ?? 1;
  const totalPages = Math.max(pagination?.totalPages ?? 1, 1);
  const totalItems = pagination?.totalItems;
  const [, setPage] = useQueryState(
    queryKey,
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    }),
  );

  function handlePageChange(nextPage: number) {
    void setPage(nextPage <= 1 ? null : nextPage);
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'flex flex-col gap-3 px-4 pb-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p
        className="text-sm text-muted-foreground"
        aria-live="polite"
      >
        {totalItems !== undefined && (
          <>
            {totalItems} {itemLabel} ·{' '}
          </>
        )}
        Page {page} of {totalPages}.
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
