import { z } from 'zod';

export const LIVE_CHAT_MESSAGE_MAX_LENGTH = 10_000;

export const liveChatMessageSchema = z.object({
  body: z
    .string()
    .trim()
    .min(1, 'Enter a message before sending.')
    .max(LIVE_CHAT_MESSAGE_MAX_LENGTH, 'Message is too long.'),
  isInternal: z.boolean().optional().default(false),
});
