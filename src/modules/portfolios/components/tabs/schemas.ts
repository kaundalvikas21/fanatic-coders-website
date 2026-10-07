import { z } from 'zod';

const title = z.string().trim().min(1, 'Enter a section title.').max(255);
const content = z.string().trim().max(10000);
const optionalUrl = z
  .string()
  .trim()
  .refine((value) => !value || URL.canParse(value), 'Enter a valid URL.');

export const challengeSchema = z.object({
  title,
  content: content.min(1, 'Enter challenge content.'),
});
export const approachSchema = z.object({
  title,
  content: content.min(1, 'Enter approach content.'),
  imageUrl: optionalUrl,
});
export const deliverySchema = z.object({
  title,
  content,
  cards: z
    .array(
      z.object({
        title: z.string().trim().min(1, 'Enter a step title.').max(255),
        duration: z.string().trim().max(100),
        desc: z.string().trim().min(1, 'Enter a description.').max(2000),
      }),
    )
    .max(30),
});
export const resultsSchema = z.object({
  title,
  content,
  cards: z
    .array(
      z.object({
        label: z.string().trim().min(1, 'Enter a label.').max(255),
        value: z.string().trim().min(1, 'Enter a value.').max(255),
        caption: z.string().trim().max(255),
      }),
    )
    .max(30),
});

export const nullable = (value: string) => value.trim() || null;
