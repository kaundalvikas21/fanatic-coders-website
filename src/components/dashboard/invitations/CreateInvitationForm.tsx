'use client';

import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { useSheet } from '@/components/shared/action-sheet';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SheetFooter } from '@/components/ui/sheet';
import { useFcopOrganizationInvitation } from '@/lib/auth/organization-client';
import { Role, USER_ROLE_OPTIONS, USER_ROLES } from '@/lib/auth/roles';

type InvitationFormValues = {
  email: string;
  role: (typeof USER_ROLES)[number];
};

export default function InvitationForm() {
  const router = useRouter();
  const { close } = useSheet();
  const form = useForm<InvitationFormValues>({
    defaultValues: {
      email: '',
      role: Role.MEMBER,
    },
  });
  const { inviteMember, isPending: organizationPending } = useFcopOrganizationInvitation();

  const role = useWatch({
    control: form.control,
    name: 'role',
  });
  const isSubmitting = form.formState.isSubmitting;

  async function createInvitation(values: InvitationFormValues) {
    try {
      const result = await inviteMember({
        email: values.email.trim().toLowerCase(),
        role: values.role,
        resend: true,
      });

      if (result.error) {
        toast.error(result.error.message ?? 'Could not create invitation.');
        return;
      }

      toast.success('Invitation sent.');
      router.refresh();
      close();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not create invitation.');
    }
  }

  return (
    <form
      className="flex flex-1 flex-col"
      onSubmit={form.handleSubmit(createInvitation, () => toast.error('Email is required.'))}
    >
      <FieldGroup className="gap-4 px-4">
        <Field>
          <FieldLabel htmlFor="invitation-email">Email</FieldLabel>
          <Input
            id="invitation-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            {...form.register('email', { required: true })}
          />
        </Field>

        <Field>
          <FieldLabel>Role</FieldLabel>
          <SelectField
            id="invitation-role"
            value={role}
            options={USER_ROLE_OPTIONS}
            onChange={(value) =>
              form.setValue('role', value as InvitationFormValues['role'], {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
            ariaLabel="Invitation role"
            disabled={isSubmitting}
          />
        </Field>
      </FieldGroup>

      <SheetFooter>
        <Button
          type="submit"
          disabled={isSubmitting || organizationPending}
        >
          {isSubmitting ? 'Sending invitation' : 'Send invitation'}
        </Button>
      </SheetFooter>
    </form>
  );
}
