import { z } from 'zod';
import type { CreateTaskCommentRequest, UpdateTaskCommentRequest } from '@/types';

const contentSchema = z.string().trim().min(1, 'Write a comment first.').max(5000);

export const taskCommentSchema = z.object({
  content: contentSchema,
});

export const createTaskCommentSchema =
  taskCommentSchema satisfies z.ZodType<CreateTaskCommentRequest>;
export const updateTaskCommentSchema =
  taskCommentSchema satisfies z.ZodType<UpdateTaskCommentRequest>;

export type TaskCommentFormInput = z.input<typeof taskCommentSchema>;
export type TaskCommentFormValues = z.output<typeof taskCommentSchema>;
