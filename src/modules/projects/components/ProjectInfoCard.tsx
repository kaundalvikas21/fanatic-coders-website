import { FolderKanban } from 'lucide-react';
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
      icon={FolderKanban}
      title="Project details"
      description="Delivery scope, budget, and schedule."
      actionSlot={
        <Badge
          variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}
          color={PROJECT_STATUS_COLORS[project.status]}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
      }
    >
      <dl className="divide-y divide-border/70 text-sm">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start gap-4 pb-3">
          <dt className="text-muted-foreground">Service</dt>
          <dd className="break-words text-right font-medium">
            {SERVICE_REQUEST_SERVICE_LABELS[project.service] ?? 'Not specified'}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start gap-4 py-3">
          <dt className="text-muted-foreground">Budget</dt>
          <dd className="break-words text-right font-medium tabular-nums">
            {formatMoney(project.budgetAmount, project.currency)}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start gap-4 py-3">
          <dt className="text-muted-foreground">Start date</dt>
          <dd className="text-right font-medium tabular-nums">
            {formatDate(project.startDate ?? project.createdAt)}
          </dd>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] items-start gap-4 pt-3">
          <dt className="text-muted-foreground">Target end</dt>
          <dd className="text-right font-medium tabular-nums">
            {project.endDate ? formatDate(project.endDate) : 'Not set'}
          </dd>
        </div>
      </dl>
    </WidgetCard>
  );
}
