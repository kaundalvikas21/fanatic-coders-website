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
import { deliverySchema, nullable } from './schemas';
import { getSection, SectionFormCard, type SectionFormProps } from './shared';

type Values = z.infer<typeof deliverySchema>;

export function DeliveryForm(props: SectionFormProps) {
  const [section, setSection] = useState(() => getSection(props.portfolio, 'DELIVERY'));
  const [message, setMessage] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(deliverySchema),
    mode: 'onChange',
    defaultValues: {
      title: section?.title ?? 'Delivery',
      content: section?.content ?? '',
      cards: (section?.cards ?? [])
        .filter((card) => 'title' in card && 'desc' in card)
        .map((card) => ({
          title: 'title' in card ? card.title : '',
          duration: 'duration' in card ? card.duration : '',
          desc: 'desc' in card ? card.desc : '',
        })),
    },
  });
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'cards' });
  const errors = form.formState.errors;
  async function handleSubmit(values: Values) {
    setMessage(null);
    try {
      const payload: PortfolioAddonWriteRequest = {
        type: 'DELIVERY',
        title: values.title,
        content: nullable(values.content),
        cards: values.cards,
      };
      const response = section
        ? await updatePortfolioAddon(props.portfolio.id, section.id, payload)
        : await createPortfolioAddon(props.portfolio.id, payload);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not save this section.');
        return;
      }
      setSection(response.data as PortfolioAddon);
      toast.success('Delivery saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this section.');
    }
  }

  async function handleDelete() {
    if (!section || !window.confirm('Delete this delivery section?')) return;
    setMessage(null);
    setRemoving(true);
    try {
      const response = await deletePortfolioAddon(props.portfolio.id, section.id);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not delete this section.');
        return;
      }
      setSection(undefined);
      form.reset({ title: 'Delivery', content: '', cards: [] });
      toast.success('Delivery deleted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete this section.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SectionFormCard
        title="Delivery"
        description="Add the steps completed for this project."
        submitting={form.formState.isSubmitting}
        message={message}
        removing={removing}
        onDelete={section ? handleDelete : undefined}
      >
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor="delivery-title">Title *</FieldLabel>
          <Input
            id="delivery-title"
            aria-invalid={Boolean(errors.title)}
            {...form.register('title')}
          />
          {errors.title && <FieldError errors={[errors.title]} />}
        </Field>
        <Field data-invalid={Boolean(errors.content)}>
          <FieldLabel htmlFor="delivery-content">Content</FieldLabel>
          <Textarea
            id="delivery-content"
            rows={4}
            aria-invalid={Boolean(errors.content)}
            {...form.register('content')}
          />
          {errors.content && <FieldError errors={[errors.content]} />}
        </Field>
        <div className="space-y-3 border-t border-border/60 pt-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium">Steps</p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={fields.length >= 30}
              onClick={() => append({ title: '', duration: '', desc: '' })}
            >
              <Plus /> Add step
            </Button>
          </div>
          {fields.map((card, index) => (
            <div
              key={card.id}
              className="rounded-lg border border-border/60 bg-background/40 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label={`Remove step ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  <Trash2 />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={Boolean(errors.cards?.[index]?.title)}>
                  <FieldLabel htmlFor={`step-${index}-title`}>Title *</FieldLabel>
                  <Input
                    id={`step-${index}-title`}
                    aria-invalid={Boolean(errors.cards?.[index]?.title)}
                    {...form.register(`cards.${index}.title`)}
                  />
                  {errors.cards?.[index]?.title && (
                    <FieldError errors={[errors.cards[index].title]} />
                  )}
                </Field>
                <Field data-invalid={Boolean(errors.cards?.[index]?.duration)}>
                  <FieldLabel htmlFor={`step-${index}-duration`}>Duration</FieldLabel>
                  <Input
                    id={`step-${index}-duration`}
                    aria-invalid={Boolean(errors.cards?.[index]?.duration)}
                    {...form.register(`cards.${index}.duration`)}
                  />
                  {errors.cards?.[index]?.duration && (
                    <FieldError errors={[errors.cards[index].duration]} />
                  )}
                </Field>
                <Field
                  className="sm:col-span-2"
                  data-invalid={Boolean(errors.cards?.[index]?.desc)}
                >
                  <FieldLabel htmlFor={`step-${index}-desc`}>Description *</FieldLabel>
                  <Textarea
                    id={`step-${index}-desc`}
                    rows={3}
                    aria-invalid={Boolean(errors.cards?.[index]?.desc)}
                    {...form.register(`cards.${index}.desc`)}
                  />
                  {errors.cards?.[index]?.desc && (
                    <FieldError errors={[errors.cards[index].desc]} />
                  )}
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
