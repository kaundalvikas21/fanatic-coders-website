'use client';

import { useState, type ReactNode } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { FilePenLine, ImageIcon, Search, Send, Tag, Tags } from 'lucide-react';
import { toast } from 'sonner';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { MultiSelectField } from '@/components/shared/forms/MultiSelectField';
import { RichTextEditor, type RichTextDocument } from '@/components/shared/rich-text-editor';
import { SectionTabs, type SectionTabItem } from '@/components/shared/section-tabs';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TabsContent } from '@/components/ui/tabs';
import { createBlog, updateBlogById } from '@/modules/blogs/data/mutations';
import { uploadBlogFeatureImageById } from '@/modules/blogs/data/media';
import { blogFormSchema, type BlogFormValues } from '@/modules/blogs/schemas/blog';
import { getBlogFormValues } from '@/modules/blogs/utils/blog-form-values';
import { useCategories } from '@/modules/categories';
import { useTags } from '@/modules/tags';
import { slugify } from '@/utils/string';
import type { Blog, CreateBlogRequest, UpdateBlogFeatureImageByIdRequest } from '@/types';
import { BlogFeatureImageUploader } from './BlogFeatureImageUploader';

const BLOG_TAXONOMY_TABS = [
  { value: 'categories', label: 'Categories', Icon: Tags },
  { value: 'tags', label: 'Tags', Icon: Tag },
] as const satisfies readonly SectionTabItem[];

type BlogFormProps = {
  blog?: Blog;
  onSaved?: (blog: Blog) => void;
  header?: ReactNode;
};

