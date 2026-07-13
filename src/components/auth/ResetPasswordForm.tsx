'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyRound } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/client';
import { AuthLayout } from './AuthLayout';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AUTH_INPUT_CLASS_NAME } from './auth-styles';

const MIN_PASSWORD_LENGTH = 8;

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const form = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  async function onSubmit(values: ResetPasswordFormValues) {
    setMessage(null);

    if (!token) {
      setMessage('This reset link is missing a token.');
      return;
    }

    try {
      const result = await authClient.resetPassword({
        newPassword: values.password,
        token,
      });

      if (result.error) {
        setMessage(result.error.message ?? 'Could not reset your password.');
        return;
      }

      setMessage('Password updated. You can sign in now.');
      setIsComplete(true);
    } catch {
      setMessage('Could not reset your password. Please try again.');
    }
  }

  const passwordError = form.formState.errors.password?.message;
  const confirmPasswordError = form.formState.errors.confirmPassword?.message;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <AuthLayout
      title="Set new password"
      description="Choose a new password for your account."
      icon={KeyRound}
    >
      {!token && (
        <p className="mb-4 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          This reset link is invalid or expired. Request a new link to continue.
        </p>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* New password saved for the reset token. */}
          <Field data-invalid={Boolean(passwordError)}>
            <FieldLabel htmlFor="new-password">New password</FieldLabel>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              className={AUTH_INPUT_CLASS_NAME}
              disabled={!token || isComplete}
              placeholder="At least 8 characters"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? 'new-password-error' : undefined}
              {...form.register('password', {
                required: 'Enter a new password.',
                minLength: {
                  value: MIN_PASSWORD_LENGTH,
                  message: 'Use at least 8 characters.',
                },
              })}
            />
            <FieldError
              id="new-password-error"
              errors={[form.formState.errors.password]}
            />
          </Field>

          {/* Confirmation field prevents accidental password typos. */}
          <Field data-invalid={Boolean(confirmPasswordError)}>
            <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              className={AUTH_INPUT_CLASS_NAME}
              disabled={!token || isComplete}
              placeholder="Repeat new password"
              aria-invalid={Boolean(confirmPasswordError)}
              aria-describedby={confirmPasswordError ? 'confirm-password-error' : undefined}
              {...form.register('confirmPassword', {
                required: 'Confirm your new password.',
                validate: (value) =>
                  value === form.getValues('password') || 'Passwords do not match.',
              })}
            />
            <FieldError
              id="confirm-password-error"
              errors={[form.formState.errors.confirmPassword]}
            />
          </Field>

          {message && (
            <p className="rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-50">
              {message}
            </p>
          )}

          <AuthSubmitButton
            label="Update password"
            pendingLabel="Updating password"
            isPending={isSubmitting}
            disabled={!token || isComplete}
          />
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        {isComplete ? 'Ready to continue?' : 'Need another link?'}{' '}
        <Link
          href={isComplete ? '/login' : '/forgot-password'}
          className="font-semibold text-cyan-200 hover:text-cyan-100"
        >
          {isComplete ? 'Sign in' : 'Request reset'}
        </Link>
      </p>
    </AuthLayout>
  );
}
