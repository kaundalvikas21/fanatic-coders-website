'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { BriefcaseBusiness } from 'lucide-react';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WidgetCard } from '@/components/shared/widget-card';
import { createProjectFromServiceRequest } from '@/modules/projects/data/mutations';
import type {
  CreateProjectFromServiceRequestRequest,
  Project,
  ProjectCurrency,
  ServiceRequest,
  UserListItem,
} from '@/types';
import { DEFAULT_PROJECT_CURRENCY, PROJECT_CURRENCY_OPTIONS } from '@/types';

type CreateProjectFormValues = {
  managerMemberId: string;
  name: string;
  description: string;
  budgetAmount: string;
  currency: ProjectCurrency;
  startDate: string;
  endDate: string;
};

type CreateProjectFromServiceRequestFormProps = {
  request: ServiceRequest;
  managers: UserListItem[];
  canAssignManager: boolean;
};

export function CreateProjectFromServiceRequestForm({
  request,
  managers,
  canAssignManager,
}: CreateProjectFromServiceRequestFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const form = useForm<CreateProjectFormValues>({
    defaultValues: {
      managerMemberId: '',
      name: '',
      description: '',
      budgetAmount: '',
      currency: DEFAULT_PROJECT_CURRENCY,
      startDate: '',
      endDate: '',
    },
  });
  const isSubmitting = form.formState.isSubmitting;
  const budgetAmountError = form.formState.errors.budgetAmount?.message;
  const managerMemberIdError = form.formState.errors.managerMemberId?.message;

  async function handleSubmit(values: CreateProjectFormValues) {
    const payload: CreateProjectFromServiceRequestRequest = {};
    const selectedManagerId = values.managerMemberId.trim();
    const name = values.name.trim();
    const description = values.description.trim();
    const budgetAmount = values.budgetAmount.trim();
    const currency = values.currency;
    const startDate = values.startDate.trim();
    const endDate = values.endDate.trim();

    setMessage(null);

    if (canAssignManager && !selectedManagerId) {
      setMessage('Select a project manager.');
      return;
    }

    if (canAssignManager) {
      payload.managerMemberId = selectedManagerId;
    }

    if (name) {
      payload.name = name;
    }

    if (description) {
      payload.description = description;
    }

    if (budgetAmount) {
      const amount = Number(budgetAmount);

      if (!Number.isFinite(amount) || amount < 0) {
        form.setError('budgetAmount', {
          message: 'Enter a valid amount greater than or equal to 0.',
        });
        return;
      }

      payload.budgetAmount = amount;
    }

    if (currency) {
      payload.currency = currency;
    }

    if (startDate) {
      payload.startDate = startDate;
    }

    if (endDate) {
      payload.endDate = endDate;
    }

    try {
      const response = await createProjectFromServiceRequest(request.id, payload);

      if (!response.success || !response.data) {
        setMessage(response.message || 'Could not create project.');
        return;
      }

      const project = response.data as Project;

      router.replace(`/dashboard/projects/${project.id}`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create project.');
    }
  }

  const managerOptions = managers.map((manager) => ({
    value: manager.id,
    label: manager.user.name || manager.user.email,
  }));
  return (
    <WidgetCard
      icon={BriefcaseBusiness}
      title="Create project"
      description="Start delivery from this service request."
      className="overflow-visible"
      titleClassName="text-xl font-semibold"
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="project-name">Name</FieldLabel>
            <Input
              id="project-name"
              placeholder="Project name"
              disabled={isSubmitting}
              {...form.register('name')}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="project-description">Description</FieldLabel>
            <Textarea
              id="project-description"
              placeholder="Scope notes for the delivery team"
              disabled={isSubmitting}
              {...form.register('description')}
            />
          </Field>

          {canAssignManager && (
            <Field>
              <FieldLabel>Project manager</FieldLabel>
              <Controller
                control={form.control}
                name="managerMemberId"
                rules={{
                  validate: (value) =>
                    !canAssignManager || Boolean(value.trim()) || 'Select a project manager.',
                }}
                render={({ field }) => (
                  <SelectField
                    id="project-manager"
                    value={field.value}
                    options={managerOptions}
                    onChange={field.onChange}
                    placeholder="Select manager"
                    ariaLabel="Project manager"
                    disabled={isSubmitting || managerOptions.length === 0}
                  />
                )}
              />
              {managerMemberIdError && <FieldError errors={[{ message: managerMemberIdError }]} />}
            </Field>
          )}

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_7rem]">
            <Field>
              <FieldLabel htmlFor="project-budget">Budget amount</FieldLabel>
              <Input
                id="project-budget"
                type="number"
                min="0"
                step="0.01"
                placeholder="25000"
                disabled={isSubmitting}
                aria-invalid={Boolean(budgetAmountError)}
                {...form.register('budgetAmount', {
                  validate: (value) => {
                    const amount = value.trim();

                    if (!amount) {
                      return true;
                    }

                    const parsedAmount = Number(amount);

                    return (
                      (Number.isFinite(parsedAmount) && parsedAmount >= 0) ||
                      'Enter a valid amount greater than or equal to 0.'
                    );
                  },
                })}
              />
              {budgetAmountError && <FieldError errors={[{ message: budgetAmountError }]} />}
            </Field>
            <Field>
              <FieldLabel>Currency</FieldLabel>
              <Controller
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <SelectField
                    id="project-currency"
                    value={field.value}
                    options={PROJECT_CURRENCY_OPTIONS}
                    onChange={(value) => field.onChange(value as ProjectCurrency)}
                    ariaLabel="Project currency"
                    disabled={isSubmitting}
                  />
                )}
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="project-start">Start date</FieldLabel>
              <Input
                id="project-start"
                type="date"
                disabled={isSubmitting}
                {...form.register('startDate')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="project-end">End date</FieldLabel>
              <Input
                id="project-end"
                type="date"
                disabled={isSubmitting}
                {...form.register('endDate')}
              />
            </Field>
          </div>

          {message && <FieldError errors={[{ message }]} />}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Creating project' : 'Create project'}
          </Button>
        </FieldGroup>
      </form>
    </WidgetCard>
  );
}
