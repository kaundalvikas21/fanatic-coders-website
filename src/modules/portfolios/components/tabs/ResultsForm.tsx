'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  createPortfolioAddon,
  updatePortfolioAddon,
  deletePortfolioAddon,
} from '@/modules/portfolios/data/addons/mutations';
import type { PortfolioAddon, PortfolioAddonWriteRequest } from '@/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { resultsSchema, nullable } from './schemas';
import { getSection, SectionFormCard, type SectionFormProps } from './shared';

type Values = z.infer<typeof resultsSchema>;

export function ResultsForm(props: SectionFormProps) {
  const [section, setSection] = useState(() => getSection(props.portfolio, 'RESULTS'));
  const [message, setMessage] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(resultsSchema),
    mode: 'onChange',
    defaultValues: {
      title: section?.title ?? 'Results',
      content: section?.content ?? '',
      cards: (section?.cards ?? [])
        .filter((card) => 'label' in card && 'value' in card)
        .map((card) => ({
          label: 'label' in card ? card.label : '',
          value: 'value' in card ? card.value : '',
          caption: 'caption' in card ? (card.caption ?? '') : '',
        })),
    },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'cards' });
  const errors = form.formState.errors;
  async function handleSubmit(values: Values) {
    setMessage(null);
    try {
      const payload: PortfolioAddonWriteRequest = {
        type: 'RESULTS',
        title: values.title,
        content: nullable(values.content),
        cards: values.cards.map((card) => ({
          ...card,
          caption: nullable(card.caption),
        })),
      };
      const response = section
        ? await updatePortfolioAddon(props.portfolio.id, section.id, payload)
        : await createPortfolioAddon(props.portfolio.id, payload);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not save this section.');
        return;
      }
      setSection(response.data as PortfolioAddon);
      toast.success('Results saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this section.');
    }
  }

  async function handleDelete() {
    if (!section || !window.confirm('Delete this results section?')) return;
    setMessage(null);
    setRemoving(true);
    try {
      const response = await deletePortfolioAddon(props.portfolio.id, section.id);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not delete this section.');
        return;
      }
      setSection(undefined);
      form.reset({ title: 'Results', content: '', cards: [] });
      toast.success('Results deleted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete this section.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SectionFormCard
        title="Results"
        description="Add the outcomes and metrics for this project."
        submitting={form.formState.isSubmitting}
        message={message}
        removing={removing}
        onDelete={section ? handleDelete : undefined}
      >
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor="results-title">Title *</FieldLabel>
          <Input
            id="results-title"
            aria-invalid={Boolean(errors.title)}
            {...form.register('title')}
          />
          {errors.title && <FieldError errors={[errors.title]} />}
        </Field>
        <Field data-invalid={Boolean(errors.content)}>
          <FieldLabel htmlFor="results-content">Content</FieldLabel>
          <Textarea
            id="results-content"
            rows={4}
            aria-invalid={Boolean(errors.content)}
            {...form.register('content')}
          />
          {errors.content && <FieldError errors={[errors.content]} />}
        </Field>
        <div className="space-y-3 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Metrics</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={fields.length >= 30}
              onClick={() => append({ label: '', value: '', caption: '' })}
            >
              <Plus /> Add metric
            </Button>
          </div>
          {fields.map((card, index) => (
            <div
              key={card.id}
              className="rounded-lg border border-border/60 bg-background/40 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  Metric {index + 1}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Remove metric ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={Boolean(errors.cards?.[index]?.label)}>
                  <FieldLabel htmlFor={`metric-${index}-label`}>Label *</FieldLabel>
                  <Input
                    id={`metric-${index}-label`}
                    aria-invalid={Boolean(errors.cards?.[index]?.label)}
                    {...form.register(`cards.${index}.label`)}
                  />
                  {errors.cards?.[index]?.label && (
                    <FieldError errors={[errors.cards[index].label]} />
                  )}
                </Field>
                <Field data-invalid={Boolean(errors.cards?.[index]?.value)}>
                  <FieldLabel htmlFor={`metric-${index}-value`}>Value *</FieldLabel>
                  <Input
                    id={`metric-${index}-value`}
                    aria-invalid={Boolean(errors.cards?.[index]?.value)}
                    {...form.register(`cards.${index}.value`)}
                  />
                  {errors.cards?.[index]?.value && (
                    <FieldError errors={[errors.cards[index].value]} />
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor={`metric-${index}-caption`}>Caption</FieldLabel>
                  <Input
                    id={`metric-${index}-caption`}
                    {...form.register(`cards.${index}.caption`)}
                  />
                </Field>
              </div>
            </div>
          ))}
          {errors.cards?.root && <FieldError errors={[errors.cards.root]} />}
        </div>
      </SectionFormCard>
    </form>
  );
}
