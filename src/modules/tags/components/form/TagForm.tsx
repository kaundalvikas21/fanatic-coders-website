'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Save, Tags } from 'lucide-react';
import { toast } from 'sonner';
import { useOptionalSheet } from '@/components/shared/action-sheet';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createTag, updateTagById } from '@/modules/tags/data/mutations';
import { tagFormSchema, type TagFormValues } from '@/modules/tags/schemas/tag';
import type { Tag } from '@/types';
import { slugify } from '@/utils/string';

type TagFormProps = {
  tag?: Tag;
  header?: ReactNode;
};

export function TagForm({ tag, header }: TagFormProps) {
  const router = useRouter();
  const sheet = useOptionalSheet();
  const [slugEdited, setSlugEdited] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: { name: tag?.name ?? '', slug: tag?.slug ?? '' },
    mode: 'onChange',
  });
  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: TagFormValues) {
    setMessage(null);
    try {
      const response = tag ? await updateTagById(tag.id, values) : await createTag(values);

      if (!response.success || !response.data) {
        if (response.status === 409) {
          form.setError(
            'slug',
            { type: 'server', message: 'This slug already exists. Choose another.' },
            { shouldFocus: true },
          );
          return;
        }
        setMessage(response.message || 'Could not save tag.');
        return;
      }

      const nextTag = response.data as Tag;
      const nextValues = { name: nextTag.name, slug: nextTag.slug };
      form.reset(sheet && !tag ? { name: '', slug: '' } : nextValues);
      setSlugEdited(false);
      sheet?.close();
      toast.success(tag ? 'Tag updated.' : 'Tag created.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save tag.');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet loading={isSubmitting}>
        <DetailPageLayout className={sheet ? '!grid-cols-1' : undefined}>
          <DetailPageLayout.Main>
            {header}
            <WidgetCard
              icon={Tags}
              title="Tag details"
              description="Set the name and URL slug for this tag."
            >
              <FieldGroup>
                <Field data-invalid={Boolean(form.formState.errors.name)}>
                  <FieldLabel htmlFor="tag-name">
                    Name{' '}
                    <span
                      className="text-destructive"
                      aria-hidden="true"
                    >
                      *
                    </span>
                    <span className="sr-only">required</span>
                  </FieldLabel>
                  <Input
                    id="tag-name"
                    aria-required="true"
                    placeholder="Enter a tag name"
                    aria-invalid={Boolean(form.formState.errors.name)}
                    {...form.register('name', {
                      onChange: (event) => {
                        if (!slugEdited) {
                          form.setValue('slug', slugify(event.target.value), {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }
                      },
                    })}
                  />
                  {form.formState.errors.name && (
                    <FieldError errors={[form.formState.errors.name]} />
                  )}
                </Field>

                <Field data-invalid={Boolean(form.formState.errors.slug)}>
                  <FieldLabel htmlFor="tag-slug">
                    Slug{' '}
                    <span
                      className="text-destructive"
                      aria-hidden="true"
                    >
                      *
                    </span>
                    <span className="sr-only">required</span>
                  </FieldLabel>
                  <Input
                    id="tag-slug"
                    aria-required="true"
                    placeholder="tag-name"
                    aria-invalid={Boolean(form.formState.errors.slug)}
                    {...form.register('slug', { onChange: () => setSlugEdited(true) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Follows the name until you edit this field.
                  </p>
                  {form.formState.errors.slug && (
                    <FieldError errors={[form.formState.errors.slug]} />
                  )}
                </Field>
              </FieldGroup>
            </WidgetCard>
          </DetailPageLayout.Main>

          <DetailPageLayout.Aside>
            <WidgetCard
              icon={Save}
              title="Save tag"
              description="Save the name and slug."
            >
              <FieldGroup>
                {message && <FieldError errors={[{ message }]} />}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Saving tag...' : tag ? 'Save changes' : 'Create tag'}
                </Button>
              </FieldGroup>
            </WidgetCard>
          </DetailPageLayout.Aside>
        </DetailPageLayout>
      </FieldSet>
    </form>
  );
}