export function BlogForm({ blog, onSaved, header }: BlogFormProps) {
  const [savedBlog, setSavedBlog] = useState(blog);
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);
  const {
    categories: categoryOptions,
    isLoading: isLoadingCategories,
    isUnavailable: categoriesUnavailable,
  } = useCategories();
  const { tags: tagOptions, isLoading: isLoadingTags, isUnavailable: tagsUnavailable } = useTags();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: getBlogFormValues(blog),
    mode: 'onChange',
  });
  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: BlogFormValues) {
    setMessage(null);
    const wasEditing = Boolean(savedBlog);

    const payload: CreateBlogRequest = {
      title: values.title,
      slug: values.slug,
      content: values.content,
      excerpt: values.excerpt || null,
      isPublished: values.isPublished,
    };
    const blogSeo =
      values.metaTitle && values.metaDescription
        ? { metaTitle: values.metaTitle, metaDescription: values.metaDescription }
        : null;

    try {
      const response = savedBlog
        ? await updateBlogById(savedBlog.id, {
            ...payload,
            blogSeo,
            categoryIds: values.categoryIds,
            tagIds: values.tagIds,
          })
        : await createBlog({ ...payload, ...(blogSeo ? { blogSeo } : {}) });

      if (!response.success || !response.data) {
        if (
          response.status === 409 ||
          (response.status === 422 && /already exist/i.test(response.message))
        ) {
          form.setError(
            'slug',
            { type: 'server', message: 'This slug already exists. Choose a different slug.' },
            { shouldFocus: true },
          );
          return;
        }

        setMessage(response.message || 'Could not save blog.');
        return;
      }

      let nextBlog: Blog = response.data as Blog;
      setSavedBlog(nextBlog);

      if (!wasEditing && (values.categoryIds.length > 0 || values.tagIds.length > 0)) {
        // Attach selected taxonomy before treating the new blog as fully saved.
        const taxonomyResponse = await updateBlogById(nextBlog.id, {
          categoryIds: values.categoryIds,
          tagIds: values.tagIds,
        });
        if (!taxonomyResponse.success || !taxonomyResponse.data) {
          setMessage(
            taxonomyResponse.message ||
              'Blog created, but categories or tags could not be saved. Try saving again.',
          );
          return;
        }
        nextBlog = taxonomyResponse.data as Blog;
        setSavedBlog(nextBlog);
      }

      if (pendingImage) {
        const imageData = new FormData();
        imageData.append('image' satisfies keyof UpdateBlogFeatureImageByIdRequest, pendingImage);
        const imageResponse = await uploadBlogFeatureImageById(nextBlog.id, imageData);

        if (!imageResponse.success || !imageResponse.data) {
          setMessage(imageResponse.message || 'Blog saved, but the feature image upload failed.');
          return;
        }

        nextBlog = { ...nextBlog, ...(imageResponse.data as Blog) };
        setSavedBlog(nextBlog);
        setPendingImage(null);
      }

      setSavedBlog(nextBlog);
      form.reset(getBlogFormValues(nextBlog));
      toast.success(wasEditing ? 'Blog updated.' : 'Blog created.');
      onSaved?.(nextBlog);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not save blog.');
    }
  }

  return (
    <form
      onSubmit={(event) => {
        if (!pendingImage && !savedBlog?.featureImage) {
          event.preventDefault();
          setImageError('Add a feature image before saving the blog.');
          return;
        }

        void form.handleSubmit(handleSubmit)(event);
      }}
    >
      <FieldSet loading={isSubmitting}>
        <DetailPageLayout>
          <DetailPageLayout.Main>
            {header}
            <WidgetCard
              icon={FilePenLine}
              title="Write blog"
              description="Add a title, URL slug, and the full article."
            >
              <FieldGroup>
                <Field data-invalid={Boolean(form.formState.errors.title)}>
                  <FieldLabel htmlFor="blog-title">
                    Title{' '}
                    <span
                      className="text-destructive"
                      aria-hidden="true"
                    >
                      *
                    </span>
                    <span className="sr-only">required</span>
                  </FieldLabel>
                  <Input
                    id="blog-title"
                    aria-required="true"
                    placeholder="Enter a blog title"
                    aria-invalid={Boolean(form.formState.errors.title)}
                    {...form.register('title', {
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
                  {form.formState.errors.title && (
                    <FieldError errors={[form.formState.errors.title]} />
                  )}
                </Field>

                <Field data-invalid={Boolean(form.formState.errors.slug)}>
                  <FieldLabel htmlFor="blog-slug">
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
                    id="blog-slug"
                    aria-required="true"
                    placeholder="example-blog-title"
                    aria-invalid={Boolean(form.formState.errors.slug)}
                    {...form.register('slug', {
                      onChange: () => {
                        setSlugEdited(true);
                      },
                    })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Follows the title until you edit this field.
                  </p>
                  {form.formState.errors.slug && (
                    <FieldError errors={[form.formState.errors.slug]} />
                  )}
                </Field>

                <Controller
                  control={form.control}
                  name="content"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Content{' '}
                        <span
                          className="text-destructive"
                          aria-hidden="true"
                        >
                          *
                        </span>
                        <span className="sr-only">required</span>
                      </FieldLabel>
                      <RichTextEditor
                        value={field.value as RichTextDocument}
                        onChange={field.onChange}
                        headingLevels={[2, 3]}
                        markdownSource
                        ariaLabel="Blog content, required"
                        placeholder="Write Markdown here. Use ## for section headings."
                        editable={!isSubmitting}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </WidgetCard>

            <WidgetCard
              icon={Search}
              title="Search appearance"
              description="Set the title and description shown in search results."
            >
              <FieldGroup>
                <Field data-invalid={Boolean(form.formState.errors.metaTitle)}>
                  <FieldLabel htmlFor="blog-meta-title">Meta title</FieldLabel>
                  <Input
                    id="blog-meta-title"
                    placeholder="Title for search results"
                    aria-invalid={Boolean(form.formState.errors.metaTitle)}
                    {...form.register('metaTitle')}
                  />
                  {form.formState.errors.metaTitle && (
                    <FieldError errors={[form.formState.errors.metaTitle]} />
                  )}
                </Field>

                <Field data-invalid={Boolean(form.formState.errors.metaDescription)}>
                  <FieldLabel htmlFor="blog-meta-description">Meta description</FieldLabel>
                  <Textarea
                    id="blog-meta-description"
                    rows={4}
                    placeholder="Description for search results"
                    aria-invalid={Boolean(form.formState.errors.metaDescription)}
                    {...form.register('metaDescription')}
                  />
                  {form.formState.errors.metaDescription && (
                    <FieldError errors={[form.formState.errors.metaDescription]} />
                  )}
                </Field>
                <p className="text-xs text-muted-foreground">
                  Leave both blank to use the blog title and excerpt.
                </p>
              </FieldGroup>
            </WidgetCard>
          </DetailPageLayout.Main>

          <DetailPageLayout.Aside>
            <WidgetCard
              icon={Send}
              title="Publishing"
              description="Save this blog as a draft or publish it."
            >
              <FieldGroup>
                <Field orientation="horizontal">
                  <input
                    id="blog-is-published"
                    type="checkbox"
                    className="size-4 accent-primary"
                    {...form.register('isPublished')}
                  />
                  <FieldLabel htmlFor="blog-is-published">Published</FieldLabel>
                </Field>

                {message && <FieldError errors={[{ message }]} />}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? 'Saving blog...' : savedBlog ? 'Save changes' : 'Create blog'}
                </Button>
              </FieldGroup>
            </WidgetCard>

            <WidgetCard
              icon={ImageIcon}
              title="Listing details"
              description="Choose the image and summary shown with this blog."
            >
              <FieldGroup>
                <Field data-invalid={Boolean(imageError)}>
                  <FieldLabel>
                    Feature image{' '}
                    <span
                      className="text-destructive"
                      aria-hidden="true"
                    >
                      *
                    </span>
                    <span className="sr-only">required</span>
                  </FieldLabel>
                  <BlogFeatureImageUploader
                    blog={savedBlog}
                    pendingFile={pendingImage}
                    disabled={isSubmitting}
                    onStage={(file) => {
                      setPendingImage(file);
                      if (file) setImageError(null);
                    }}
                    onChange={(updatedBlog) => {
                      setSavedBlog((current) => ({ ...current, ...updatedBlog }));
                      if (updatedBlog.featureImage) setImageError(null);
                    }}
                  />
                  {imageError && <FieldError errors={[{ message: imageError }]} />}
                  {!savedBlog && (
                    <p className="text-xs text-muted-foreground">
                      The image uploads when you create the blog.
                    </p>
                  )}
                </Field>

                <Field data-invalid={Boolean(form.formState.errors.excerpt)}>
                  <FieldLabel htmlFor="blog-excerpt">Excerpt</FieldLabel>
                  <Textarea
                    id="blog-excerpt"
                    rows={4}
                    placeholder="Short summary for blog listings"
                    aria-invalid={Boolean(form.formState.errors.excerpt)}
                    {...form.register('excerpt')}
                  />
                  {form.formState.errors.excerpt && (
                    <FieldError errors={[form.formState.errors.excerpt]} />
                  )}
                </Field>
              </FieldGroup>
            </WidgetCard>

            <WidgetCard
              icon={Tags}
              title="Categories and tags"
              description="Choose how to organize this blog."
            >
              <SectionTabs
                defaultValue="categories"
                items={BLOG_TAXONOMY_TABS}
                ariaLabel="Blog taxonomy"
                variant="folder"
              >
                <TabsContent value="categories">
                  <Controller
                    control={form.control}
                    name="categoryIds"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid || categoriesUnavailable}>
                        <FieldLabel htmlFor="blog-categories">Categories</FieldLabel>
                        <MultiSelectField
                          id="blog-categories"
                          options={categoryOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={
                            isLoadingCategories ? 'Loading categories...' : 'Select categories'
                          }
                          noOptionsMessage={
                            categoriesUnavailable
                              ? 'Could not load categories.'
                              : 'No categories available.'
                          }
                          ariaLabel="Blog categories"
                          invalid={fieldState.invalid || categoriesUnavailable}
                          disabled={isSubmitting || isLoadingCategories || categoriesUnavailable}
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        {categoriesUnavailable && (
                          <FieldError errors={[{ message: 'Could not load categories.' }]} />
                        )}
                      </Field>
                    )}
                  />
                </TabsContent>
                <TabsContent value="tags">
                  <Controller
                    control={form.control}
                    name="tagIds"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid || tagsUnavailable}>
                        <FieldLabel htmlFor="blog-tags">Tags</FieldLabel>
                        <MultiSelectField
                          id="blog-tags"
                          options={tagOptions}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={isLoadingTags ? 'Loading tags...' : 'Select tags'}
                          noOptionsMessage={
                            tagsUnavailable ? 'Could not load tags.' : 'No tags available.'
                          }
                          ariaLabel="Blog tags"
                          invalid={fieldState.invalid || tagsUnavailable}
                          disabled={isSubmitting || isLoadingTags || tagsUnavailable}
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        {tagsUnavailable && (
                          <FieldError errors={[{ message: 'Could not load tags.' }]} />
                        )}
                      </Field>
                    )}
                  />
                </TabsContent>
              </SectionTabs>
            </WidgetCard>
          </DetailPageLayout.Aside>
        </DetailPageLayout>
      </FieldSet>
    </form>
  );
}
