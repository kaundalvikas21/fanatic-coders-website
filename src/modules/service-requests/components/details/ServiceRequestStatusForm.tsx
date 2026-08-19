'use client';

import { Controller, Watch, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Badge } from '@/components/ui/badge';
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
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Watch
        control={form.control}
        name="status"
        render={(status) => (
          <Badge
            variant={SERVICE_REQUEST_STATUS_BADGE_VARIANTS[status]}
            color={SERVICE_REQUEST_STATUS_COLORS[status]}
            className="w-fit"
          >
            {SERVICE_REQUEST_STATUS_LABELS[status]}
          </Badge>
        )}
      />
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
