'use client';

import { useState, type FormEvent } from 'react';
import { Send, Check } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { CtaPanel } from '@/components/ui/CtaPanel';
import { createNewsletterSubscription } from '@/modules/newsletter';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BlogNewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const normalizedEmail = email.trim();

    if (!EMAIL_RE.test(normalizedEmail)) {
      setError('Enter a valid email, like name@company.com.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const website = String(new FormData(e.currentTarget).get('website') ?? '');

    try {
      const response = await createNewsletterSubscription({
        email: normalizedEmail,
        website,
      });

      if (!response.success) {
        throw new Error('Newsletter subscription failed.');
      }

      setDone(true);
      setEmail('');
    } catch {
      setError('Could not subscribe right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <CtaPanel
      sectionId="blog-newsletter"
      background="var(--dark-1)"
      variant="muted"
      badge="./subscribe.sh"
      heading="New posts, no noise"
      body="One thoughtful email when we publish. No spam."
    >
      {done ? (
        <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/15 px-5 py-3 text-sm text-green-300">
          <Check
            size={16}
            aria-hidden
          />
          {"You're subscribed. We'll email you when a new post is published."}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto flex w-full max-w-md flex-col sm:flex-row gap-3"
        >
          <div
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="newsletter-website">Website</label>
            <input
              id="newsletter-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="flex-1 text-left">
            <label
              htmlFor="newsletter-email"
              className="sr-only"
            >
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="you@company.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-email-error' : undefined}
              disabled={isSubmitting}
              className={`w-full rounded-lg bg-white/5 px-4 py-3 text-sm text-white placeholder:text-blue-100/50 border outline-none transition-colors focus:border-indigo-400/60 ${error ? 'border-red-400/60' : 'border-white/10'}`}
            />
            {error && (
              <p
                id="newsletter-email-error"
                role="alert"
                className="mt-1.5 text-xs text-red-300"
              >
                {error}
              </p>
            )}
          </div>
          <GradientButton
            type="submit"
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'subscribing...' : 'subscribe'}
            <Send
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
              aria-hidden
            />
          </GradientButton>
        </form>
      )}
    </CtaPanel>
  );
}
