'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { SelectField, type SelectOption } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  LEAD_STATUSES,
  LEAD_STATUS_OPTIONS,
  SERVICE_INTERESTS,
  SERVICE_INTEREST_OPTIONS,
} from '@/types';

const leadFiltersParsers = {
  email: parseAsString.withDefault(''),
  status: parseAsStringLiteral(LEAD_STATUSES),
  serviceType: parseAsStringLiteral(SERVICE_INTERESTS),
  page: parseAsInteger.withDefault(1),
};

const ALL_FILTERS_VALUE = 'all';

const statusOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All statuses' },
  ...LEAD_STATUS_OPTIONS,
] satisfies SelectOption[];

const serviceOptions = [
  { value: ALL_FILTERS_VALUE, label: 'All services' },
  ...SERVICE_INTEREST_OPTIONS,
] satisfies SelectOption[];

export function LeadsFilters() {
  const [filters, setFilters] = useQueryStates(leadFiltersParsers, {
    shallow: false,
  });
  const [emailInput, setEmailInput] = useState(filters.email);
  const debouncedEmail = useDebounce(emailInput, 500);

  useEffect(() => {
    const nextEmail = debouncedEmail.trim().toLowerCase();

    if (nextEmail !== filters.email) {
      void setFilters({ email: nextEmail || null, page: null });
    }
  }, [debouncedEmail, filters.email, setFilters]);

  function handleEmailChange(value: string) {
    setEmailInput(value);
  }

  function handleStatusChange(value: string) {
    void setFilters({
      status: value === ALL_FILTERS_VALUE ? null : (value as (typeof LEAD_STATUSES)[number]),
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
      email: null,
      status: null,
      serviceType: null,
      page: null,
    });
    setEmailInput('');
  }

  return (
    <WidgetCard>
      <FieldGroup className="grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
        <Field>
          <FieldLabel htmlFor="leads-email">Email</FieldLabel>
          <Input
            id="leads-email"
            type="search"
            value={emailInput}
            onChange={(event) => handleEmailChange(event.target.value)}
            placeholder="lead@example.com"
            autoComplete="off"
          />
        </Field>

        <Field>
          <FieldLabel>Status</FieldLabel>
          <SelectField
            id="leads-status"
            value={filters.status ?? ALL_FILTERS_VALUE}
            options={statusOptions}
            onChange={handleStatusChange}
            ariaLabel="Filter leads by status"
          />
        </Field>

        <Field>
          <FieldLabel>Service</FieldLabel>
          <SelectField
            id="leads-service"
            value={filters.serviceType ?? ALL_FILTERS_VALUE}
            options={serviceOptions}
            onChange={handleServiceTypeChange}
            ariaLabel="Filter leads by service"
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
