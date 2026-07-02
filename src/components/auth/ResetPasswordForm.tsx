'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyRound, Loader2 } from 'lucide-react';

import { authClient } from '@/lib/auth/client';

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
    <section className="mx-auto w-full max-w-md rounded-lg border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/30">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <KeyRound className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-normal text-white">Set new password</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Choose a new password for your account.
          </p>
        </div>
      </div>

      {!token && (
        <p className="mb-4 rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
          This reset link is invalid or expired. Request a new link to continue.
        </p>
      )}

      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <label className="block text-sm font-medium text-slate-200">
          New password
          <input
            type="password"
            autoComplete="new-password"
            disabled={!token || isComplete}
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-3 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="At least 8 characters"
            {...form.register('password', {
              required: 'Enter a new password.',
              minLength: {
                value: MIN_PASSWORD_LENGTH,
                message: 'Use at least 8 characters.',
              },
            })}
          />
        </label>
        {passwordError && (
          <p className="rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            {passwordError}
          </p>
        )}

        <label className="block text-sm font-medium text-slate-200">
          Confirm password
          <input
            type="password"
            autoComplete="new-password"
            disabled={!token || isComplete}
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-3 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Repeat new password"
            {...form.register('confirmPassword', {
              required: 'Confirm your new password.',
              validate: (value) =>
                value === form.getValues('password') || 'Passwords do not match.',
            })}
          />
        </label>
        {confirmPasswordError && (
          <p className="rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            {confirmPasswordError}
          </p>
        )}

        {message && (
          <p className="rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-50">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !token || isComplete}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Updating password
            </>
          ) : (
            'Update password'
          )}
        </button>
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
    </section>
  );
}
