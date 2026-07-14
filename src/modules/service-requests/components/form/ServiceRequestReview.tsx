import { Badge } from '@/components/ui/badge';
import { Muted, Small } from '@/components/ui/typography';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import type { ServiceInterest } from '@/types';
import { ServiceRequestSummarySections } from '../details/ServiceRequestSummarySections';

type ServiceRequestReviewProps = {
  template: ServiceRequestTemplate;
  service: ServiceInterest;
  data: Record<string, unknown>;
};

export function ServiceRequestReview({ template, service, data }: ServiceRequestReviewProps) {
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3">
        <div>
          <Small className="block">Request summary</Small>
          <Muted>Review the captured answers before submitting.</Muted>
        </div>
        <Badge variant="secondary">{service.replaceAll('_', ' ')}</Badge>
      </div>

      <ServiceRequestSummarySections
        template={template}
        data={data}
      />
    </div>
  );
}
