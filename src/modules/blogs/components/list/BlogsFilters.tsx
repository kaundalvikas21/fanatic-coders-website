'use client';

import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { FilterBar } from '@/components/shared/filter-bar';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';

const blogStatuses = ['published', 'draft'] as const;
const blogFiltersParsers = {
  status: parseAsStringLiteral(blogStatuses),
  page: parseAsInteger.withDefault(1),
};

const statusOptions = [
  { value: 'all', label: 'All blogs' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
] satisfies SelectOption[];

export function BlogsFilters() {
  const [filters, setFilters] = useQueryStates(blogFiltersParsers, { shallow: false });

  function handleStatusChange(value: string) {
    void setFilters({
      status: value === 'all' ? null : (value as (typeof blogStatuses)[number]),
      page: null,
    });
  }

  return (
    <FilterBar className="p-4">
      <FieldGroup className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <Field>
          <SelectField
            id="blogs-status"
            value={filters.status ?? 'all'}
            options={statusOptions}
            onChange={handleStatusChange}
            ariaLabel="Filter blogs by status"
            size="lg"
          />
        </Field>
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={() => void setFilters({ status: null, page: null })}
          disabled={!filters.status}
          className="w-full sm:w-auto"
        >
          <RotateCcw />
          Reset
        </Button>
      </FieldGroup>
    </FilterBar>
  );
}
