'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { Mail, MapPin, Clock, Send, Check, AlertCircle, User, Building2 } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { RevealSection } from '@/components/ui/RevealSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Select, type SelectOption } from '@/components/shared/forms/AuroraSelect';
import { IconGithub, IconLinkedin } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/utils';
import { createLead } from '@/modules/leads';
import { SERVICE_INTEREST_OPTIONS, type CreateLeadRequest, type ServiceInterest } from '@/types';

interface FormState {
  name: string;
  email: string;
  company: string;
  serviceInterest: ServiceInterest;
  budget: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  serviceInterest: 'WEB_DEVELOPMENT',
  budget: '',
  message: '',
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;

const budgetOptions: SelectOption[] = [
  { value: '<10k', label: 'Under $10k' },
  { value: '10-25k', label: '$10k to $25k' },
  { value: '25-50k', label: '$25k to $50k' },
  { value: '50k+', label: '$50k+' },
];

const serviceOptions: SelectOption[] = [...SERVICE_INTEREST_OPTIONS];

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please tell us your name.';
  if (!values.email.trim()) errors.email = 'An email is required so we can reply.';
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That doesn't look like a valid email.";
  if (!values.message.trim()) errors.message = "Let us know what you're building.";
  else if (values.message.trim().length < MESSAGE_MIN)
    errors.message = `A little more detail helps (${MESSAGE_MIN}+ characters).`;
  return errors;
}

const infoCards = [
  {
    Icon: Mail,
    label: 'email',
    value: 'hello@fanaticcoders.com',
    href: 'mailto:hello@fanaticcoders.com',
  },
  { Icon: MapPin, label: 'location', value: 'Remote-first · GMT+5:30 core hours', href: null },
  { Icon: Clock, label: 'response_time', value: 'Within 1 business day', href: null },
];

