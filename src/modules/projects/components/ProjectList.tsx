'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WidgetCard } from '@/components/shared/widget-card';
import { SERVICE_REQUEST_SERVICE_LABELS } from '@/modules/service-requests/config/labels';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { useProjectPermissions } from '@/modules/projects/hooks/use-project-permissions';
import { formatDate } from '@/utils/date';
import { formatMoney } from '@/utils/money';
import { PROJECT_STATUS_BADGE_VARIANTS, type Project } from '@/types';

type ProjectListProps = {
  projects: Project[];
};

type ProjectWithRelations = Project & {
  client?: {
    member?: {
      user?: {
        name?: string | null;
        email?: string | null;
      } | null;
    } | null;
  } | null;
};

function getClientLabel(project: Project) {
  const relation = project as ProjectWithRelations;
  const user = relation.client?.member?.user;

  return user?.name || user?.email || project.clientId;
}

export function ProjectList({ projects }: ProjectListProps) {
  const permissions = useProjectPermissions();

  if (projects.length === 0) {
    return (
      <WidgetCard title={permissions.isManagementView ? 'Project portfolio' : 'Your projects'}>
        <p className="text-sm leading-6 text-muted-foreground">
          {permissions.isManagementView
            ? 'Converted service requests and direct project workspaces will appear here.'
            : 'Your active project workspaces will appear here once the team starts delivery.'}
        </p>
      </WidgetCard>
    );
  }

  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-xl border bg-card p-4 text-card-foreground"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold tracking-normal">{project.name}</h3>
                <Badge variant={PROJECT_STATUS_BADGE_VARIANTS[project.status]}>
                  {PROJECT_STATUS_LABELS[project.status]}
                </Badge>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span>{SERVICE_REQUEST_SERVICE_LABELS[project.service]}</span>
                <span>
                  {formatMoney(project.budgetAmount, project.currency, {
                    fallback: 'Budget not set',
                  })}
                </span>
                <span>Started {formatDate(project.startDate ?? project.createdAt)}</span>
              </div>
              {permissions.isManagementView && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Client: {getClientLabel(project)}
                </p>
              )}
            </div>

            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href={`/dashboard/projects/${project.id}`}>Open project</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
