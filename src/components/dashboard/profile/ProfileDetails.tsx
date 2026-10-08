'use client';

import { useForm } from 'react-hook-form';
import { BriefcaseBusiness, LoaderCircle, Mail, Save, UserRound } from 'lucide-react';
import { toast } from 'sonner';

import { InputWithIcon } from '@/components/shared/forms/InputWithIcon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { authClient } from '@/lib/auth/client';
import { Role } from '@/lib/auth/roles';
import { useAuth } from '@/providers/AuthProvider';
import { usePermissions } from '@/providers/PermissionProvider';

type ProfileDetailsFormValues = {
  name: string;
  email: string;
  designation: string;
  bio: string;
};

export function ProfileDetails() {
  const { session, refetch } = useAuth();
  const { role } = usePermissions();
  // Keep staff profile fields out of client profiles and their updates.
  const isClient = role === Role.CLIENT;
  const user = session?.user;
  const form = useForm<ProfileDetailsFormValues>({
    defaultValues: {
      name: '',
      email: '',
      designation: '',
      bio: '',
    },
    values: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      designation: user?.designation ?? '',
      bio: user?.bio ?? '',
    },
  });
  const nameError = form.formState.errors.name?.message;
  const designationError = form.formState.errors.designation?.message;
  const bioError = form.formState.errors.bio?.message;
  const rootError = form.formState.errors.root?.message;
  const isSubmitting = form.formState.isSubmitting;

  const handleSubmit = async ({ name, designation, bio }: ProfileDetailsFormValues) => {
    const normalizedName = name.trim();
    const normalizedDesignation = designation.trim();
    const normalizedBio = bio.trim();
    const { error } = await authClient.updateUser({
      name: normalizedName,
      ...(isClient
        ? {}
        : {
            designation: normalizedDesignation || null,
            bio: normalizedBio || null,
          }),
    });

    if (error) {
      form.setError('root', { message: error.message || 'Could not update your profile.' });
      return;
    }

    await refetch();
    form.reset({
      name: normalizedName,
      email: user?.email ?? '',
      designation: normalizedDesignation,
      bio: normalizedBio,
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
        <InputWithIcon
          icon={UserRound}
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
        <InputWithIcon
          icon={Mail}
          id="profile-email"
          type="email"
          disabled
          {...form.register('email')}
        />
        <FieldDescription>Email changes require a separate verification flow.</FieldDescription>
      </Field>

      {!isClient && (
        <>
          <Field data-invalid={Boolean(designationError)}>
            <FieldLabel htmlFor="profile-designation">Designation</FieldLabel>
            <InputWithIcon
              icon={BriefcaseBusiness}
              id="profile-designation"
              disabled={isSubmitting}
              aria-invalid={Boolean(designationError)}
              {...form.register('designation', {
                maxLength: { value: 191, message: 'Designation must not exceed 191 characters.' },
              })}
            />
            {designationError && <FieldError errors={[{ message: designationError }]} />}
          </Field>

          <Field data-invalid={Boolean(bioError)}>
            <FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
            <Textarea
              id="profile-bio"
              rows={5}
              disabled={isSubmitting}
              aria-invalid={Boolean(bioError)}
              {...form.register('bio', {
                maxLength: { value: 5000, message: 'Bio must not exceed 5000 characters.' },
              })}
            />
            {bioError && <FieldError errors={[{ message: bioError }]} />}
          </Field>
        </>
      )}

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
