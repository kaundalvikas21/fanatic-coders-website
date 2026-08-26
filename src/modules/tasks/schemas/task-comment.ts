import { z } from 'zod';
import type { CreateTaskCommentRequest, UpdateTaskCommentRequest } from '@/types';

const contentSchema = z.string().trim().min(1, 'Write a comment first.').max(5000);

export const createTaskCommentSchema = z.object({
  content: contentSchema,
}) satisfies z.ZodType<CreateTaskCommentRequest>;

export const updateTaskCommentSchema = z.object({
  content: contentSchema,
}) satisfies z.ZodType<UpdateTaskCommentRequest>;
