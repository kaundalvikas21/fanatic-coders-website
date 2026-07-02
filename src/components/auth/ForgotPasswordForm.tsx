'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';

import { requestPasswordReset } from '@/lib/data/auth/mutations';

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
    <section className="mx-auto w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <Mail className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-normal text-white">Reset password</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Enter your account email. We will send a link to set a new password.
          </p>
        </div>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="block text-sm font-medium text-slate-200">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-3 focus:ring-cyan-300/10"
            placeholder="you@example.com"
          />
        </label>

        {message && (
          <p className="rounded-lg border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-50">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending link
            </>
          ) : (
            'Send reset link'
          )}
        </button>
      </form>

      <Link
        href="/login"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 hover:text-cyan-100"
      >
        <ArrowLeft className="size-4" />
        Back to sign in
      </Link>
    </section>
  );
}
