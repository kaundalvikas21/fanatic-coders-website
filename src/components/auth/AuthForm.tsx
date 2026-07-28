'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogIn, type LucideIcon, UserPlus } from 'lucide-react';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/client';
import { FCOP_ORGANIZATION_SLUG } from '@/lib/auth/organization';
import { setFcopOrganizationActive } from '@/lib/auth/organization-client';
import { getRoleHomePath } from '@/lib/auth/roles';
import { storeFrontendBearerToken } from '@/lib/auth/token-client';
import { AuthLayout } from './AuthLayout';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AUTH_INPUT_CLASS_NAME } from './auth-styles';

type AuthMode = 'login' | 'signup';

type AuthFormProps = {
  mode: AuthMode;
};

type AuthFormValues = {
  name: string;
  email: string;
  password: string;
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
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const copy = content[mode];

  async function redirectToDashboard() {
    await setFcopOrganizationActive().catch(() => null);
    const { data } = await authClient.organization.getActiveMemberRole({
      query: {
        organizationSlug: FCOP_ORGANIZATION_SLUG,
      },
    });

    window.location.replace(getRoleHomePath(data?.role));
  }

  async function onSubmit(values: AuthFormValues) {
    setMessage(null);

    try {
      let bearerToken: string | null = null;
      const result =
        mode === 'login'
          ? await authClient.signIn.email(
              {
                email: values.email,
                password: values.password,
              },
              {
                onSuccess: (ctx) => {
                  bearerToken = ctx.response.headers.get('set-auth-token');
                },
              },
            )
          : await authClient.signUp.email(
              {
                name: values.name,
                email: values.email,
                password: values.password,
              },
              {
                onSuccess: (ctx) => {
                  bearerToken = ctx.response.headers.get('set-auth-token');
                },
              },
            );

      if (result.error) {
        setMessage(result.error.message ?? 'Authentication failed.');
        return;
      }

      if (bearerToken) {
        await storeFrontendBearerToken(bearerToken);
      }

      await redirectToDashboard();
    } catch {
      setMessage('Authentication failed. Please try again.');
    }
  }

  return (
    <AuthLayout
      title={copy.title}
      description={copy.description}
      icon={copy.icon}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
          {mode === 'signup' && (
            // Collect display name only when creating a new account.
            <Field data-invalid={Boolean(errors.name)}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                className={AUTH_INPUT_CLASS_NAME}
                placeholder="Ava Reyes"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name', {
                  setValueAs: (value) => String(value).trim(),
                  required: 'Enter your name.',
                })}
              />
              <FieldError
                id="name-error"
                errors={[errors.name]}
              />
            </Field>
          )}

          {/* Account email used for login/signup. */}
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              className={AUTH_INPUT_CLASS_NAME}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email', {
                setValueAs: (value) => String(value).trim(),
                required: 'Enter your email.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address.',
                },
              })}
            />
            <FieldError
              id="email-error"
              errors={[errors.email]}
            />
          </Field>

          {/* Password for current login or new account creation. */}
          <Field data-invalid={Boolean(errors.password)}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className={AUTH_INPUT_CLASS_NAME}
              placeholder="At least 8 characters"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password', {
                required: 'Enter your password.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters.',
                },
              })}
            />
            <FieldError
              id="password-error"
              errors={[errors.password]}
            />
          </Field>

          {message && (
            <p className="rounded-lg border border-red-300/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
              {message}
            </p>
          )}

          <AuthSubmitButton
            label={copy.submit}
            pendingLabel={copy.pending}
            isPending={isSubmitting}
          />
        </FieldGroup>
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

      {mode === 'login' && (
        <p className="mt-3 text-center text-sm">
          <Link
            href="/forgot-password"
            className="font-semibold text-cyan-200 hover:text-cyan-100"
          >
            Forgot password?
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
