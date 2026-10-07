import { z } from 'zod';

export const tagFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter a tag name.')
    .max(100, 'Keep the name under 100 characters.'),
  slug: z
    .string()
    .trim()
    .min(1, 'Enter a slug.')
    .max(191, 'Keep the slug under 191 characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens.'),
});

export type TagFormValues = z.infer<typeof tagFormSchema>;
