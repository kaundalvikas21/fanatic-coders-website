'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, UserPlus } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthSubmitButton } from '@/components/auth/AuthSubmitButton';
import { AUTH_INPUT_CLASS_NAME } from '@/components/auth/auth-styles';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient, useSession } from '@/lib/auth/client';
import { setFcopOrganizationActive } from '@/lib/auth/organization-client';

type InviteAuthMode = 'signup' | 'login';

type AcceptInvitationFlowProps = {
  invitationId?: string;
  invitedEmail?: string;
  redirectPath?: string;
};

const modeCopy = {
  signup: {
    title: 'Accept invitation',
    description: 'Create your account to join this workspace.',
    submit: 'Create account and continue',
    pending: 'Creating account',
    switchText: 'Already have an account?',
    switchLabel: 'Sign in',
    icon: UserPlus,
  },
  login: {
    title: 'Accept invitation',
    description: 'Sign in with the invited email to join this workspace.',
    submit: 'Sign in and continue',
    pending: 'Signing in',
    switchText: 'Need to create an account?',
    switchLabel: 'Create account',
    icon: LogIn,
  },
} satisfies Record<
  InviteAuthMode,
  {
    title: string;
    description: string;
    submit: string;
    pending: string;
    switchText: string;
    switchLabel: string;
    icon: typeof UserPlus;
  }
>;

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

export function AcceptInvitationFlow({
  invitationId,
  invitedEmail,
  redirectPath = '/dashboard',
}: AcceptInvitationFlowProps) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [mode, setMode] = useState<InviteAuthMode>('signup');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = modeCopy[mode];
  const sessionEmail = session?.user.email;
  const hasMismatchedSession = Boolean(
    invitedEmail && sessionEmail && invitedEmail.toLowerCase() !== sessionEmail.toLowerCase(),
  );

  async function acceptInvitation() {
    if (!invitationId) {
      setMessage('This invitation link is missing an invitation id.');
      return;
    }

    if (hasMismatchedSession) {
      setMessage(`This invitation is for ${invitedEmail}. Sign out from ${sessionEmail} first.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await authClient.organization.acceptInvitation({
        invitationId,
      });

      if (result.error) {
        setMessage(result.error.message ?? 'Could not accept this invitation.');
        return;
      }

      await setFcopOrganizationActive().catch(() => null);
      router.replace(redirectPath);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function waitForSession() {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data } = await authClient.getSession({
        fetchOptions: {
          cache: 'no-store',
        },
      });

      if (data?.user) {
        return true;
      }

      await wait(200);
    }

    return false;
  }

  useEffect(() => {
    if (session && !isSubmitting) {
      void acceptInvitation();
    }
    // Accept when an existing matching session opens an invitation link.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionEmail, invitationId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = invitedEmail ?? String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const name = String(formData.get('name') ?? '').trim();

    if (!email || !password || (mode === 'signup' && !name)) {
      setMessage('Enter the required account details.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result =
        mode === 'login'
          ? await authClient.signIn.email({ email, password })
          : await authClient.signUp.email({
              name,
              email,
              password,
            });

      if (result.error) {
        setMessage(result.error.message ?? 'Authentication failed.');
        return;
      }

      const hasSession = await waitForSession();

      if (!hasSession) {
        setMessage(
          'Account created, but the session was not ready. Sign in again to accept the invitation.',
        );
        setMode('login');
        return;
      }

      await acceptInvitation();
    } catch {
      setMessage('Authentication failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title={copy.title}
      description={copy.description}
      icon={copy.icon}
    >
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {mode === 'signup' && (
            // Collect display name only when the invited user creates an account.
            <Field>
              <FieldLabel htmlFor="invite-name">Name</FieldLabel>
              <Input
                id="invite-name"
                name="name"
                type="text"
                autoComplete="name"
                className={AUTH_INPUT_CLASS_NAME}
                required
                placeholder="Ava Reyes"
              />
            </Field>
          )}

          {/* Invitation recipient email; locked when email is present in the invite link. */}
          <Field>
            <FieldLabel htmlFor="invite-email">Email</FieldLabel>
            <Input
              id="invite-email"
              name="email"
              type="email"
              autoComplete="email"
              className={AUTH_INPUT_CLASS_NAME}
              required
              readOnly={Boolean(invitedEmail)}
              defaultValue={invitedEmail ?? ''}
              placeholder="you@example.com"
            />
          </Field>

          {/* Password for signing in or creating the invited account. */}
          <Field>
            <FieldLabel htmlFor="invite-password">Password</FieldLabel>
            <Input
              id="invite-password"
              name="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className={AUTH_INPUT_CLASS_NAME}
              required
              minLength={8}
              placeholder="At least 8 characters"
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
            disabled={isSubmitting || sessionPending || hasMismatchedSession || !invitationId}
          />
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-slate-300">
        {copy.switchText}{' '}
        <button
          type="button"
          className="font-semibold text-cyan-200 hover:text-cyan-100"
          onClick={() => {
            setMessage(null);
            setMode(mode === 'signup' ? 'login' : 'signup');
          }}
        >
          {copy.switchLabel}
        </button>
      </p>
    </AuthLayout>
  );
}
