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
  assigneeMemberIds: z.array(z.string()).min(1, 'Select at least one assignee.'),
  addOnTasks: z
    .array(
      z.object({
        name: z.string().trim().max(255, 'Keep add-on names under 255 characters.'),
      }),
    )
    .max(5, 'Add up to 5 add-ons.')
    .transform((items) => items.filter((item) => item.name.length > 0)),
});

export type TaskFormInput = z.input<typeof taskCreateSchema>;
export type TaskFormValues = z.output<typeof taskCreateSchema>;

export const taskUpdateSchema = taskCreateSchema.extend({
  dueDate: z
    .string()
    .refine((value) => !value || dateInputPattern.test(value), 'Enter a valid due date.')
    .transform((value) => value || undefined),
});
export type TaskUpdateFormInput = z.input<typeof taskUpdateSchema>;
export type TaskUpdateFormValues = z.output<typeof taskUpdateSchema>;

export const taskAddOnUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Enter an add-on name.')
    .max(255, 'Keep the name under 255 characters.'),
});

export type TaskAddOnUpdateFormInput = z.input<typeof taskAddOnUpdateSchema>;
export type TaskAddOnUpdateFormValues = z.output<typeof taskAddOnUpdateSchema>;

export const taskAddOnCreateSchema = taskAddOnUpdateSchema;
export type TaskAddOnCreateFormInput = z.input<typeof taskAddOnCreateSchema>;
export type TaskAddOnCreateFormValues = z.output<typeof taskAddOnCreateSchema>;
