'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, LoaderCircle, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/auth/PasswordInput';
import {
  SECURITY_PASSWORD_MIN_LENGTH,
  securitySettingsSchema,
  type SecuritySettingsFormValues,
} from '@/components/dashboard/settings/schemas/security-settings';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { authClient } from '@/lib/auth/client';

export function SecuritySettings() {
  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const currentPasswordError = form.formState.errors.currentPassword?.message;
  const newPasswordError = form.formState.errors.newPassword?.message;
  const confirmPasswordError = form.formState.errors.confirmPassword?.message;
  const rootError = form.formState.errors.root?.message;
  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: SecuritySettingsFormValues) {
    form.clearErrors('root');

    try {
      const { error } = await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (error) {
        form.setError('root', {
          message: error.message || 'Could not update your password.',
        });
        return;
      }

      form.reset();
      toast.success('Password updated. Other sessions were signed out.');
    } catch {
      form.setError('root', {
        message: 'Could not update your password. Please try again.',
      });
    }
  }

  return (
    <form
      className="grid content-start gap-5"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Field data-invalid={Boolean(currentPasswordError)}>
        <FieldLabel htmlFor="current-password">Current password</FieldLabel>
        <PasswordInput
          id="current-password"
          className="h-11"
          autoComplete="current-password"
          disabled={isSubmitting}
          aria-invalid={Boolean(currentPasswordError)}
          aria-describedby={currentPasswordError ? 'current-password-error' : undefined}
          {...form.register('currentPassword')}
        />
        <FieldError
          id="current-password-error"
          errors={[form.formState.errors.currentPassword]}
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={Boolean(newPasswordError)}>
          <FieldLabel htmlFor="new-password">New password</FieldLabel>
          <PasswordInput
            id="new-password"
            className="h-11"
            autoComplete="new-password"
            disabled={isSubmitting}
            aria-invalid={Boolean(newPasswordError)}
            aria-describedby={newPasswordError ? 'new-password-error' : 'new-password-hint'}
            {...form.register('newPassword')}
          />
          <FieldDescription id="new-password-hint">
            Use at least {SECURITY_PASSWORD_MIN_LENGTH} characters.
          </FieldDescription>
          <FieldError
            id="new-password-error"
            errors={[form.formState.errors.newPassword]}
          />
        </Field>

        <Field data-invalid={Boolean(confirmPasswordError)}>
          <FieldLabel htmlFor="confirm-password">Confirm new password</FieldLabel>
          <PasswordInput
            id="confirm-password"
            className="h-11"
            autoComplete="new-password"
            disabled={isSubmitting}
            aria-invalid={Boolean(confirmPasswordError)}
            aria-describedby={confirmPasswordError ? 'confirm-password-error' : undefined}
            {...form.register('confirmPassword')}
          />
          <FieldError
            id="confirm-password-error"
            errors={[form.formState.errors.confirmPassword]}
          />
        </Field>
      </div>

      <p className="flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2.5 text-sm leading-6 text-muted-foreground">
        <KeyRound
          className="mt-1 size-4 shrink-0 text-primary"
          aria-hidden="true"
        />
        Updating your password signs out your other active sessions.
      </p>

      {rootError && <FieldError errors={[{ message: rootError }]} />}

      <div className="flex justify-end border-t pt-5">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {isSubmitting ? 'Updating password' : 'Update password'}
        </Button>
      </div>
    </form>
  );
}