export function ContactSection() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function update<K extends keyof FormState>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setSubmitError('');
    setIsSubmitting(true);

    const budgetLabel = budgetOptions.find((o) => o.value === values.budget)?.label;

    try {
      const payload: CreateLeadRequest = {
        name: values.name.trim(),
        email: values.email.trim(),
        companyName: values.company.trim() || null,
        serviceInterest: values.serviceInterest,
        budgetRange: budgetLabel ?? null,
      };

      const response = await createLead(payload);

      if (!response.success) {
        throw new Error('Lead request failed.');
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong. Please try again or email hello@fanaticcoders.com.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const messageLength = values.message.trim().length;

  return (
    <section
      id="contact-form"
      className="scroll-mt-28 section-y relative overflow-hidden"
      style={{ background: 'var(--dark-2)' }}
    >
      <div className="aurora-bg-section absolute inset-0 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4">
        <RevealSection className="mb-12">
          <SectionHeading
            badge="contact.form"
            title={
              <>
                start.<span className="function">theConversation</span>()
              </>
            }
            comment="// a senior team member replies within a day"
          />
        </RevealSection>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
          {/* Form */}
          <RevealSection>
            <GlassCard
              accent="violet"
              className="p-7 md:p-9"
            >
              {submitted ? (
                <div
                  role="status"
                  className="text-center py-10"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/15">
                    <Check
                      size={26}
                      className="text-green-400"
                      aria-hidden
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white">Almost there</h2>
                  <p className="mt-2 text-sm text-blue-100/65 max-w-sm mx-auto leading-relaxed">
                    Thanks, {values.name.split(' ')[0] || 'there'}. Your message reached us and a
                    senior team member replies within a business day. You can also email{' '}
                    <a
                      href="mailto:hello@fanaticcoders.com"
                      className="text-indigo-300 hover:text-indigo-200"
                    >
                      hello@fanaticcoders.com
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(EMPTY);
                      setSubmitted(false);
                    }}
                    className="mt-5 inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-mono text-indigo-300 hover:text-indigo-200 hover:bg-white/5 transition-colors"
                  >
                    ./send-another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <p className="text-sm text-[var(--color-text-muted)] mb-6">
                    Fields marked <span className="text-rose-400">*</span> are required.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field
                      id="name"
                      label="Name"
                      required
                      error={errors.name}
                    >
                      <IconInput
                        Icon={User}
                        id="name"
                        type="text"
                        value={values.name}
                        error={errors.name}
                        required
                        onChange={(v) => update('name', v)}
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                      />
                    </Field>
                    <Field
                      id="email"
                      label="Email"
                      required
                      error={errors.email}
                    >
                      <IconInput
                        Icon={Mail}
                        id="email"
                        type="email"
                        value={values.email}
                        error={errors.email}
                        required
                        onChange={(v) => update('email', v)}
                        placeholder="ada@company.com"
                        autoComplete="email"
                      />
                    </Field>
                    <Field
                      id="company"
                      label="Company"
                    >
                      <IconInput
                        Icon={Building2}
                        id="company"
                        type="text"
                        value={values.company}
                        onChange={(v) => update('company', v)}
                        placeholder="Optional"
                        autoComplete="organization"
                      />
                    </Field>
                    <Field
                      id="serviceInterest"
                      label="Service"
                    >
                      <Select
                        id="serviceInterest"
                        value={values.serviceInterest}
                        onChange={(v) => update('serviceInterest', v as ServiceInterest)}
                        options={serviceOptions}
                        placeholder="Select a service"
                        ariaLabel="Service interest"
                      />
                    </Field>
                    <Field
                      id="budget"
                      label="Budget"
                    >
                      <Select
                        id="budget"
                        value={values.budget}
                        onChange={(v) => update('budget', v)}
                        options={budgetOptions}
                        placeholder="Select a range"
                        ariaLabel="Project budget"
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field
                      id="message"
                      label="Project details"
                      required
                      error={errors.message}
                    >
                      <textarea
                        id="message"
                        rows={5}
                        value={values.message}
                        onChange={(e) => update('message', e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-required
                        aria-describedby={[errors.message && 'message-error', 'message-counter']
                          .filter(Boolean)
                          .join(' ')}
                        className={fieldClass(errors.message)}
                        placeholder="What are you building, and what does success look like?"
                      />
                      <div
                        id="message-counter"
                        aria-live="polite"
                        className={cn(
                          'mt-1.5 text-right text-xs font-mono',
                          messageLength >= MESSAGE_MIN
                            ? 'text-indigo-300'
                            : 'text-[var(--color-text-muted)]',
                        )}
                      >
                        {messageLength} / {MESSAGE_MIN} min
                      </div>
                    </Field>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <GradientButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? 'sending' : 'sendMessage'}
                      <Send
                        size={16}
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        aria-hidden
                      />
                    </GradientButton>
                    <span className="text-xs font-mono text-[var(--color-text-muted)] text-center sm:text-left">
                      {'// a real person replies, no auto-responder'}
                    </span>
                  </div>
                  {submitError && (
                    <p className="mt-4 flex items-center gap-1.5 text-xs text-red-300">
                      <AlertCircle
                        size={12}
                        aria-hidden
                      />
                      {submitError}
                    </p>
                  )}
                </form>
              )}
            </GlassCard>
          </RevealSection>

          {/* Info column */}
          <RevealSection className="space-y-4">
            {infoCards.map(({ Icon, label, value, href }) => (
              <GlassCard
                key={label}
                accent="plain"
                style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
                className="p-5 flex items-start gap-4 transition-colors hover:border-indigo-400/20"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500/12">
                  <Icon
                    size={18}
                    className="text-indigo-300"
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-[var(--color-text-muted)]">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-white hover:text-indigo-300 transition-colors break-words"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm text-white break-words">{value}</div>
                  )}
                </div>
              </GlassCard>
            ))}

            <GlassCard
              accent="cyan"
              style={{ backdropFilter: 'none', WebkitBackdropFilter: 'none' }}
              className="p-5"
            >
              <div className="text-xs font-mono text-[var(--color-text-muted)] mb-3">
                {'// find us'}
              </div>
              <div className="flex gap-3">
                <SocialLink
                  href="https://github.com"
                  label="GitHub"
                >
                  <IconGithub size={18} />
                </SocialLink>
                <SocialLink
                  href="https://linkedin.com"
                  label="LinkedIn"
                >
                  <IconLinkedin size={18} />
                </SocialLink>
              </div>
            </GlassCard>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function fieldClass(error?: string, hasIcon = false) {
  return cn(
    'w-full rounded-xl bg-white/5 py-3 text-sm text-white placeholder:text-[var(--color-text-muted)]',
    hasIcon ? 'pl-11 pr-4' : 'px-4',
    'border outline-none transition-colors hover:border-white/20',
    'focus:border-[var(--aurora-violet-light)]/70 focus:ring-2 focus:ring-[var(--aurora-violet-light)]/30 focus:bg-white/[0.07]',
    error ? 'border-red-400/60' : 'border-white/10',
  );
}

function IconInput({
  Icon,
  id,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
  required,
}: {
  Icon: typeof User;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <Icon
        size={16}
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-100/40"
      />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-required={required || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldClass(error, true)}
      />
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-mono text-blue-100/65"
      >
        {label}
        {required && <span className="ml-0.5 text-rose-400">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300"
        >
          <AlertCircle
            size={12}
            aria-hidden
          />
          {error}
        </p>
      )}
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-blue-100/60 transition-colors hover:bg-indigo-500/20 hover:text-indigo-300"
    >
      {children}
    </a>
  );
}
