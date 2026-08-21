import { z } from 'zod';
import { TASK_PRIORITIES } from '@/types';
import { formatDateInputValue, startOfToday } from '@/utils/date';

const dateInputPattern = /^\d{4}-\d{2}-\d{2}$/;

export const taskCreateSchema = z.object({
  title: z.string().trim().min(1, 'Enter a task title.'),
  description: z
    .string()
    .trim()
    .transform((value) => value || undefined),
  priority: z.enum(TASK_PRIORITIES),
  dueDate: z
    .string()
    .refine((value) => !value || dateInputPattern.test(value), 'Enter a valid due date.')
    .refine(
      (value) => !value || value >= formatDateInputValue(startOfToday()),
      'Due date cannot be in the past.',
    )
    .transform((value) => value || undefined),
  estimatedHours: z
    .string()
    .trim()
    .refine(
      (value) => !value || (Number.isFinite(Number(value)) && Number(value) >= 0),
      'Enter valid hours greater than or equal to 0.',
    )
    .transform((value) => (value ? Number(value) : undefined)),
  assigneeMemberIds: z.array(z.string()),
});

export type TaskCreateFormInput = z.input<typeof taskCreateSchema>;
export type TaskCreateFormValues = z.output<typeof taskCreateSchema>;
