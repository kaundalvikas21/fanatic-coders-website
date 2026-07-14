import { WidgetCard } from '@/components/shared/widget-card';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import { formatServiceRequestFieldValue } from '@/modules/service-requests/utils/field-value';

type ServiceRequestSummarySectionsProps = {
  template: ServiceRequestTemplate;
  data: Record<string, unknown>;
};

export function ServiceRequestSummarySections({
  template,
  data,
}: ServiceRequestSummarySectionsProps) {
  const summarySteps = template.steps.filter((step) => step.id !== 'review');

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
