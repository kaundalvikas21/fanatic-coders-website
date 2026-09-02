'use client';

import { useState } from 'react';
import { Controller, Watch, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Badge } from '@/components/ui/badge';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { SERVICE_REQUEST_STATUS_LABELS } from '@/modules/service-requests/config/labels';
import { updateServiceRequestById } from '@/modules/service-requests/data/mutations';
import {
  SERVICE_REQUEST_STATUS_BADGE_VARIANTS,
  SERVICE_REQUEST_STATUS_COLORS,
  SERVICE_REQUEST_STATUS_OPTIONS,
  type ServiceRequest,
  type ServiceRequestStatus,
} from '@/types';

type ServiceRequestStatusFormProps = {
  requestId: string;
  initialStatus: ServiceRequestStatus;
};

type ServiceRequestStatusFormValues = {
  status: ServiceRequestStatus;
};

export function ServiceRequestStatusForm({
  requestId,
  initialStatus,
}: ServiceRequestStatusFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<ServiceRequestStatusFormValues>({
    mode: 'onChange',
    defaultValues: {
      status: initialStatus,
    },
  });
  const statusError = form.formState.errors.status?.message;

  function rollbackStatus(status: ServiceRequestStatus, message: string) {
    form.setValue('status', status);
    form.setError('status', {
      message,
    });
    toast.error(message);
  }

  async function updateStatus(value: string, onChange: (value: ServiceRequestStatus) => void) {
    const previousStatus = form.getValues('status');
    const nextStatus = value as ServiceRequestStatus;

    if (nextStatus === previousStatus) {
      return;
    }

    onChange(nextStatus);
    form.clearErrors('status');
    setIsUpdating(true);

    try {
      const result = await updateServiceRequestById(requestId, { status: nextStatus });

      if (!result.success) {
        rollbackStatus(previousStatus, result.message || 'Could not update service request.');
        return;
      }

      const request = result.data as ServiceRequest | null;

      form.setValue('status', request?.status ?? nextStatus);
      toast.success('Service request updated.');
    } catch {
      rollbackStatus(previousStatus, 'Could not update service request.');
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <span className="text-sm text-muted-foreground">Current status</span>
        <Watch
          control={form.control}
          name="status"
          render={(status) => (
            <Badge
              variant={SERVICE_REQUEST_STATUS_BADGE_VARIANTS[status]}
              color={SERVICE_REQUEST_STATUS_COLORS[status]}
            >
              {SERVICE_REQUEST_STATUS_LABELS[status]}
            </Badge>
          )}
        />
      </div>

      <Field>
        <FieldLabel htmlFor="service-request-status">Change status</FieldLabel>
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <SelectField
              id="service-request-status"
              value={field.value}
              options={SERVICE_REQUEST_STATUS_OPTIONS}
              onChange={(value) => updateStatus(value, field.onChange)}
              placeholder="Select status"
              ariaLabel="Change service request status"
              disabled={isUpdating}
              error={statusError}
            />
          )}
        />
        <FieldDescription aria-live="polite">
          {isUpdating ? 'Updating request status…' : 'Changes save automatically.'}
        </FieldDescription>
      </Field>

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
