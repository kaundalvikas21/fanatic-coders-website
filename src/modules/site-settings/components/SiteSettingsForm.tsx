'use client';

import { LoaderCircle, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';
import { updateSiteSetting } from '@/modules/site-settings/data/mutations';
import type { SiteSetting, UpdateSiteSettingRequest } from '@/types';

type SiteSettingsFormValues = Record<keyof UpdateSiteSettingRequest, string>;

const socialFields = [
  { name: 'facebookUrl', label: 'Facebook' },
  { name: 'twitterUrl', label: 'X / Twitter' },
  { name: 'instagramUrl', label: 'Instagram' },
  { name: 'linkedinUrl', label: 'LinkedIn' },
  { name: 'githubUrl', label: 'GitHub' },
] as const;

function webUrl(value: string) {
  if (!value.trim()) return true;
  try {
    return ['http:', 'https:'].includes(new URL(value.trim()).protocol) || 'Enter a valid web URL.';
  } catch {
    return 'Enter a valid web URL.';
  }
}

function initialValues(setting: SiteSetting | null): SiteSettingsFormValues {
  return {
    contactEmail: setting?.contactEmail ?? siteConfig.contactEmail,
    phone: setting?.phone ?? '',
    whatsapp: setting?.whatsapp ?? '',
    address: setting?.address ?? '',
    businessHours: setting?.businessHours ?? '',
    facebookUrl: setting?.facebookUrl ?? '',
    twitterUrl: setting?.twitterUrl ?? '',
    instagramUrl: setting?.instagramUrl ?? '',
    linkedinUrl: setting?.linkedinUrl ?? '',
    githubUrl: setting?.githubUrl ?? '',
  };
}

export function SiteSettingsForm({ initialSetting }: { initialSetting: SiteSetting | null }) {
  const form = useForm<SiteSettingsFormValues>({ defaultValues: initialValues(initialSetting) });
  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: SiteSettingsFormValues) {
    form.clearErrors('root');

    const optional = (value: string) => value.trim() || null;
    const payload: UpdateSiteSettingRequest = {
      contactEmail: values.contactEmail.trim().toLowerCase(),
      phone: optional(values.phone),
      whatsapp: optional(values.whatsapp),
      address: optional(values.address),
      businessHours: optional(values.businessHours),
      facebookUrl: optional(values.facebookUrl),
      twitterUrl: optional(values.twitterUrl),
      instagramUrl: optional(values.instagramUrl),
      linkedinUrl: optional(values.linkedinUrl),
      githubUrl: optional(values.githubUrl),
    };

    try {
      const response = await updateSiteSetting(payload);
      if (!response.success) {
        form.setError('root', { message: response.message || 'Could not save site settings.' });
        return;
      }

      form.reset({ ...values, contactEmail: payload.contactEmail });
      toast.success('Site contact details saved.');
    } catch {
      form.setError('root', { message: 'Could not save site settings. Please try again.' });
    }
  }

  return (
    <form
      className="grid gap-7"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field data-invalid={Boolean(form.formState.errors.contactEmail)}>
          <FieldLabel htmlFor="site-contact-email">Contact email</FieldLabel>
          <Input
            id="site-contact-email"
            type="email"
            autoComplete="email"
            size="lg"
            disabled={isSubmitting}
            aria-invalid={Boolean(form.formState.errors.contactEmail)}
            {...form.register('contactEmail', {
              required: 'Enter the public contact email.',
              maxLength: { value: 320, message: 'Email must not exceed 320 characters.' },
              validate: (value) => /^\S+@\S+\.\S+$/.test(value.trim()) || 'Enter a valid email.',
            })}
          />
          <FieldError errors={[form.formState.errors.contactEmail]} />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.phone)}>
          <FieldLabel htmlFor="site-phone">Phone</FieldLabel>
          <Input
            id="site-phone"
            type="tel"
            autoComplete="tel"
            size="lg"
            disabled={isSubmitting}
            aria-invalid={Boolean(form.formState.errors.phone)}
            {...form.register('phone', {
              maxLength: { value: 30, message: 'Phone must not exceed 30 characters.' },
            })}
          />
          <FieldError errors={[form.formState.errors.phone]} />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.whatsapp)}>
          <FieldLabel htmlFor="site-whatsapp">WhatsApp number</FieldLabel>
          <Input
            id="site-whatsapp"
            type="tel"
            size="lg"
            disabled={isSubmitting}
            aria-invalid={Boolean(form.formState.errors.whatsapp)}
            {...form.register('whatsapp', {
              maxLength: { value: 30, message: 'WhatsApp must not exceed 30 characters.' },
            })}
          />
          <FieldDescription>Include the country code so visitors can open a chat.</FieldDescription>
          <FieldError errors={[form.formState.errors.whatsapp]} />
        </Field>

        <Field data-invalid={Boolean(form.formState.errors.businessHours)}>
          <FieldLabel htmlFor="site-business-hours">Business hours</FieldLabel>
          <Input
            id="site-business-hours"
            size="lg"
            disabled={isSubmitting}
            aria-invalid={Boolean(form.formState.errors.businessHours)}
            placeholder="Monday to Friday, 9 am to 6 pm IST"
            {...form.register('businessHours', {
              maxLength: {
                value: 2000,
                message: 'Business hours must not exceed 2000 characters.',
              },
            })}
          />
          <FieldError errors={[form.formState.errors.businessHours]} />
        </Field>
      </div>

      <Field data-invalid={Boolean(form.formState.errors.address)}>
        <FieldLabel htmlFor="site-address">Address or location</FieldLabel>
        <Textarea
          id="site-address"
          rows={3}
          disabled={isSubmitting}
          aria-invalid={Boolean(form.formState.errors.address)}
          {...form.register('address', {
            maxLength: { value: 5000, message: 'Address must not exceed 5000 characters.' },
          })}
        />
        <FieldError errors={[form.formState.errors.address]} />
      </Field>

      <div className="grid gap-5 border-t pt-6">
        <div>
          <h3 className="font-medium">Social profiles</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add full profile URLs. Empty links are hidden.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {socialFields.map(({ name, label }) => (
            <Field
              key={name}
              data-invalid={Boolean(form.formState.errors[name])}
            >
              <FieldLabel htmlFor={`site-${name}`}>{label}</FieldLabel>
              <Input
                id={`site-${name}`}
                type="url"
                size="lg"
                placeholder="https://"
                disabled={isSubmitting}
                aria-invalid={Boolean(form.formState.errors[name])}
                {...form.register(name, {
                  maxLength: { value: 2048, message: 'URL must not exceed 2048 characters.' },
                  validate: webUrl,
                })}
              />
              <FieldError errors={[form.formState.errors[name]]} />
            </Field>
          ))}
        </div>
      </div>

      {form.formState.errors.root && <FieldError errors={[form.formState.errors.root]} />}

      <div className="flex justify-end border-t pt-5">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !form.formState.isDirty}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {isSubmitting ? 'Saving' : 'Save site details'}
        </Button>
      </div>
    </form>
  );
}
