'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPortfolio, updatePortfolioById } from '@/modules/portfolios/data/mutations';
import { uploadPortfolioCoverImageById } from '@/modules/portfolios/data/media';
import type { CreatePortfolioRequest, Portfolio } from '@/types';
import { slugify } from '@/utils/string';
import { PortfolioCoverImageUploader } from './PortfolioCoverImageUploader';

const formSchema = z.object({
  title: z.string().trim().min(1, 'Enter a title.').max(255),
  slug: z
    .string()
    .trim()
    .min(1, 'Enter a slug.')
    .max(191)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens.'),
  description: z.string().trim().min(1, 'Enter a description.').max(2000),
  overview: z.string().trim().max(10000),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
});

type DetailsValues = z.infer<typeof formSchema>;
const nullable = (value: string) => value.trim() || null;

export function PortfolioDetailsForm({ portfolio }: { portfolio?: Portfolio }) {
  const router = useRouter();
  const [savedPortfolio, setSavedPortfolio] = useState(portfolio);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(Boolean(portfolio));
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<DetailsValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: portfolio?.title ?? '',
      slug: portfolio?.slug ?? '',
      description: portfolio?.description ?? '',
      overview: portfolio?.overview ?? '',
      isPublished: portfolio?.isPublished ?? false,
      isFeatured: portfolio?.isFeatured ?? false,
    },
  });
  const errors = form.formState.errors;

  async function handleSubmit(values: DetailsValues) {
    setMessage(null);
    const wasEditing = Boolean(savedPortfolio);
    const payload: CreatePortfolioRequest = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      description: values.description.trim(),
      overview: nullable(values.overview),
      isPublished: values.isPublished,
      isFeatured: values.isFeatured,
    };

    try {
      const response = savedPortfolio
        ? await updatePortfolioById(savedPortfolio.id, payload)
        : await createPortfolio(payload);
      if (!response.success || !response.data) {
        if (response.status === 409) {
          form.setError(
            'slug',
            { type: 'server', message: 'This slug already exists. Choose another.' },
            { shouldFocus: true },
          );
          return;
        }
        setMessage(response.message || 'Could not save portfolio details.');
        return;
      }

      let saved = response.data as Portfolio;
      setSavedPortfolio(saved);
      setSlugEdited(true);

      if (pendingImage) {
        const imageData = new FormData();
        imageData.append('image', pendingImage);
        const imageResponse = await uploadPortfolioCoverImageById(saved.id, imageData);
        if (!imageResponse.success || !imageResponse.data) {
          setMessage(
            imageResponse.message || 'Portfolio saved, but the cover image upload failed.',
          );
          return;
        }
        saved = imageResponse.data as Portfolio;
        setSavedPortfolio(saved);
        setPendingImage(null);
      }

      toast.success(wasEditing ? 'Portfolio details saved.' : 'Portfolio created.');
      if (!portfolio) router.replace(`/dashboard/portfolios/${saved.id}`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save portfolio details.');
    }
  }

  return (
    <form
      onSubmit={(event) => {
        if (!pendingImage && !savedPortfolio?.imageUrl) {
          event.preventDefault();
          setImageError('Add a cover image before saving the portfolio.');
          return;
        }

        void form.handleSubmit(handleSubmit)(event);
      }}
    >
      <FieldSet loading={form.formState.isSubmitting}>
        <WidgetCard
          icon={FileText}
          title="Project details"
          description="Add the main project information and publishing settings."
        >
          <FieldGroup>
            <Field data-invalid={Boolean(errors.title)}>
              <FieldLabel htmlFor="portfolio-title">Title *</FieldLabel>
              <Input
                id="portfolio-title"
                placeholder="Project name"
                aria-invalid={Boolean(errors.title)}
                {...form.register('title', {
                  onChange: (event) => {
                    if (!slugEdited)
                      form.setValue('slug', slugify(event.target.value), {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                  },
                })}
              />
              {errors.title && <FieldError errors={[errors.title]} />}
            </Field>
            <Field data-invalid={Boolean(errors.slug)}>
              <FieldLabel htmlFor="portfolio-slug">Slug *</FieldLabel>
              <Input
                id="portfolio-slug"
                placeholder="project-name"
                aria-invalid={Boolean(errors.slug)}
                {...form.register('slug', { onChange: () => setSlugEdited(true) })}
              />
              {errors.slug && <FieldError errors={[errors.slug]} />}
            </Field>
            <Field data-invalid={Boolean(errors.description)}>
              <FieldLabel htmlFor="portfolio-description">Short description *</FieldLabel>
              <Textarea
                id="portfolio-description"
                rows={3}
                aria-invalid={Boolean(errors.description)}
                {...form.register('description')}
              />
              {errors.description && <FieldError errors={[errors.description]} />}
            </Field>
            <Field data-invalid={Boolean(errors.overview)}>
              <FieldLabel htmlFor="portfolio-overview">Overview</FieldLabel>
              <Textarea
                id="portfolio-overview"
                rows={5}
                aria-invalid={Boolean(errors.overview)}
                {...form.register('overview')}
              />
              {errors.overview && <FieldError errors={[errors.overview]} />}
            </Field>
            <Field data-invalid={Boolean(imageError)}>
              <FieldLabel>
                Cover image{' '}
                <span
                  className="text-destructive"
                  aria-hidden="true"
                >
                  *
                </span>
                <span className="sr-only">required</span>
              </FieldLabel>
              <PortfolioCoverImageUploader
                portfolio={savedPortfolio}
                pendingFile={pendingImage}
                disabled={form.formState.isSubmitting}
                onStage={(file) => {
                  setPendingImage(file);
                  if (file) setImageError(null);
                  else if (!savedPortfolio?.imageUrl)
                    setImageError('Add a cover image before saving the portfolio.');
                }}
                onChange={(updatedPortfolio) => {
                  setSavedPortfolio(updatedPortfolio);
                  setImageError(
                    updatedPortfolio.imageUrl
                      ? null
                      : 'Add a cover image before saving the portfolio.',
                  );
                }}
              />
              {imageError && <FieldError errors={[{ message: imageError }]} />}
              {!savedPortfolio && (
                <p className="text-xs text-muted-foreground">
                  The image uploads when you create the portfolio.
                </p>
              )}
            </Field>
            <div className="space-y-3 border-t border-border/60 pt-5">
              <p className="text-sm font-medium">Publishing</p>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  {...form.register('isPublished')}
                />
                Publish now
              </label>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  className="size-4 accent-primary"
                  {...form.register('isFeatured')}
                />
                Feature this project
              </label>
            </div>
            {message && <FieldError errors={[{ message }]} />}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? savedPortfolio
                  ? 'Saving details...'
                  : 'Creating portfolio...'
                : savedPortfolio
                  ? 'Save details'
                  : 'Create portfolio'}
            </Button>
          </FieldGroup>
        </WidgetCard>
      </FieldSet>
    </form>
  );
}
