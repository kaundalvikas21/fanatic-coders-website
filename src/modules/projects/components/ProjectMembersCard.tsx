import { Badge } from '@/components/ui/badge';
import { WidgetCard } from '@/components/shared/widget-card';
import { PROJECT_MEMBER_ROLE_LABELS } from '@/modules/projects/config/labels';
import type { Project } from '@/types';

type ProjectMembersCardProps = {
  project: Project;
};

type ProjectMemberWithUser = NonNullable<Project['memberProjects']>[number] & {
  member?: {
    user?: {
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
};

export function ProjectMembersCard({ project }: ProjectMembersCardProps) {
  const members = (project.memberProjects ?? []) as ProjectMemberWithUser[];

  return (
    <WidgetCard
      title="Assigned team"
      description="Project ownership and delivery members."
      titleClassName="text-xl font-semibold"
    >
      {members.length === 0 ? (
        <p className="text-sm leading-6 text-muted-foreground">No team members assigned yet.</p>
      ) : (
        <div className="grid gap-3">
          {members.map((assignment) => {
            const user = assignment.member?.user;

            return (
              <div
                key={assignment.id}
                className="flex items-center justify-between gap-3 rounded-lg border bg-background/40 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {user?.name || user?.email || assignment.memberId}
                  </p>
                  {user?.email && (
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  )}
                </div>
                <Badge variant={assignment.role === 'MANAGER' ? 'secondary' : 'outline'}>
                  {PROJECT_MEMBER_ROLE_LABELS[assignment.role]}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </WidgetCard>
  );
}
