'use client';

import { RotateCcw } from 'lucide-react';
import {
  debounce,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from 'nuqs';
import { FilterBar } from '@/components/shared/filter-bar';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const portfolioStatuses = ['published', 'draft'] as const;
const portfolioFiltersParsers = {
  title: parseAsString.withDefault(''),
  status: parseAsStringLiteral(portfolioStatuses),
  page: parseAsInteger.withDefault(1),
};

const statusOptions = [
  { value: 'all', label: 'All portfolios' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Drafts' },
] satisfies SelectOption[];

export function PortfoliosFilters() {
  const [filters, setFilters] = useQueryStates(portfolioFiltersParsers, { shallow: false });
  function handleTitleChange(value: string) {
    void setFilters({ title: value || null, page: null }, { limitUrlUpdates: debounce(500) });
  }

  function handleStatusChange(value: string) {
    void setFilters({
      title: filters.title || null,
      status: value === 'all' ? null : (value as (typeof portfolioStatuses)[number]),
      page: null,
    });
  }

  function handleReset() {
    void setFilters({ title: null, status: null, page: null });
  }

  return (
    <FilterBar className="p-4">
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <Input
            id="portfolios-title"
            type="search"
            value={filters.title}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Search portfolios by title"
            aria-label="Search portfolios by title"
            size="lg"
            autoComplete="off"
            maxLength={255}
          />
        </Field>
        <Field>
          <SelectField
            id="portfolios-status"
            value={filters.status ?? 'all'}
            options={statusOptions}
            onChange={handleStatusChange}
            ariaLabel="Filter portfolios by status"
            size="lg"
          />
        </Field>
        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={handleReset}
          disabled={!filters.title && !filters.status}
          className="w-full md:w-auto"
        >
          <RotateCcw />
          Reset
        </Button>
      </FieldGroup>
    </FilterBar>
  );
}
