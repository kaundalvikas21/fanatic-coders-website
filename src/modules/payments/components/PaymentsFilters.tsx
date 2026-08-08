'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ALL_PAYMENT_STATUSES_VALUE, PAYMENT_STATUS_OPTIONS } from '../config/labels';
import { PAYMENT_STATUSES } from '../config/search-params';

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
    <WidgetCard>
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <FieldLabel htmlFor="payments-search">Client</FieldLabel>
          <Input
            id="payments-search"
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name or email"
            autoComplete="off"
          />
        </Field>
        <Field>
          <FieldLabel>Status</FieldLabel>
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
          />
        </Field>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="w-full md:w-auto"
        >
          <RotateCcw />
          Reset
        </Button>
      </FieldGroup>
    </WidgetCard>
  );
}
