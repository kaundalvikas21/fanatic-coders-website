'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { inviteMember } from '@/lib/data/invitations/mutations';
import type { ServiceInterest } from '@/types';

type LeadInviteFormProps = {
  leadEmail: string;
  serviceInterest: ServiceInterest;
};

type LeadInviteFormValues = {
  email: string;
  role: 'CLIENT';
  resend: boolean;
};

export function LeadInviteForm({ leadEmail, serviceInterest }: LeadInviteFormProps) {
  const form = useForm<LeadInviteFormValues>({
    defaultValues: {
      email: leadEmail,
      role: 'CLIENT',
      resend: true,
    },
  });

  async function sendInvite(values: LeadInviteFormValues) {
    const result = await inviteMember({
      email: values.email.trim().toLowerCase(),
      role: values.role,
      serviceInterest,
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
