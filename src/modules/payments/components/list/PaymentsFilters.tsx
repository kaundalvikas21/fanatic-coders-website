'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { SelectField } from '@/components/shared/forms/SelectField';
import { FilterBar } from '@/components/shared/filter-bar';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ALL_PAYMENT_STATUSES_VALUE, PAYMENT_STATUS_OPTIONS } from '../../config/labels';
import { PAYMENT_STATUSES } from '../../config/search-params';

const paymentFilterParsers = {
  search: parseAsString.withDefault(''),
  status: parseAsStringLiteral(PAYMENT_STATUSES),
  page: parseAsInteger.withDefault(1),
};

export function PaymentsFilters() {
  const [filters, setFilters] = useQueryStates(paymentFilterParsers, { shallow: false });
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    const nextSearch = debouncedSearch.trim();
    if (nextSearch !== filters.search) {
      void setFilters({ search: nextSearch || null, page: null });
    }
  }, [debouncedSearch, filters.search, setFilters]);

  function handleReset() {
    setSearchInput('');
    void setFilters({ search: null, status: null, page: null });
  }

  return (
    <FilterBar>
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <Input
            id="payments-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search clients by name or email"
            aria-label="Search payments by client name or email"
            size="lg"
            autoComplete="off"
          />
        </Field>
        <Field>
          <SelectField
            id="payments-status"
            value={filters.status ?? ALL_PAYMENT_STATUSES_VALUE}
            options={PAYMENT_STATUS_OPTIONS}
            onChange={(value) =>
              void setFilters({
                status: value === ALL_PAYMENT_STATUSES_VALUE ? null : (value as 'PAID' | 'UNPAID'),
                page: null,
              })
            }
            ariaLabel="Filter payments by status"
            size="lg"
          />
        </Field>
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={handleReset}
          className="w-full md:w-auto"
        >
          <RotateCcw />
          Reset
        </Button>
      </FieldGroup>
    </FilterBar>
  );
}
