'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { USER_SORT_FIELDS, type UserSortField } from '@/types';

const DEFAULT_FILTERS = {
  sortBy: 'createdAt',
  sortDirection: 'desc',
  name: null,
} as const;

const userFiltersParsers = {
  sortBy: parseAsStringLiteral(USER_SORT_FIELDS).withDefault(DEFAULT_FILTERS.sortBy),
  sortDirection: parseAsStringLiteral(['asc', 'desc'] as const).withDefault(
    DEFAULT_FILTERS.sortDirection,
  ),
  name: parseAsString.withDefault(''),
};

const sortByOptions = USER_SORT_FIELDS.map((field) => ({
  value: field,
  label: field,
})) satisfies SelectOption[];

const sortDirectionOptions = [
  { value: 'desc', label: 'desc' },
  { value: 'asc', label: 'asc' },
] satisfies SelectOption[];

export function UsersFilters() {
  const [filters, setFilters] = useQueryStates(userFiltersParsers, {
    shallow: false,
  });
  const [nameInput, setNameInput] = useState(filters.name);

  const debouncedName = useDebounce(nameInput, 500);

  useEffect(() => {
    const nextName = debouncedName.trim();

    if (nextName !== filters.name) {
      void setFilters({ name: nextName || null });
    }
  }, [debouncedName, filters.name, setFilters]);

  function handleSortByChange(value: string) {
    void setFilters({ sortBy: value as UserSortField });
  }

  function handleSortDirectionChange(value: string) {
    void setFilters({ sortDirection: value as typeof filters.sortDirection });
  }

  function handleNameChange(value: string) {
    setNameInput(value);
  }

  function handleReset() {
    void setFilters(DEFAULT_FILTERS);
    setNameInput('');
  }

  return (
    <WidgetCard>
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <FieldLabel>Sort by</FieldLabel>
          <SelectField
            id="users-sort-by"
            value={filters.sortBy}
            options={sortByOptions}
            onChange={handleSortByChange}
            ariaLabel="Members sort field"
          />
        </Field>

        <Field>
          <FieldLabel>Sort direction</FieldLabel>
          <SelectField
            id="users-sort-direction"
            value={filters.sortDirection}
            options={sortDirectionOptions}
            onChange={handleSortDirectionChange}
            ariaLabel="Members sort direction"
          />
        </Field>

        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            type="search"
            value={nameInput}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Search by name"
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
