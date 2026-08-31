import { UserRoundPlus, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WidgetCard } from '@/components/shared/widget-card';
import { UserAvatar } from '@/components/shared/user-avatar';
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
      image?: string | null;
    } | null;
  } | null;
};

export function ProjectMembersCard({ project }: ProjectMembersCardProps) {
  const members = (project.memberProjects ?? []) as ProjectMemberWithUser[];

  return (
    <WidgetCard
      icon={Users}
      title="Assigned team"
      description="Project ownership and delivery members."
      actionSlot={
        <Badge variant="outline">
          {members.length} {members.length === 1 ? 'member' : 'members'}
        </Badge>
      }
    >
      {members.length === 0 ? (
        <div className="flex flex-col items-center px-4 py-6 text-center">
          <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <UserRoundPlus
              className="size-4"
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-sm font-medium">No team members assigned</p>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Assigned members will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border/70">
          {members.map((assignment) => {
            const user = assignment.member?.user;

            return (
              <div
                key={assignment.id}
                className="flex min-w-0 items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <UserAvatar
                  name={user?.name}
                  email={user?.email}
                  image={user?.image}
                  className="size-9 shrink-0"
                  fallbackClassName="text-xs font-semibold"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {user?.name || user?.email || assignment.memberId || 'Assigned member'}
                  </p>
                  {user?.email ? (
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  ) : null}
                </div>
                <Badge
                  variant={assignment.role === 'MANAGER' ? 'secondary' : 'outline'}
                  className="shrink-0"
                >
                  {PROJECT_MEMBER_ROLE_LABELS[assignment.role] ?? 'Member'}
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </WidgetCard>
  );
}
