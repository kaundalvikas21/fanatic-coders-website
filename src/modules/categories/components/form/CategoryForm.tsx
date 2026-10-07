'use client';

import { useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FolderOpen, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useOptionalSheet } from '@/components/shared/action-sheet';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { createCategory, updateCategoryById } from '@/modules/categories/data/mutations';
import { categoryFormSchema, type CategoryFormValues } from '@/modules/categories/schemas/category';
import type { Category } from '@/types';
import { slugify } from '@/utils/string';

type CategoryFormProps = {
  category?: Category;
  header?: ReactNode;
};

export function CategoryForm({ category, header }: CategoryFormProps) {
  const router = useRouter();
  const sheet = useOptionalSheet();
  const [slugEdited, setSlugEdited] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: category?.name ?? '', slug: category?.slug ?? '' },
    mode: 'onChange',
  });
  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: CategoryFormValues) {
    setMessage(null);
    try {
      const response = category
        ? await updateCategoryById(category.id, values)
        : await createCategory(values);

      if (!response.success || !response.data) {
        if (response.status === 409) {
          form.setError(
            'slug',
            { type: 'server', message: 'This slug already exists. Choose another.' },
            { shouldFocus: true },
          );
          return;
        }
        setMessage(response.message || 'Could not save category.');
        return;
      }

      const nextCategory = response.data as Category;
      const nextValues = { name: nextCategory.name, slug: nextCategory.slug };
      form.reset(sheet && !category ? { name: '', slug: '' } : nextValues);
      setSlugEdited(false);
      sheet?.close();
      toast.success(category ? 'Category updated.' : 'Category created.');
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save category.');
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet loading={isSubmitting}>
        <DetailPageLayout className={sheet ? '!grid-cols-1' : undefined}>
          <DetailPageLayout.Main>
            {header}
            <WidgetCard
              icon={FolderOpen}
              title="Category details"
              description="Set the name and URL slug for this category."
            >
              <FieldGroup>
                <Field data-invalid={Boolean(form.formState.errors.name)}>
                  <FieldLabel htmlFor="category-name">
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
                    id="category-name"
                    aria-required="true"
                    placeholder="Enter a category name"
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
                  <FieldLabel htmlFor="category-slug">
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
                    id="category-slug"
                    aria-required="true"
                    placeholder="category-name"
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
              title="Save category"
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
                  {isSubmitting
                    ? 'Saving category...'
                    : category
                      ? 'Save changes'
                      : 'Create category'}
                </Button>
              </FieldGroup>
            </WidgetCard>
          </DetailPageLayout.Aside>
        </DetailPageLayout>
      </FieldSet>
    </form>
  );
}
