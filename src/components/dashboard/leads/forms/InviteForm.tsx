'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { inviteMember } from '@/lib/data/invitations/mutations';

type InviteFormProps = {
  leadEmail: string;
};

type InviteFormValues = {
  email: string;
  role: 'CLIENT';
  resend: boolean;
};

export function InviteForm({ leadEmail }: InviteFormProps) {
  const form = useForm<InviteFormValues>({
    defaultValues: {
      email: leadEmail,
      role: 'CLIENT',
      resend: true,
    },
  });

  async function sendInvite(values: InviteFormValues) {
    const result = await inviteMember({
      email: values.email.trim().toLowerCase(),
      role: values.role,
      resend: values.resend,
    });

    if (!result.success) {
      toast.error(result.message || 'Could not send invite.');
      return;
    }

    toast.success('Client invite sent.');
  }

  return (
    <form onSubmit={form.handleSubmit(sendInvite)}>
      <Button
        type="submit"
        className="w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? 'Sending invite' : 'Send Invite'}
      </Button>
    </form>
  );
}
