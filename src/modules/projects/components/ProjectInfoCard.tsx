import { Badge } from '@/components/ui/badge';
import { WidgetCard } from '@/components/shared/widget-card';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';
import { PROJECT_STATUS_BADGE_VARIANTS, PROJECT_STATUS_COLORS, type Project } from '@/types';

type ProjectInfoCardProps = {
  project: Project;
};

export function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <WidgetCard
      title="Project details"
      titleClassName="text-xl font-semibold"
    >
      <dl className="grid gap-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Status</dt>
          <dd>
            <Badge
              variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}
              color={PROJECT_STATUS_COLORS[project.status]}
            >
              {PROJECT_STATUS_LABELS[project.status]}
            </Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Service</dt>
          <dd className="text-right font-medium">
            {SERVICE_REQUEST_SERVICE_LABELS[project.service] ?? 'Not specified'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Budget</dt>
          <dd className="text-right font-medium">
            {formatMoney(project.budgetAmount, project.currency)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Start</dt>
          <dd className="text-right font-medium">
            {formatDate(project.startDate ?? project.createdAt)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">End</dt>
          <dd className="text-right font-medium">{formatDate(project.endDate ?? undefined)}</dd>
        </div>
      </dl>
    </WidgetCard>
  );
}
