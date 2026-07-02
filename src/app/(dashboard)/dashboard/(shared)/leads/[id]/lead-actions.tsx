'use client';

import { Controller, Watch, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LEAD_STATUS_BADGE_VARIANTS, LEAD_STATUS_OPTIONS, type LeadStatus } from '@/types';
import { updateLeadAction } from './actions';

type LeadActionsProps = {
  leadId: string;
  initialStatus: LeadStatus;
};

type LeadActionsFormValues = {
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

export function LeadActions({ leadId, initialStatus }: LeadActionsProps) {
  const form = useForm<LeadActionsFormValues>({
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
      const result = await updateLeadAction(leadId, { status: nextStatus });

      if (!result.success) {
        rollbackStatus(previousStatus, result.message);
        return;
      }

      form.setValue('status', result.data?.status ?? nextStatus);
      toast.success('Lead updated.');
    } catch {
      rollbackStatus(previousStatus, 'Could not update lead.');
    }
  }

  return (
    <div className="flex h-full flex-col gap-6">
      <WidgetCard
        title="Invite"
        description="Send access when the lead is ready."
        titleClassName="text-xl font-semibold"
        descriptionClassName="text-sm"
      >
        <Button
          className="w-full"
          disabled
        >
          Send Invite
        </Button>
      </WidgetCard>

      <WidgetCard
        title="Status"
        description="Update the lead stage."
        className="overflow-visible"
        titleClassName="text-xl font-semibold"
        descriptionClassName="text-sm"
      >
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
      </WidgetCard>
    </div>
  );
}
