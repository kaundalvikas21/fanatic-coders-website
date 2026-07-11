'use client';

import { useMemo, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Form from '@rjsf/shadcn';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import { SelectField } from '@/components/shared/forms/SelectField';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
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
import { SERVICE_INTEREST_OPTIONS, SERVICE_INTERESTS, type ServiceInterest } from '@/types';
import { ServiceRequestProgress } from './ServiceRequestProgress';
import { ServiceRequestReview } from './ServiceRequestReview';
import { ServiceRequestStepCard } from './ServiceRequestStepCard';
import { ServiceRequestObjectFieldTemplate } from './rjsf-templates';

type ServiceRequestFormValues = {
  service: ServiceInterest;
  data: Record<string, unknown>;
};

type AnyTemplateField = ServiceRequestTemplateField;
type JsonObject = Record<string, unknown>;

const defaultService = SERVICE_INTEREST_OPTIONS[0]?.value ?? 'WEB_DEVELOPMENT';

function getInitialService(value: string | null): ServiceInterest {
  return SERVICE_INTERESTS.includes(value as ServiceInterest)
    ? (value as ServiceInterest)
    : defaultService;
}

function mergeData(current: JsonObject, next: unknown) {
  if (!next || typeof next !== 'object' || Array.isArray(next)) {
    return current;
  }

  return {
    ...current,
    ...(next as JsonObject),
  };
}

export function ServiceRequestForm() {
  const searchParams = useSearchParams();
  const initialService = getInitialService(searchParams.get('serviceInterest'));
  const [service, setService] = useState<ServiceInterest>(initialService);
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<JsonObject>(() =>
    getServiceRequestDefaultValues(initialService),
  );
  const [isPending, startTransition] = useTransition();
  const template = useMemo(() => getServiceRequestTemplate(service), [service]);
  const activeStep = template.steps[stepIndex] ?? template.steps[0];
  const activeFields = activeStep.fields as readonly AnyTemplateField[];
  const activeSchema = useMemo(
    () => getServiceRequestStepJsonSchema(activeFields, activeStep.title),
    [activeFields, activeStep.title],
  );
  const activeUiSchema = useMemo(() => getServiceRequestStepUiSchema(activeFields), [activeFields]);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === template.steps.length - 1;

  function goBack() {
    setStepIndex((current) => Math.max(current - 1, 0));
  }

  function updateService(value: string) {
    const nextService = value as ServiceInterest;

    setService(nextService);
    setStepIndex(0);
    setFormData(getServiceRequestDefaultValues(nextService));
  }

  function goToStep(index: number) {
    if (index <= stepIndex) {
      setStepIndex(index);
      return;
    }

    toast.error('Please continue through each step before jumping ahead.');
  }

  function submit(values: ServiceRequestFormValues) {
    const schema = getCreateServiceRequestFormSchema(values.service);
    const result = schema.safeParse(values);

    if (!result.success) {
      toast.error('Please complete the required fields before submitting.');
      setStepIndex(0);
      return;
    }

    startTransition(async () => {
      const response = await createServiceRequest({
        service: result.data.service,
        data: result.data.data,
      });

      if (!response.success) {
        toast.error(response.message || 'Could not create service request.');
        return;
      }

      toast.success('Service request created.');
      setStepIndex(0);
      setFormData(getServiceRequestDefaultValues(service));
    });
  }

  function handleStepSubmit(event: IChangeEvent<JsonObject>) {
    const nextData = mergeData(formData, event.formData);

    setFormData(nextData);

    if (isLastStep) {
      submit({ service, data: nextData });
      return;
    }

    setStepIndex((current) => Math.min(current + 1, template.steps.length - 1));
  }

  return (
    <WidgetCard
      title="New service request"
      description={template.description}
    >
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
              onSelect={() => goToStep(index)}
            />
          ))}
        </div>

        <FieldGroup>
          {stepIndex === 0 && (
            <Field>
              <FieldLabel>Service</FieldLabel>
              <SelectField
                id="service-request-service"
                value={service}
                options={SERVICE_INTEREST_OPTIONS}
                onChange={updateService}
                placeholder="Select service"
                disabled={isPending}
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
              onSubmit={(event) => {
                event.preventDefault();
                submit({ service, data: formData });
              }}
            >
              <ServiceRequestReview
                template={template}
                service={service}
                data={formData}
              />

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending || isFirstStep}
                  onClick={goBack}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2
                      data-icon="inline-start"
                      className="animate-spin"
                    />
                  ) : (
                    <Send data-icon="inline-start" />
                  )}
                  {isPending ? 'Creating' : 'Create request'}
                </Button>
              </div>
            </form>
          ) : (
            <Form
              schema={activeSchema}
              uiSchema={activeUiSchema}
              validator={validator}
              formData={formData}
              disabled={isPending}
              noHtml5Validate
              showErrorList={false}
              templates={{ ObjectFieldTemplate: ServiceRequestObjectFieldTemplate }}
              onChange={(event) => setFormData(mergeData(formData, event.formData))}
              onSubmit={handleStepSubmit}
              onError={() => toast.error('Please complete the required fields before continuing.')}
            >
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending || isFirstStep}
                  onClick={goBack}
                >
                  <ChevronLeft data-icon="inline-start" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                >
                  Continue
                  <ChevronRight data-icon="inline-end" />
                </Button>
              </div>
            </Form>
          )}
        </FieldGroup>
      </div>
    </WidgetCard>
  );
}
