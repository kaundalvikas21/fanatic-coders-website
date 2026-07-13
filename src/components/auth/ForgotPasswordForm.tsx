'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { requestPasswordReset } from '@/lib/data/auth/mutations';
import { AuthLayout } from './AuthLayout';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AUTH_INPUT_CLASS_NAME } from './auth-styles';

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();

    if (!email) {
      setMessage('Enter your email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (!result.success) {
        setMessage(result.error?.details ?? result.message ?? 'Could not send the reset link.');
        return;
      }

      setMessage(
        result.message ?? 'If an account exists for that email, a reset link has been sent.',
      );
    } catch {
      setMessage('Could not send the reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Reset password"
      description="Enter your account email. We will send a link to set a new password."
      icon={Mail}
    >
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {/* Account email that receives the password reset link. */}
          <Field>
            <FieldLabel htmlFor="reset-email">Email</FieldLabel>
            <Input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              className={AUTH_INPUT_CLASS_NAME}
              required
              placeholder="you@example.com"
            />
          </Field>

          {message && (
            <p className="rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-50">
              {message}
            </p>
          )}

          <AuthSubmitButton
            label="Send reset link"
            pendingLabel="Sending link"
            isPending={isSubmitting}
          />
        </FieldGroup>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </AuthLayout>
  );
}
