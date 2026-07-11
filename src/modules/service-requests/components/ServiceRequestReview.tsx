import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { Muted, Small } from '@/components/ui/typography';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import type { ServiceInterest } from '@/types';

type ServiceRequestReviewProps = {
  template: ServiceRequestTemplate;
  service: ServiceInterest;
  data: Record<string, unknown>;
};

function formatValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'Not provided';
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : 'Not provided';
  }

  if (typeof value === 'string') {
    return value.trim() || 'Not provided';
  }

  if (value === null || value === undefined) {
    return 'Not provided';
  }

  return JSON.stringify(value);
}

export function ServiceRequestReview({ template, service, data }: ServiceRequestReviewProps) {
  const reviewSteps = template.steps.filter((step) => step.id !== 'review');

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3">
        <div>
          <Small className="block">Request summary</Small>
          <Muted>Review the captured answers before submitting.</Muted>
        </div>
        <Badge variant="secondary">{service.replaceAll('_', ' ')}</Badge>
      </div>

      {reviewSteps.map((step) => (
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
                <dd className="break-words text-sm">{formatValue(data[field.name])}</dd>
              </div>
            ))}
          </dl>
        </WidgetCard>
      ))}
    </div>
  );
}
