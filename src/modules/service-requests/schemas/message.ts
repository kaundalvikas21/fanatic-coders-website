import { z } from 'zod';

export const SERVICE_REQUEST_MESSAGE_MAX_LENGTH = 10_000;

export const createServiceRequestMessageSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, 'Enter a message before sending.')
    .max(SERVICE_REQUEST_MESSAGE_MAX_LENGTH, 'Message is too long.'),
  isInternal: z.boolean().optional().default(false),
});
