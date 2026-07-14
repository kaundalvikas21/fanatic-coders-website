'use client';

import { Controller, Watch, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  LEAD_STATUS_BADGE_VARIANTS,
  LEAD_STATUS_OPTIONS,
  type Lead,
  type LeadStatus,
} from '@/types';
import { updateLeadById } from '../../data/mutations';

type LeadStatusFormProps = {
  leadId: string;
  initialStatus: LeadStatus;
};

type LeadStatusFormValues = {
  status: LeadStatus;
};

function getStatusOptionClassName(status: LeadStatus) {
  const variant = LEAD_STATUS_BADGE_VARIANTS[status];

  return cn(
    'font-medium',
    variant === 'default' && 'text-primary focus:text-primary',
    variant === 'secondary' && 'text-secondary-foreground focus:text-secondary-foreground',
    variant === 'outline' && 'text-foreground focus:text-foreground',
  );
}

function getStatusLabel(status: LeadStatus) {
  return LEAD_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

export function LeadStatusForm({ leadId, initialStatus }: LeadStatusFormProps) {
  const form = useForm<LeadStatusFormValues>({
    mode: 'onChange',
    defaultValues: {
      status: initialStatus,
    },
  });
  const statusError = form.formState.errors.status?.message;
  const statusOptions = LEAD_STATUS_OPTIONS.map((option) => ({
    ...option,
    className: getStatusOptionClassName(option.value),
  }));

  function rollbackStatus(status: LeadStatus, message: string) {
    form.setValue('status', status);
    form.setError('status', {
      message,
    });
    toast.error(message);
  }

  async function updateStatus(value: string, onChange: (value: LeadStatus) => void) {
    const previousStatus = form.getValues('status');
    const nextStatus = value as LeadStatus;

    if (nextStatus === previousStatus) {
      return;
    }

    onChange(nextStatus);
    form.clearErrors('status');

    try {
      const result = await updateLeadById(leadId, { status: nextStatus });

      if (!result.success) {
        rollbackStatus(previousStatus, result.message || 'Could not update lead.');
        return;
      }

      const lead = result.data as Lead | null;

      form.setValue('status', lead?.status ?? nextStatus);
      toast.success('Lead updated.');
    } catch {
      rollbackStatus(previousStatus, 'Could not update lead.');
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Watch
        control={form.control}
        name="status"
        render={(status) => {
          return (
            <Badge
              variant={LEAD_STATUS_BADGE_VARIANTS[status]}
              className="w-fit"
            >
              {getStatusLabel(status)}
            </Badge>
          );
        }}
      />
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <SelectField
            id="lead-status"
            value={field.value}
            options={statusOptions}
            onChange={(value) => updateStatus(value, field.onChange)}
            placeholder="Select status"
            ariaLabel="Status"
          />
        )}
      />
      {statusError && (
        <p
          className="text-sm text-destructive"
          aria-live="polite"
        >
          {statusError}
        </p>
      )}
    </div>
  );
}
