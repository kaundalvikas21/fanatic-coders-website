'use client';

import { useForm } from 'react-hook-form';
import { LoaderCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/client';
import { useAuth } from '@/providers/AuthProvider';

type ProfileDetailsFormValues = {
  name: string;
  email: string;
};

export function ProfileDetails() {
  const { session, refetch } = useAuth();
  const user = session?.user;
  const form = useForm<ProfileDetailsFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });
  const nameError = form.formState.errors.name?.message;
  const rootError = form.formState.errors.root?.message;
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async ({ name }: ProfileDetailsFormValues) => {
    const normalizedName = name.trim();
    const { error } = await authClient.updateUser({ name: normalizedName });

    if (error) {
      form.setError('root', { message: error.message || 'Could not update your profile.' });
      return;
    }

    await refetch();
    form.reset({
      name: normalizedName,
      email: user?.email ?? '',
    });
    toast.success('Profile details updated.');
  };

  return (
    <form
      className="grid content-start gap-5"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Field data-invalid={Boolean(nameError)}>
        <FieldLabel htmlFor="profile-name">Name</FieldLabel>
        <Input
          id="profile-name"
          disabled={isSubmitting}
          aria-invalid={Boolean(nameError)}
          {...form.register('name', {
            required: 'Enter your name.',
            validate: (value) =>
              value.trim().length >= 2 || 'Name must contain at least 2 characters.',
            maxLength: {
              value: 100,
              message: 'Name must not exceed 100 characters.',
            },
          })}
        />
        {nameError && <FieldError errors={[{ message: nameError }]} />}
      </Field>

      <Field>
        <FieldLabel htmlFor="profile-email">Email</FieldLabel>
        <Input
          id="profile-email"
          type="email"
          disabled
          {...form.register('email')}
        />
        <FieldDescription>Email changes require a separate verification flow.</FieldDescription>
      </Field>

      {rootError && <FieldError errors={[{ message: rootError }]} />}

      <div className="flex justify-end border-t pt-5">
        <Button
          type="submit"
          disabled={isSubmitting || !form.formState.isDirty}
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin motion-reduce:animate-none" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {isSubmitting ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
