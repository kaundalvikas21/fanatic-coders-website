'use client';

import { useRouter } from 'next/navigation';
import { Controller, Watch, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Badge } from '@/components/ui/badge';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { updateProjectById } from '@/modules/projects/data/mutations';
import {
  PROJECT_STATUS_BADGE_VARIANTS,
  PROJECT_STATUS_COLORS,
  PROJECT_STATUS_OPTIONS,
  type Project,
  type ProjectStatus,
} from '@/types';

type ProjectStatusFormProps = {
  projectId: string;
  initialStatus: ProjectStatus;
};

type ProjectStatusFormValues = {
  status: ProjectStatus;
};

export function ProjectStatusForm({ projectId, initialStatus }: ProjectStatusFormProps) {
  const router = useRouter();
  const form = useForm<ProjectStatusFormValues>({
    mode: 'onChange',
    defaultValues: {
      status: initialStatus,
    },
  });
  const statusError = form.formState.errors.status?.message;

  function rollbackStatus(status: ProjectStatus, message: string) {
    form.setValue('status', status);
    form.setError('status', { message });
    toast.error(message);
  }

  async function updateStatus(value: string, onChange: (value: ProjectStatus) => void) {
    const previousStatus = form.getValues('status');
    const nextStatus = value as ProjectStatus;

    if (nextStatus === previousStatus) {
      return;
    }

    onChange(nextStatus);
    form.clearErrors('status');

    try {
      // Persist the delivery stage so project views and dashboards stay aligned.
      const result = await updateProjectById(projectId, { status: nextStatus });

      if (!result.success) {
        rollbackStatus(previousStatus, result.message || 'Could not update project status.');
        return;
      }

      const project = result.data as Project | null;

      form.setValue('status', project?.status ?? nextStatus);
      toast.success('Project status updated.');
      router.refresh();
    } catch {
      rollbackStatus(previousStatus, 'Could not update project status.');
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Watch
        control={form.control}
        name="status"
        render={(status) => (
          <Badge
            variant={PROJECT_STATUS_BADGE_VARIANTS[status]}
            color={PROJECT_STATUS_COLORS[status]}
            className="w-fit"
          >
            {PROJECT_STATUS_LABELS[status]}
          </Badge>
        )}
      />
      <Controller
        control={form.control}
        name="status"
        render={({ field }) => (
          <SelectField
            id="project-status"
            value={field.value}
            options={PROJECT_STATUS_OPTIONS}
            onChange={(value) => updateStatus(value, field.onChange)}
            placeholder="Select status"
            ariaLabel="Project status"
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
