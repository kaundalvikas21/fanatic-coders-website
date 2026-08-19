'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { FilterBar } from '@/components/shared/filter-bar';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  PROJECT_STATUSES,
  PROJECT_STATUS_OPTIONS,
  SERVICE_INTERESTS,
  SERVICE_INTEREST_OPTIONS,
} from '@/types';

const projectFiltersParsers = {
  name: parseAsString.withDefault(''),
  status: parseAsStringLiteral(PROJECT_STATUSES),
  serviceType: parseAsStringLiteral(SERVICE_INTERESTS),
  page: parseAsInteger.withDefault(1),
};

const ALL_FILTERS_VALUE = 'all';

const statusOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All statuses' },
  ...PROJECT_STATUS_OPTIONS,
] satisfies SelectOption[];

const serviceOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All services' },
  ...SERVICE_INTEREST_OPTIONS,
] satisfies SelectOption[];

export function ProjectsFilters({ showServiceFilter = true }: { showServiceFilter?: boolean }) {
  const [filters, setFilters] = useQueryStates(projectFiltersParsers, {
    shallow: false,
  });
  const [nameInput, setNameInput] = useState(filters.name);
  const debouncedName = useDebounce(nameInput, 500);

  useEffect(() => {
    const nextName = debouncedName.trim();

    if (nextName !== filters.name) {
      void setFilters({ name: nextName || null, page: null });
    }
  }, [debouncedName, filters.name, setFilters]);

  function handleNameChange(value: string) {
    setNameInput(value);
  }

  function handleStatusChange(value: string) {
    void setFilters({
      status: value === ALL_FILTERS_VALUE ? null : (value as (typeof PROJECT_STATUSES)[number]),
      page: null,
    });
  }

  function handleServiceTypeChange(value: string) {
    void setFilters({
      serviceType:
        value === ALL_FILTERS_VALUE ? null : (value as (typeof SERVICE_INTERESTS)[number]),
      page: null,
    });
  }

  function handleReset() {
    void setFilters({
      name: null,
      status: null,
      serviceType: null,
      page: null,
    });
    setNameInput('');
  }

  return (
    <FilterBar>
      <FieldGroup
        className={cn(
          'grid gap-4 md:items-end',
          showServiceFilter
            ? 'md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto]'
            : 'md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto]',
        )}
      >
        <Field>
          <Input
            id="projects-name"
            type="search"
            value={nameInput}
            onChange={(event) => handleNameChange(event.target.value)}
            placeholder="Search projects by name"
            aria-label="Search projects by name"
            size="lg"
            autoComplete="off"
          />
        </Field>

        <Field>
          <SelectField
            id="projects-status"
            value={filters.status ?? ALL_FILTERS_VALUE}
            options={statusOptions}
            onChange={handleStatusChange}
            ariaLabel="Filter projects by status"
            size="lg"
          />
        </Field>

        {showServiceFilter && (
          <Field>
            <SelectField
              id="projects-service"
              value={filters.serviceType ?? ALL_FILTERS_VALUE}
              options={serviceOptions}
              onChange={handleServiceTypeChange}
              ariaLabel="Filter projects by service"
              size="lg"
            />
          </Field>
        )}

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
    </FilterBar>
  );
}
