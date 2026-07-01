'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { Loader2, LogIn, type LucideIcon, UserPlus } from 'lucide-react';

import { authClient, useSession } from '@/lib/auth/client';

type AuthMode = 'login' | 'signup';

type AuthFormProps = {
  mode: AuthMode;
};

type AuthCopy = {
  title: string;
  description: string;
  submit: string;
  pending: string;
  switchText: string;
  switchHref: string;
  switchLabel: string;
  icon: LucideIcon;
};

const content = {
  login: {
    title: 'Sign in',
    description: 'Use the account connected to your client workspace.',
    submit: 'Sign in',
    pending: 'Signing in',
    switchText: 'Need an account?',
    switchHref: '/signup',
    switchLabel: 'Create one',
    icon: LogIn,
  },
  signup: {
    title: 'Create account',
    description: 'Start with your name, email, and password.',
    submit: 'Create account',
    pending: 'Creating account',
    switchText: 'Already have an account?',
    switchHref: '/login',
    switchLabel: 'Sign in',
    icon: UserPlus,
  },
} satisfies Record<AuthMode, AuthCopy>;

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = content[mode];
  const Icon = copy.icon;

  useEffect(() => {
    if (session) {
      router.replace('/dashboard');
    }
  }, [router, session]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!email || !password) {
      setMessage('Enter your email and password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result =
        mode === 'login'
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({
              name: String(formData.get('name') ?? '').trim(),
              email,
              password,
            });

      if (result.error) {
        setMessage(result.error.message ?? 'Authentication failed.');
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    } catch {
      setMessage('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
          <Icon className="size-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-normal text-white">{copy.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{copy.description}</p>
        </div>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        {mode === 'signup' && (
          <label className="block text-sm font-medium text-slate-200">
            Name
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-3 focus:ring-cyan-300/10"
              placeholder="Ava Reyes"
            />
          </label>
        )}

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

        <label className="block text-sm font-medium text-slate-200">
          Password
          <input
            name="password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required
            minLength={8}
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-3 focus:ring-cyan-300/10"
            placeholder="At least 8 characters"
          />
        </label>

        {message && (
          <p className="rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || sessionPending}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {copy.pending}
            </>
          ) : (
            copy.submit
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        {copy.switchText}{' '}
        <Link
          href={copy.switchHref}
          className="font-semibold text-cyan-200 hover:text-cyan-100"
        >
          {copy.switchLabel}
        </Link>
      </p>
    </section>
  );
}
