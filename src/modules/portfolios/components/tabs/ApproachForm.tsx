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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { approachSchema, nullable } from './schemas';
import { getSection, SectionFormCard, type SectionFormProps } from './shared';

type Values = z.infer<typeof approachSchema>;

export function ApproachForm(props: SectionFormProps) {
  const [section, setSection] = useState(() => getSection(props.portfolio, 'APPROACH'));
  const [message, setMessage] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(approachSchema),
    defaultValues: {
      title: section?.title ?? 'Approach',
      content: section?.content ?? '',
      imageUrl: section?.imageUrl ?? '',
    },
    mode: 'onChange',
  });
  const errors = form.formState.errors;
  async function handleSubmit(values: Values) {
    setMessage(null);
    try {
      const payload: PortfolioAddonWriteRequest = {
        type: 'APPROACH',
        title: values.title,
        content: nullable(values.content),
        imageUrl: nullable(values.imageUrl),
      };
      const response = section
        ? await updatePortfolioAddon(props.portfolio.id, section.id, payload)
        : await createPortfolioAddon(props.portfolio.id, payload);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not save this section.');
        return;
      }
      setSection(response.data as PortfolioAddon);
      toast.success('Approach saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this section.');
    }
  }

  async function handleDelete() {
    if (!section || !window.confirm('Delete this approach section?')) return;
    setMessage(null);
    setRemoving(true);
    try {
      const response = await deletePortfolioAddon(props.portfolio.id, section.id);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not delete this section.');
        return;
      }
      setSection(undefined);
      form.reset({ title: 'Approach', content: '', imageUrl: '' });
      toast.success('Approach deleted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete this section.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SectionFormCard
        title="Approach"
        description="Explain the work and add an image if needed."
        submitting={form.formState.isSubmitting}
        message={message}
        removing={removing}
        onDelete={section ? handleDelete : undefined}
      >
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor="approach-title">Title *</FieldLabel>
          <Input
            id="approach-title"
            aria-invalid={Boolean(errors.title)}
            {...form.register('title')}
          />
          {errors.title && <FieldError errors={[errors.title]} />}
        </Field>
        <Field data-invalid={Boolean(errors.content)}>
          <FieldLabel htmlFor="approach-content">Content *</FieldLabel>
          <Textarea
            id="approach-content"
            rows={6}
            aria-invalid={Boolean(errors.content)}
            {...form.register('content')}
          />
          {errors.content && <FieldError errors={[errors.content]} />}
        </Field>
        <Field data-invalid={Boolean(errors.imageUrl)}>
          <FieldLabel htmlFor="approach-image">Image URL</FieldLabel>
          <Input
            id="approach-image"
            type="url"
            placeholder="https://example.com/image.jpg"
            aria-invalid={Boolean(errors.imageUrl)}
            {...form.register('imageUrl')}
          />
          {errors.imageUrl && <FieldError errors={[errors.imageUrl]} />}
        </Field>
      </SectionFormCard>
    </form>
  );
}
