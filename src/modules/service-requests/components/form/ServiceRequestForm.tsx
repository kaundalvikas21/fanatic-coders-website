'use client';

import { type FormEvent, useState } from 'react';
import Form from '@rjsf/shadcn';
import type { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import {
  CheckCircle2,
  CircleHelp,
  Code2,
  Megaphone,
  Search,
  Smartphone,
  TrendingUp,
  ArrowRight,
  LayoutDashboard,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
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
  isSubmitted: boolean;
};

type AnyTemplateField = ServiceRequestTemplateField;

const defaultService = SERVICE_INTEREST_OPTIONS[0]?.value ?? 'WEB_DEVELOPMENT';

const servicePresentation = {
  WEB_DEVELOPMENT: {
    icon: Code2,
    description: 'Websites, portals, and web applications.',
  },
  MOBILE_APP_DEVELOPMENT: {
    icon: Smartphone,
    description: 'Focused iOS and Android experiences.',
  },
  SEO: {
    icon: Search,
    description: 'Technical, content, and local search improvements.',
  },
  GOOGLE_ADS: {
    icon: Megaphone,
    description: 'Campaign setup, optimization, and reporting.',
  },
  GENERAL_MARKETING: {
    icon: TrendingUp,
    description: 'Strategy, content, and practical growth support.',
  },
  OTHER: {
    icon: CircleHelp,
    description: 'Tell us about work that does not fit these categories.',
  },
} satisfies Record<ServiceInterest, { icon: LucideIcon; description: string }>;

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
    isSubmitted: false,
  }));

  const { service, stepIndex, formData, isSubmitting, isSubmitted } = requestForm;
  const template = getServiceRequestTemplate(service);
  const includesServiceStep = !isServiceLocked;
  const progressSteps = includesServiceStep
    ? [{ id: 'choose-service', title: 'Choose a service' }, ...template.steps]
    : template.steps;
  const isServiceStep = includesServiceStep && stepIndex === 0;
  const templateStepIndex = includesServiceStep ? stepIndex - 1 : stepIndex;
  const activeStep = template.steps[Math.max(templateStepIndex, 0)] ?? template.steps[0];
  const activeFields = activeStep.fields as readonly AnyTemplateField[];
  const activeSchema = getServiceRequestStepJsonSchema(activeFields, activeStep.title);
  const activeUiSchema = getServiceRequestStepUiSchema(activeFields);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === progressSteps.length - 1;
  const questionCount = activeFields.length;
  const estimatedMinutes = Math.max(1, Math.ceil(questionCount / 3));

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
      isSubmitted: false,
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
        isSubmitted: true,
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
      stepIndex: Math.min(current.stepIndex + 1, progressSteps.length - 1),
    }));
  }

  // Submit the read-only review screen using already collected wizard data.
  function handleReviewSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void handleRequestSubmit({ service, data: formData });
  }

  return (
    <WidgetCard
      className="mx-auto w-full max-w-5xl overflow-hidden border-border/70 bg-card/90 py-0"
      contentClassNames="px-0 pt-0"
    >
      {isSubmitted ? (
        <div className="lg:grid lg:min-h-[28rem] lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="border-b border-border/60 bg-muted px-4 py-6 lg:border-r lg:border-b-0">
            <div className="flex items-center gap-3 lg:block">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground lg:mb-4">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <p className="font-semibold">Request complete</p>
                <p className="mt-1 text-xs text-muted-foreground">Submitted successfully.</p>
              </div>
            </div>

            <div className="mt-5 hidden lg:block">
              <div className="h-1.5 overflow-hidden rounded-full bg-border">
                <div className="h-full w-full bg-primary" />
              </div>
              <p className="mt-2 text-xs font-medium text-muted-foreground">100% complete</p>
            </div>
          </aside>

          <section className="mx-auto flex w-full max-w-2xl flex-col justify-center px-5 py-10 sm:px-8">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CheckCircle2 className="size-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Your request is with us</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              We will review the details and contact you with questions or recommended next steps.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-muted/40 px-4 py-3">
              <p className="text-sm font-medium">What happens next</p>
              <ol className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>1. Our team reviews your request.</li>
                <li>2. We reply with the next practical step.</li>
                <li>3. You can continue the conversation from Services.</li>
              </ol>
            </div>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Button asChild>
                <Link href="/dashboard/services">
                  View service requests
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
              >
                <Link href="/dashboard/client">
                  <LayoutDashboard data-icon="inline-start" />
                  Return to dashboard
                </Link>
              </Button>
            </div>
          </section>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)]">
          <ServiceRequestProgress
            steps={progressSteps}
            activeStepIndex={stepIndex}
            onStepSelect={handleStepSelect}
          />

          <FieldGroup className="mx-auto w-full max-w-2xl gap-5 px-4 py-6 sm:px-6 sm:py-8">
            <div
              key={`${service}-${isServiceStep ? 'choose-service' : activeStep.id}-heading`}
              className="animate-in fade-in slide-in-from-bottom-1 border-b border-border/60 pb-4 duration-200 motion-reduce:animate-none"
            >
              <Small className="block font-mono text-primary">
                Step {stepIndex + 1} of {progressSteps.length}
              </Small>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight">
                {isServiceStep ? 'What would you like help with?' : activeStep.title}
              </h2>
              <Muted className="mt-1.5 max-w-2xl leading-relaxed">
                {isServiceStep
                  ? 'Choose the service that best matches your project. You can add details in the next steps.'
                  : activeStep.description}
              </Muted>
              <Muted className="mt-2 block text-xs">
                {isServiceStep
                  ? 'You can change this choice before submitting.'
                  : activeStep.id === 'review'
                    ? 'Check your answers before sending the request.'
                    : `${questionCount} ${questionCount === 1 ? 'question' : 'questions'} · About ${estimatedMinutes} ${estimatedMinutes === 1 ? 'minute' : 'minutes'}`}
              </Muted>
            </div>

            <div
              key={`${service}-${isServiceStep ? 'choose-service' : activeStep.id}-content`}
              className="animate-in fade-in slide-in-from-bottom-1 duration-200 motion-reduce:animate-none"
            >
              {isServiceStep ? (
                <form
                  className="grid gap-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setRequestForm((current) => ({ ...current, stepIndex: 1 }));
                  }}
                >
                  <Field>
                    <div
                      className="grid gap-1.5"
                      role="radiogroup"
                      aria-label="Service"
                    >
                      {SERVICE_INTEREST_OPTIONS.map((option) => {
                        const isSelected = service === option.value;
                        const presentation = servicePresentation[option.value];
                        const ServiceIcon = presentation.icon;

                        return (
                          <label
                            key={option.value}
                            className={`group flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 transition-[border-color,background-color,transform] duration-200 ease-out active:translate-y-px motion-reduce:transition-none ${
                              isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30'
                            }`}
                          >
                            <input
                              className="sr-only"
                              type="radio"
                              name="service"
                              value={option.value}
                              checked={isSelected}
                              disabled={isSubmitting}
                              onChange={(event) => handleServiceChange(event.target.value)}
                            />
                            <span
                              className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-muted-foreground group-hover:text-foreground'
                              }`}
                            >
                              <ServiceIcon className="size-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold">{option.label}</span>
                              <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                {presentation.description}
                              </span>
                            </span>
                            <span
                              aria-hidden="true"
                              className={`size-5 rounded-full border ${
                                isSelected
                                  ? 'border-[6px] border-primary'
                                  : 'border-muted-foreground/60'
                              }`}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </Field>

                  <ServiceRequestFormActions
                    isSubmitting={isSubmitting}
                    isFirstStep
                    onBack={handleBack}
                  />
                </form>
              ) : activeStep.id === 'review' ? (
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
                  className="[&_label]:font-semibold [&_input]:min-h-11 [&_input]:bg-background [&_input]:px-3 [&_textarea]:min-h-28 [&_textarea]:bg-background [&_textarea]:p-3"
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
                  onError={() =>
                    toast.error('Please complete the required fields before continuing.')
                  }
                >
                  <ServiceRequestFormActions
                    isSubmitting={isSubmitting}
                    isFirstStep={isFirstStep}
                    onBack={handleBack}
                  />
                </Form>
              )}
            </div>
          </FieldGroup>
        </div>
      )}
    </WidgetCard>
  );
}
