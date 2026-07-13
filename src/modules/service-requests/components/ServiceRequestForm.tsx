'use client';

import { type FormEvent, useState } from 'react';
import Form from '@rjsf/shadcn';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Muted, Small } from '@/components/ui/typography';
import { createServiceRequest } from '@/modules/service-requests/data/mutations';
import {
  getServiceRequestDefaultValues,
  getServiceRequestTemplate,
  type ServiceRequestTemplateField,
} from '@/modules/service-requests/config/templates';
import { getServiceRequestStepJsonSchema } from '@/modules/service-requests/schemas/rjsf';
import { getServiceRequestStepUiSchema } from '@/modules/service-requests/schemas/ui-schema';
import { getCreateServiceRequestFormSchema } from '@/modules/service-requests/schemas/zod';
import {
  mergeServiceRequestFormData,
  type ServiceRequestFormData,
} from '@/modules/service-requests/utils/form-data';
import { SERVICE_INTEREST_OPTIONS, type ServiceInterest } from '@/types';
import { ServiceRequestFormActions } from './ServiceRequestFormActions';
import { ServiceRequestProgress } from './ServiceRequestProgress';
import { ServiceRequestReview } from './ServiceRequestReview';
import { ServiceRequestStepCard } from './ServiceRequestStepCard';
import { ServiceRequestObjectFieldTemplate } from './rjsf-templates';

type ServiceRequestFormValues = {
  service: ServiceInterest;
  data: Record<string, unknown>;
};

type ServiceRequestFormProps = {
  initialService?: ServiceInterest;
  lockService?: boolean;
};

type ServiceRequestFormState = {
  service: ServiceInterest;
  stepIndex: number;
  formData: ServiceRequestFormData;
  isSubmitting: boolean;
};

type AnyTemplateField = ServiceRequestTemplateField;

const defaultService = SERVICE_INTEREST_OPTIONS[0]?.value ?? 'WEB_DEVELOPMENT';

export function ServiceRequestForm({
  initialService = defaultService,
  lockService: isServiceLocked = false,
}: ServiceRequestFormProps) {
  // Keep wizard state together because service changes reset step and data together.
  const [requestForm, setRequestForm] = useState<ServiceRequestFormState>(() => ({
    service: initialService,
    stepIndex: 0,
    formData: getServiceRequestDefaultValues(initialService),
    isSubmitting: false,
  }));

  const { service, stepIndex, formData, isSubmitting } = requestForm;
  const template = getServiceRequestTemplate(service);
  const activeStep = template.steps[stepIndex] ?? template.steps[0];
  const activeFields = activeStep.fields as readonly AnyTemplateField[];
  const activeSchema = getServiceRequestStepJsonSchema(activeFields, activeStep.title);
  const activeUiSchema = getServiceRequestStepUiSchema(activeFields);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === template.steps.length - 1;

  // Move to the previous wizard step without going below the first step.
  function handleBack() {
    setRequestForm((current) => ({
      ...current,
      stepIndex: Math.max(current.stepIndex - 1, 0),
    }));
  }

  // Reset wizard answers when client picks a different service template.
  function handleServiceChange(value: string) {
    const nextService = value as ServiceInterest;

    setRequestForm((current) => ({
      ...current,
      service: nextService,
      stepIndex: 0,
      formData: getServiceRequestDefaultValues(nextService),
    }));
  }

  // Allow revisiting completed/current steps, but block skipping ahead.
  function handleStepSelect(nextStepIndex: number) {
    if (nextStepIndex > stepIndex) {
      toast.error('Please continue through each step before jumping ahead.');
      return;
    }

    setRequestForm((current) => ({
      ...current,
      stepIndex: nextStepIndex,
    }));
  }

  // Keep partial answers from the current RJSF step in the full request payload.
  function handleFormChange(event: IChangeEvent<ServiceRequestFormData>) {
    setRequestForm((current) => ({
      ...current,
      formData: mergeServiceRequestFormData(current.formData, event.formData),
    }));
  }

  // Validate the final payload before creating the service request.
  async function handleRequestSubmit(values: ServiceRequestFormValues) {
    const schema = getCreateServiceRequestFormSchema(values.service);
    const result = schema.safeParse(values);

    if (!result.success) {
      toast.error('Please complete the required fields before submitting.');
      setRequestForm((current) => ({
        ...current,
        stepIndex: 0,
      }));
      return;
    }

    setRequestForm((current) => ({
      ...current,
      isSubmitting: true,
    }));

    try {
      const response = await createServiceRequest({
        service: result.data.service,
        data: result.data.data,
      });

      if (!response.success) {
        toast.error(response.message || 'Could not create service request.');
        return;
      }

      toast.success('Service request created.');
      setRequestForm((current) => ({
        ...current,
        stepIndex: 0,
        formData: getServiceRequestDefaultValues(current.service),
      }));
    } finally {
      setRequestForm((current) => ({
        ...current,
        isSubmitting: false,
      }));
    }
  }

  // Save current step data, then either continue or submit from the last step.
  function handleStepSubmit(event: IChangeEvent<ServiceRequestFormData>) {
    const nextData = mergeServiceRequestFormData(formData, event.formData);

    setRequestForm((current) => ({
      ...current,
      formData: nextData,
    }));

    if (isLastStep) {
      void handleRequestSubmit({ service, data: nextData });
      return;
    }

    setRequestForm((current) => ({
      ...current,
      stepIndex: Math.min(current.stepIndex + 1, template.steps.length - 1),
    }));
  }

  // Submit the read-only review screen using already collected wizard data.
  function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleRequestSubmit({ service, data: formData });
  }

  return (
    <WidgetCard>
      <div className="grid gap-6">
        <ServiceRequestProgress
          steps={template.steps}
          activeStepIndex={stepIndex}
        />

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {template.steps.map((step, index) => (
            <ServiceRequestStepCard
              key={step.id}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              isActive={index === stepIndex}
              isCompleted={index < stepIndex}
              onSelect={() => handleStepSelect(index)}
            />
          ))}
        </div>

        <FieldGroup>
          {stepIndex === 0 && !isServiceLocked && (
            <Field>
              <FieldLabel>Service</FieldLabel>
              <SelectField
                id="service-request-service"
                value={service}
                options={SERVICE_INTEREST_OPTIONS}
                onChange={handleServiceChange}
                placeholder="Select service"
                disabled={isSubmitting}
              />
            </Field>
          )}

          <div>
            <Small className="block">{activeStep.title}</Small>
            <Muted className="mt-1">{activeStep.description}</Muted>
          </div>

          {activeStep.id === 'review' ? (
            <form
              className="grid gap-5"
              onSubmit={handleReviewSubmit}
            >
              <ServiceRequestReview
                template={template}
                service={service}
                data={formData}
              />

              <ServiceRequestFormActions
                isSubmitting={isSubmitting}
                isFirstStep={isFirstStep}
                isReviewStep
                onBack={handleBack}
              />
            </form>
          ) : (
            <Form
              schema={activeSchema}
              uiSchema={activeUiSchema}
              validator={validator}
              formData={formData}
              disabled={isSubmitting}
              noHtml5Validate
              showErrorList={false}
              templates={{ ObjectFieldTemplate: ServiceRequestObjectFieldTemplate }}
              onChange={handleFormChange}
              onSubmit={handleStepSubmit}
              onError={() => toast.error('Please complete the required fields before continuing.')}
            >
              <ServiceRequestFormActions
                isSubmitting={isSubmitting}
                isFirstStep={isFirstStep}
                onBack={handleBack}
              />
            </Form>
          )}
        </FieldGroup>
      </div>
    </WidgetCard>
  );
}
