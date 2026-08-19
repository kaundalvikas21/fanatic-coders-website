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
import { useServiceRequestPermissions } from '@/modules/service-requests/hooks/use-service-request-permissions';
import { cn } from '@/lib/utils';
import {
  SERVICE_INTEREST_OPTIONS,
  SERVICE_INTERESTS,
  SERVICE_REQUEST_STATUS_OPTIONS,
  SERVICE_REQUEST_STATUSES,
} from '@/types';

const filterParsers = {
  client: parseAsString.withDefault(''),
  status: parseAsStringLiteral(SERVICE_REQUEST_STATUSES),
  serviceType: parseAsStringLiteral(SERVICE_INTERESTS),
  page: parseAsInteger.withDefault(1),
};

const ALL_FILTERS_VALUE = 'all';

const statusOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All statuses' },
  ...SERVICE_REQUEST_STATUS_OPTIONS,
] satisfies SelectOption[];

const serviceOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All services' },
  ...SERVICE_INTEREST_OPTIONS,
] satisfies SelectOption[];

export function ServiceRequestFilters() {
  const permissions = useServiceRequestPermissions();
  const [filters, setFilters] = useQueryStates(filterParsers, { shallow: false });
  const [clientInput, setClientInput] = useState(filters.client);
  const debouncedClient = useDebounce(clientInput, 500);

  useEffect(() => {
    const nextClient = debouncedClient.trim();

    if (nextClient !== filters.client) {
      void setFilters({ client: nextClient || null, page: null });
    }
  }, [debouncedClient, filters.client, setFilters]);

  function handleReset() {
    void setFilters({ client: null, status: null, serviceType: null, page: null });
    setClientInput('');
  }

  return (
    <FilterBar>
      <FieldGroup
        className={cn(
          'grid gap-4 md:items-end',
          permissions.isManagementView
            ? 'md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto]'
            : 'md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]',
        )}
      >
        {permissions.isManagementView && (
          <Field>
            <Input
              id="service-requests-client"
              type="search"
              value={clientInput}
              onChange={(event) => setClientInput(event.target.value)}
              placeholder="Search clients by name or email"
              aria-label="Search service requests by client name or email"
              size="lg"
              autoComplete="off"
            />
          </Field>
        )}

        <Field>
          <SelectField
            id="service-requests-status"
            value={filters.status ?? ALL_FILTERS_VALUE}
            options={statusOptions}
            onChange={(value) =>
              void setFilters({
                status:
                  value === ALL_FILTERS_VALUE
                    ? null
                    : (value as (typeof SERVICE_REQUEST_STATUSES)[number]),
                page: null,
              })
            }
            ariaLabel="Filter service requests by status"
            size="lg"
          />
        </Field>

        <Field>
          <SelectField
            id="service-requests-service"
            value={filters.serviceType ?? ALL_FILTERS_VALUE}
            options={serviceOptions}
            onChange={(value) =>
              void setFilters({
                serviceType:
                  value === ALL_FILTERS_VALUE
                    ? null
                    : (value as (typeof SERVICE_INTERESTS)[number]),
                page: null,
              })
            }
            ariaLabel="Filter service requests by service"
            size="lg"
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
    </FilterBar>
  );
}
