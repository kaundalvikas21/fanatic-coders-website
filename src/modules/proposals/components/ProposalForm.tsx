'use client';

import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { FilePenLine, Send, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  createServiceRequestProposal,
  deleteServiceRequestProposal,
  updateServiceRequestProposal,
} from '@/modules/proposals/data/mutations';
import {
  DEFAULT_PROJECT_CURRENCY,
  PROJECT_CURRENCY_OPTIONS,
  type ProjectCurrency,
  type Proposal,
} from '@/types';

type ProposalFormValues = {
  description: string;
  amount: string;
  currency: ProjectCurrency;
};

type ProposalFormProps = {
  serviceRequestId: string;
  proposal: Proposal | null;
  canDelete: boolean;
  onProposalChange: (proposal: Proposal | null) => void;
};

export function ProposalForm({
  serviceRequestId,
  proposal,
  canDelete,
  onProposalChange,
}: ProposalFormProps) {
  const router = useRouter();
  const form = useForm<ProposalFormValues>({
    defaultValues: {
      description: proposal?.description ?? '',
      amount: proposal ? String(proposal.amount) : '',
      currency: proposal?.currency ?? DEFAULT_PROJECT_CURRENCY,
    },
  });
  const amountError = form.formState.errors.amount?.message;
  const descriptionError = form.formState.errors.description?.message;

  async function saveProposal(values: ProposalFormValues, send: boolean) {
    const payload = {
      description: values.description.trim(),
      amount: Number(values.amount),
      currency: values.currency ?? DEFAULT_PROJECT_CURRENCY,
      ...(send ? { status: 'SENT' as const } : {}),
    };

    const response = proposal
      ? await updateServiceRequestProposal(serviceRequestId, payload)
      : await createServiceRequestProposal(serviceRequestId, payload);

    if (response.success && response.data) {
      const nextProposal = response.data as Proposal;

      onProposalChange(nextProposal);
      form.reset({
        description: nextProposal.description,
        amount: String(nextProposal.amount),
        currency: nextProposal.currency,
      });
      toast.success(send ? 'Proposal sent.' : 'Proposal saved.');
      router.refresh();
      return;
    }

    toast.error(response.message || 'Could not save proposal.');
  }

  async function removeProposal() {
    if (!window.confirm('Delete this proposal? This action cannot be undone.')) {
      return;
    }

    const response = await deleteServiceRequestProposal(serviceRequestId);

    if (response.success) {
      onProposalChange(null);
      form.reset({
        description: '',
        amount: '',
        currency: DEFAULT_PROJECT_CURRENCY,
      });
      toast.success('Proposal deleted.');
      router.refresh();
      return;
    }

    toast.error(response.message || 'Could not delete proposal.');
  }

  return (
    <WidgetCard
      icon={FilePenLine}
      title={proposal ? 'Manage proposal' : 'Prepare proposal'}
      description="Set the scope and fee, then save a draft or send it to the client."
      className="overflow-visible"
      titleClassName="text-xl font-semibold"
    >
      <form
        onSubmit={form.handleSubmit((values) => saveProposal(values, false))}
        className="grid gap-5"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="proposal-description">Scope and deliverables</FieldLabel>
            <Textarea
              id="proposal-description"
              rows={6}
              placeholder="Describe the agreed work, deliverables, and commercial terms."
              aria-invalid={Boolean(descriptionError)}
              {...form.register('description', {
                required: 'Enter the proposal scope.',
                validate: (value) => Boolean(value.trim()) || 'Enter the proposal scope.',
                maxLength: {
                  value: 10000,
                  message: 'Keep the proposal under 10,000 characters.',
                },
              })}
            />
            {descriptionError && <FieldError errors={[{ message: descriptionError }]} />}
          </Field>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_8rem]">
            <Field>
              <FieldLabel htmlFor="proposal-amount">Amount</FieldLabel>
              <Input
                id="proposal-amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="5000"
                aria-invalid={Boolean(amountError)}
                {...form.register('amount', {
                  required: 'Enter the proposal amount.',
                  validate: {
                    positive: (value) => {
                      const amount = Number(value);
                      return (
                        (Number.isFinite(amount) && amount > 0) || 'Enter an amount greater than 0.'
                      );
                    },
                    decimalPlaces: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) || 'Use no more than 2 decimal places.',
                  },
                })}
              />
              {amountError && <FieldError errors={[{ message: amountError }]} />}
            </Field>

            <Field>
              <FieldLabel>Currency</FieldLabel>
              <Controller
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <SelectField
                    id="proposal-currency"
                    value={field.value}
                    options={PROJECT_CURRENCY_OPTIONS}
                    onChange={(value) => field.onChange(value as ProjectCurrency)}
                    ariaLabel="Proposal currency"
                  />
                )}
              />
            </Field>
          </div>
        </FieldGroup>

        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            variant="outline"
          >
            {proposal ? 'Save draft' : 'Create draft'}
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit((values) => saveProposal(values, true))}
          >
            <Send data-icon="inline-start" />
            Send proposal
          </Button>
          {proposal && canDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={removeProposal}
              className="sm:ml-auto"
            >
              <Trash2 data-icon="inline-start" />
              Delete
            </Button>
          )}
        </div>
      </form>
    </WidgetCard>
  );
}
