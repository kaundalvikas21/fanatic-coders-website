'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PaginationProps = {
  pagination: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
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
  const { page, totalPages, totalItems } = pagination;
  const [, setPage] = useQueryState(
    queryKey,
    parseAsInteger.withDefault(1).withOptions({
      shallow: false,
    }),
  );

  if (totalItems === 0) {
    return null;
  }

  function changePage(nextPage: number) {
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
        Page {page} of {totalPages} · {totalItems} {itemLabel}
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => changePage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => changePage(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </nav>
  );
}
