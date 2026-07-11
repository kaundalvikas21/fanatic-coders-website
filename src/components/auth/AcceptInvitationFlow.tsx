'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { authClient, useSession } from '@/lib/auth/client';
import { setFcopOrganizationActive } from '@/lib/auth/organization-client';
import { InputField } from '@/components/shared/forms/InputField';

type InviteAuthMode = 'signup' | 'login';

type AcceptInvitationFlowProps = {
  invitationId?: string;
  invitedEmail?: string;
  serviceInterest?: string;
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
  serviceInterest,
}: AcceptInvitationFlowProps) {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [mode, setMode] = useState<InviteAuthMode>('signup');
  const [message, setMessage] = useState<string | null>(null);
  const [offerSignOut, setOfferSignOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isAcceptingInvitationRef = useRef(false);
  const hasAcceptedInvitationRef = useRef(false);
  const copy = modeCopy[mode];
  const Icon = copy.icon;
  const sessionEmail = session?.user.email;
  const hasMismatchedSession = Boolean(
    invitedEmail && sessionEmail && invitedEmail.toLowerCase() !== sessionEmail.toLowerCase(),
  );

  async function finishInvitation() {
    if (isAcceptingInvitationRef.current || hasAcceptedInvitationRef.current) {
      return;
    }

    if (!invitationId) {
      setMessage('This invitation link is missing an invitation id.');
      return;
    }

    if (hasMismatchedSession) {
      setMessage(`This invitation is for ${invitedEmail}. Sign out from ${sessionEmail} first.`);
      setOfferSignOut(true);
      return;
    }

    isAcceptingInvitationRef.current = true;

    const result = await authClient.organization.acceptInvitation({
      invitationId,
    });

    if (result.error) {
      isAcceptingInvitationRef.current = false;
      const errorMessage = result.error.message ?? 'Could not accept this invitation.';

      if (errorMessage.toLowerCase().includes('not the recipient')) {
        setOfferSignOut(true);
        setMessage(
          sessionEmail
            ? `This invitation is not for ${sessionEmail}. Sign out and continue with the invited email.`
            : errorMessage,
        );
        return;
      }

      setMessage(errorMessage);
      return;
    }

    hasAcceptedInvitationRef.current = true;
    await setFcopOrganizationActive().catch(() => null);
    router.replace(
      serviceInterest
        ? `/dashboard/client/service-requests/new?serviceInterest=${encodeURIComponent(serviceInterest)}`
        : '/dashboard',
    );
    router.refresh();
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
    if (session) {
      void finishInvitation();
    }
    // finishInvitation depends on UI state; session/invitationId are the behavior triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, invitationId]);

  async function handleSignOut() {
    setMessage(null);
    setOfferSignOut(false);
    setIsSubmitting(true);

    try {
      await authClient.signOut();
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setOfferSignOut(false);
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

      await finishInvitation();
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

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          {mode === 'signup' && (
            <Field>
              <FieldLabel htmlFor="invite-name">Name</FieldLabel>
              <InputField
                id="invite-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Ava Reyes"
              />
            </Field>
          )}

          <Field>
            <FieldLabel htmlFor="invite-email">Email</FieldLabel>
            <InputField
              id="invite-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              readOnly={Boolean(invitedEmail)}
              defaultValue={invitedEmail ?? ''}
              placeholder="you@example.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="invite-password">Password</FieldLabel>
            <InputField
              id="invite-password"
              name="password"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
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

          {(hasMismatchedSession || offerSignOut) && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSignOut}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              sessionPending ||
              hasMismatchedSession ||
              offerSignOut ||
              !invitationId
            }
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
    </section>
  );
}
