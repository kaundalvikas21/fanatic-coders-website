import { ClipboardList } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import { formatServiceRequestFieldValue } from '@/modules/service-requests/utils/field-value';

type ServiceRequestSummarySectionsProps = {
  template: ServiceRequestTemplate;
  data: Record<string, unknown>;
  variant?: 'cards' | 'detail';
};

export function ServiceRequestSummarySections({
  template,
  data,
  variant = 'cards',
}: ServiceRequestSummarySectionsProps) {
  const summarySteps = template.steps.filter((step) => step.id !== 'review');

  if (variant === 'cards') {
    return (
      <>
        {summarySteps.map((step) => (
          <WidgetCard
            key={step.id}
            title={step.title}
            description={step.description}
            contentClassNames="p-0"
          >
            <dl className="grid gap-px bg-border sm:grid-cols-2">
              {step.fields.map((field) => (
                <div
                  key={field.name}
                  className="grid gap-1 bg-background px-4 py-3"
                >
                  <dt className="text-xs font-medium uppercase text-muted-foreground">
                    {field.label}
                  </dt>
                  <dd className="break-words text-sm">
                    {formatServiceRequestFieldValue(data[field.name])}
                  </dd>
                </div>
              ))}
            </dl>
          </WidgetCard>
        ))}
      </>
    );
  }

  const content = (
    <div className="grid gap-6">
      {summarySteps.map((step) => (
        <section
          key={step.id}
          className="grid gap-4 border-t border-border/70 pt-6 first:border-t-0 first:pt-0"
        >
          <div>
            <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 max-w-[70ch] text-sm leading-5 text-muted-foreground">
              {step.description}
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {step.fields.map((field) => (
              <div
                key={field.name}
                className="min-w-0"
              >
                <dt className="text-xs font-medium text-muted-foreground">{field.label}</dt>
                <dd className="mt-1 break-words text-sm leading-5 text-foreground">
                  {formatServiceRequestFieldValue(data[field.name])}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );

  return (
    <WidgetCard
      icon={ClipboardList}
      title="Submitted requirements"
      description="Scope and requirements provided with this request."
    >
      {content}
    </WidgetCard>
  );
}
