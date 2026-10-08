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
import { challengeSchema, nullable } from './schemas';
import { getSection, SectionFormCard, type SectionFormProps } from './shared';

type Values = z.infer<typeof challengeSchema>;

export function ChallengeForm(props: SectionFormProps) {
  const [section, setSection] = useState(() => getSection(props.portfolio, 'CHALLENGE'));
  const [message, setMessage] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(challengeSchema),
    defaultValues: { title: section?.title ?? 'Challenge', content: section?.content ?? '' },
    mode: 'onChange',
  });
  const errors = form.formState.errors;
  async function handleSubmit(values: Values) {
    setMessage(null);
    try {
      const payload: PortfolioAddonWriteRequest = {
        type: 'CHALLENGE',
        title: values.title,
        content: nullable(values.content),
      };
      const response = section
        ? await updatePortfolioAddon(props.portfolio.id, section.id, payload)
        : await createPortfolioAddon(props.portfolio.id, payload);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not save this section.');
        return;
      }
      setSection(response.data as PortfolioAddon);
      toast.success('Challenge saved.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save this section.');
    }
  }

  async function handleDelete() {
    if (!section || !window.confirm('Delete this challenge section?')) return;
    setMessage(null);
    setRemoving(true);
    try {
      const response = await deletePortfolioAddon(props.portfolio.id, section.id);
      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not delete this section.');
        return;
      }
      setSection(undefined);
      form.reset({ title: 'Challenge', content: '' });
      toast.success('Challenge deleted.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not delete this section.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SectionFormCard
        title="Challenge"
        description="Describe the problem the project needed to solve."
        submitting={form.formState.isSubmitting}
        message={message}
        removing={removing}
        onDelete={section ? handleDelete : undefined}
      >
        <Field data-invalid={Boolean(errors.title)}>
          <FieldLabel htmlFor="challenge-title">Title *</FieldLabel>
          <Input
            id="challenge-title"
            aria-invalid={Boolean(errors.title)}
            {...form.register('title')}
          />
          {errors.title && <FieldError errors={[errors.title]} />}
        </Field>
        <Field data-invalid={Boolean(errors.content)}>
          <FieldLabel htmlFor="challenge-content">Content *</FieldLabel>
          <Textarea
            id="challenge-content"
            rows={6}
            aria-invalid={Boolean(errors.content)}
            {...form.register('content')}
          />
          {errors.content && <FieldError errors={[errors.content]} />}
        </Field>
      </SectionFormCard>
    </form>
  );
}
