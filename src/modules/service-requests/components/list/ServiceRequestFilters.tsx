'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
  const [filters, setFilters] = useQueryStates(filterParsers, { shallow: false });
  const [clientInput, setClientInput] = useState(filters.client);
  const debouncedClient = useDebounce(clientInput, 500);

  useEffect(() => {
    const nextClient = debouncedClient.trim();

    if (nextClient !== filters.client) {
      void setFilters({ client: nextClient || null });
    }
  }, [debouncedClient, filters.client, setFilters]);

  function handleReset() {
    void setFilters({ client: null, status: null, serviceType: null });
    setClientInput('');
  }

  return (
    <WidgetCard>
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <FieldLabel htmlFor="service-requests-client">Client</FieldLabel>
          <Input
            id="service-requests-client"
            type="search"
            value={clientInput}
            onChange={(event) => setClientInput(event.target.value)}
            placeholder="Search by name or email"
            autoComplete="off"
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
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
              })
            }
            ariaLabel="Filter service requests by status"
          />
        </Field>

        <Field>
          <FieldLabel>Service</FieldLabel>
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
              })
            }
            ariaLabel="Filter service requests by service"
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
