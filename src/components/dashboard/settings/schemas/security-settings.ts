import { z } from 'zod';

export const SECURITY_PASSWORD_MIN_LENGTH = 8;
const SECURITY_PASSWORD_MAX_LENGTH = 128;

export const securitySettingsSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Enter your current password.')
      .max(
        SECURITY_PASSWORD_MAX_LENGTH,
        `Password must not exceed ${SECURITY_PASSWORD_MAX_LENGTH} characters.`,
      ),
    newPassword: z
      .string()
      .min(SECURITY_PASSWORD_MIN_LENGTH, `Use at least ${SECURITY_PASSWORD_MIN_LENGTH} characters.`)
      .max(
        SECURITY_PASSWORD_MAX_LENGTH,
        `Password must not exceed ${SECURITY_PASSWORD_MAX_LENGTH} characters.`,
      ),
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
  })
  .superRefine((values, context) => {
    if (values.currentPassword && values.newPassword === values.currentPassword) {
      context.addIssue({
        code: 'custom',
        path: ['newPassword'],
        message: 'Choose a password different from your current password.',
      });
    }

    if (values.confirmPassword && values.confirmPassword !== values.newPassword) {
      context.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'Passwords do not match.',
      });
    }
  });

export type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;
