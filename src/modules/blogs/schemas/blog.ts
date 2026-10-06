import { z } from 'zod';

import type { TiptapDocument } from '@/types';
import { hasBlogContent } from '@/modules/blogs/utils/has-blog-content';

export const blogFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Enter a title.')
    .max(255, 'Keep the title under 255 characters.'),
  slug: z
    .string()
    .trim()
    .min(1, 'Enter a slug.')
    .max(191, 'Keep the slug under 191 characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens.'),
  content: z
    .custom<TiptapDocument>(
      (value) =>
        typeof value === 'object' &&
        value !== null &&
        'type' in value &&
        value.type === 'doc' &&
        (!('content' in value) || Array.isArray(value.content)),
      'Enter valid blog content.',
    )
    .refine(hasBlogContent, 'Write some blog content.'),
  excerpt: z.string().trim().max(1000, 'Keep the excerpt under 1000 characters.'),
  isPublished: z.boolean(),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
