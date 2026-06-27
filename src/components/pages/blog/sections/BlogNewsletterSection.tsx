'use client';

import { useState, type FormEvent } from 'react';
import { Send, Check } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { CtaPanel } from '@/components/ui/CtaPanel';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BlogNewsletterSection() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email, like name@company.com.');
      return;
    }
    setError(null);
    // Interim guard: no backend yet. Route the signup to our inbox via the visitor's mail client
    // so it isn't lost. Replace with a provider/Supabase call in a later phase.
    window.location.href = `mailto:hello@fanaticcoders.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent(`Please add ${email.trim()} to the newsletter list.`)}`;
    setDone(true);
  }

  return (
    <CtaPanel
      sectionId="blog-newsletter"
      background="var(--dark-1)"
      variant="muted"
      badge="./subscribe.sh"
      heading="New posts, no noise"
      body="One thoughtful email when we publish. No spam, unsubscribe anytime."
    >
      {done ? (
        <div className="inline-flex items-center gap-2 rounded-lg bg-green-500/15 px-5 py-3 text-sm text-green-300">
          <Check
            size={16}
            aria-hidden
          />
          Your email app should open. Send the message to finish subscribing.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto flex w-full max-w-md flex-col sm:flex-row gap-3"
        >
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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="you@company.com"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'newsletter-email-error' : undefined}
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
          <GradientButton type="submit">
            subscribe
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
