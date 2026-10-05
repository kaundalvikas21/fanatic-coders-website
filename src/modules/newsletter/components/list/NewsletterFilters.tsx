'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { RotateCcw } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { FilterBar } from '@/components/shared/filter-bar';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const newsletterFiltersParsers = {
  email: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
};

export function NewsletterFilters() {
  const [filters, setFilters] = useQueryStates(newsletterFiltersParsers, {
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

  function handleReset() {
    setEmailInput('');
    void setFilters({ email: null, page: null });
  }

  return (
    <FilterBar className="p-4">
      <FieldGroup className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <Field>
          <FieldLabel htmlFor="newsletter-email">Subscriber email</FieldLabel>
          <Input
            id="newsletter-email"
            type="search"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            placeholder="Search by email"
            size="lg"
            autoComplete="off"
          />
        </Field>

        <Button
          type="button"
          variant="default"
          size="lg"
          onClick={handleReset}
          disabled={!emailInput && !filters.email}
          className="w-full sm:w-auto"
        >
          <RotateCcw />
          Reset
        </Button>
      </FieldGroup>
    </FilterBar>
  );
}
