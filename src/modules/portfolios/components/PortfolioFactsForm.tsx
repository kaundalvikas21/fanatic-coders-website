'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Box, Images } from 'lucide-react';
import { toast } from 'sonner';
import { MultiSelectField } from '@/components/shared/forms/MultiSelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { updatePortfolioById } from '@/modules/portfolios/data/mutations';
import { techIcons } from '@/modules/portfolios/tech-icons';
import { useTags } from '@/modules/tags';
import type { Portfolio, UpdatePortfolioByIdRequest } from '@/types';

const formSchema = z.object({
  client: z.string().trim().max(255),
  year: z
    .string()
    .trim()
    .refine((value) => !value || /^\d{4}$/.test(value), 'Enter a four-digit year.'),
  industry: z.string().trim().max(100),
  duration: z.string().trim().max(100),
  tags: z.array(z.string().trim().min(1)).max(30),
  servicesText: z.string(),
  tech: z.array(z.string().trim().min(1)).max(30),
});

type FactsValues = z.infer<typeof formSchema>;
const nullable = (value: string) => value.trim() || null;
const list = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
const availableTechnologyOptions = Object.keys(techIcons)
  .sort((left, right) => left.localeCompare(right))
  .map((name) => ({ label: name, value: name }));

function TechnologyOptionLabel({ name }: { name: string }) {
  const icon = techIcons[name];
  return (
    <span className="flex min-w-0 items-center gap-2">
      {icon ? (
        <svg
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          fill="currentColor"
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <Box
          className="size-4 shrink-0"
          aria-hidden
        />
      )}
      <span className="truncate">{name}</span>
    </span>
  );
}

export function PortfolioFactsForm({ portfolio }: { portfolio: Portfolio }) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const { tags, isLoading: isLoadingTags, isUnavailable: tagsUnavailable } = useTags();
  const tagOptions = [
    ...tags.map(({ label }) => ({ label, value: label })),
    ...portfolio.tags
      .filter((name) => !tags.some(({ label }) => label === name))
      .map((name) => ({ label: name, value: name })),
  ];
  const technologyOptions = [
    ...availableTechnologyOptions,
    ...(portfolio.tech ?? [])
      .filter((name) => !techIcons[name])
      .map((name) => ({ label: name, value: name })),
  ];
  const form = useForm<FactsValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      client: portfolio.client ?? '',
      year: portfolio.year ?? '',
      industry: portfolio.industry ?? '',
      duration: portfolio.duration ?? '',
      tags: portfolio.tags,
      servicesText: portfolio.services?.join(', ') ?? '',
      tech: portfolio.tech ?? [],
    },
  });
  const errors = form.formState.errors;

  async function handleSubmit(values: FactsValues) {
    setMessage(null);
    const payload: UpdatePortfolioByIdRequest = {
      client: nullable(values.client),
      year: nullable(values.year),
      industry: nullable(values.industry),
      duration: nullable(values.duration),
      tags: values.tags,
      services: list(values.servicesText),
      tech: values.tech,
    };

    try {
      const response = await updatePortfolioById(portfolio.id, payload);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not save project facts.');
        return;
      }
      toast.success('Project facts saved.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save project facts.');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet loading={form.formState.isSubmitting}>
        <WidgetCard
          icon={Images}
          title="Project facts"
          description="Add client details, services, and technology."
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="portfolio-client">Client</FieldLabel>
              <Input
                id="portfolio-client"
                {...form.register('client')}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={Boolean(errors.year)}>
                <FieldLabel htmlFor="portfolio-year">Year</FieldLabel>
                <Input
                  id="portfolio-year"
                  placeholder="2026"
                  aria-invalid={Boolean(errors.year)}
                  {...form.register('year')}
                />
                {errors.year && <FieldError errors={[errors.year]} />}
              </Field>
              <Field>
                <FieldLabel htmlFor="portfolio-duration">Duration</FieldLabel>
                <Input
                  id="portfolio-duration"
                  placeholder="8 weeks"
                  {...form.register('duration')}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="portfolio-industry">Industry</FieldLabel>
              <Input
                id="portfolio-industry"
                {...form.register('industry')}
              />
            </Field>
            <Controller
              control={form.control}
              name="tags"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || tagsUnavailable}>
                  <FieldLabel htmlFor="portfolio-tags">Tags</FieldLabel>
                  <MultiSelectField
                    id="portfolio-tags"
                    options={tagOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={isLoadingTags ? 'Loading tags...' : 'Select tags'}
                    noOptionsMessage={
                      tagsUnavailable ? 'Could not load tags.' : 'No tags available.'
                    }
                    ariaLabel="Portfolio tags"
                    invalid={fieldState.invalid || tagsUnavailable}
                    disabled={form.formState.isSubmitting || isLoadingTags || tagsUnavailable}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  {tagsUnavailable && <FieldError errors={[{ message: 'Could not load tags.' }]} />}
                </Field>
              )}
            />
            <Field>
              <FieldLabel htmlFor="portfolio-services">Services</FieldLabel>
              <Input
                id="portfolio-services"
                placeholder="Strategy, Website"
                {...form.register('servicesText')}
              />
              <p className="text-xs text-muted-foreground">Separate entries with commas.</p>
            </Field>
            <Controller
              control={form.control}
              name="tech"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="portfolio-tech">Technology</FieldLabel>
                  <MultiSelectField
                    id="portfolio-tech"
                    options={technologyOptions}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select technologies"
                    ariaLabel="Portfolio technologies"
                    invalid={fieldState.invalid}
                    disabled={form.formState.isSubmitting}
                    renderOption={(option) => <TechnologyOptionLabel name={option.label} />}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            {message && <FieldError errors={[{ message }]} />}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving facts...' : 'Save facts'}
            </Button>
          </FieldGroup>
        </WidgetCard>
      </FieldSet>
    </form>
  );
}
