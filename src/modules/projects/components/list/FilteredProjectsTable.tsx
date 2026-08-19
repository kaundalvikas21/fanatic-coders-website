'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpRight, Eye } from 'lucide-react';
import Link from 'next/link';

import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { UserAvatar } from '@/components/shared/user-avatar';
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Progress } from '@/components/ui/progress';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { PROJECT_STATUS_COLORS, type Project } from '@/types';
import type { ProjectDeliverySummary } from '@/modules/projects/utils/progress';
import { ProjectInfoCard } from '../ProjectInfoCard';
import { ProjectMembersCard } from '../ProjectMembersCard';
import { ProjectProgressCard } from '../ProjectProgressCard';

type ProjectMemberWithUser = NonNullable<Project['memberProjects']>[number] & {
  member?: {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } | null;
  } | null;
};

function ProjectTeam({ project }: { project: Project }) {
  const members = (project.memberProjects ?? []) as ProjectMemberWithUser[];
  const visibleMembers = members.slice(0, 3);
  const remainingMembers = members.length - visibleMembers.length;

  if (members.length === 0) {
    return <span className="text-xs text-muted-foreground">Unassigned</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <AvatarGroup>
        {visibleMembers.map((assignment) => {
          const user = assignment.member?.user;

          return (
            <UserAvatar
              key={assignment.id}
              name={user?.name}
              email={user?.email}
              image={user?.image}
              className="size-7"
              fallbackClassName="text-[0.625rem] font-semibold"
            />
          );
        })}
        {remainingMembers > 0 && (
          <AvatarGroupCount className="size-7 text-xs">+{remainingMembers}</AvatarGroupCount>
        )}
      </AvatarGroup>
      <span className="text-xs text-muted-foreground">
        {members.length} {members.length === 1 ? 'member' : 'members'}
      </span>
    </div>
  );
}

const columns: ColumnDef<ProjectDeliverySummary>[] = [
  {
    id: 'project',
    header: 'Project',
    cell: ({ row }) => {
      const { project } = row.original;
      const projectName = project.name?.trim() || 'Untitled project';

      return (
        <div>
          <Link
            href={`/dashboard/projects/${project.id}`}
            className="font-medium text-foreground outline-none hover:text-primary focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
          >
            {projectName}
          </Link>
          <p className="mt-1 max-w-64 truncate text-xs text-muted-foreground">
            {project.description?.trim() || 'No project description'}
          </p>
        </div>
      );
    },
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { status } = row.original.project;
      return (
        <Badge
          variant="secondary"
          color={PROJECT_STATUS_COLORS[status]}
        >
          {PROJECT_STATUS_LABELS[status] ?? 'Unknown'}
        </Badge>
      );
    },
  },
  {
    id: 'team',
    header: 'Team',
    cell: ({ row }) => <ProjectTeam project={row.original.project} />,
  },
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const { project, completedTasks, progressPercent, tasks } = row.original;
      const projectName = project.name?.trim() || 'Untitled project';

      return (
        <div className="w-64">
          <div className="mb-2 flex items-center justify-between gap-4 text-xs">
            <span className="text-muted-foreground">
              {completedTasks} of {tasks.length} tasks
            </span>
            <strong className="font-mono font-semibold tabular-nums">{progressPercent}%</strong>
          </div>
          <Progress
            value={progressPercent}
            aria-label={`${projectName} is ${progressPercent}% complete`}
            className="h-1.5"
          />
        </div>
      );
    },
  },
  {
    id: 'action',
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const { project, tasks } = row.original;
      const projectName = project.name?.trim() || 'Untitled project';

      return (
        <div className="flex justify-center">
          <ActionSheet
            title={projectName}
            description={project.description?.trim() || 'Project delivery details.'}
            contentClassName="sm:max-w-2xl"
            trigger={
              <ActionSheetButton
                variant="ghost"
                size="icon"
                aria-label={`View ${projectName}`}
                title={`View ${projectName}`}
              >
                <Eye />
              </ActionSheetButton>
            }
          >
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-5 text-left">
              <div className="space-y-4">
                <ProjectProgressCard
                  project={project}
                  tasks={tasks}
                />
                <ProjectInfoCard project={project} />
                <ProjectMembersCard project={project} />
              </div>
            </div>

            <div className="border-t border-border/70 p-4">
              <Button
                asChild
                className="w-full"
              >
                <Link href={`/dashboard/projects/${project.id}`}>
                  Open full project
                  <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          </ActionSheet>
        </div>
      );
    },
  },
];

export function FilteredProjectsTable({ summaries }: { summaries: ProjectDeliverySummary[] }) {
  return (
    <DataTable
      columns={columns}
      data={summaries ?? []}
      emptyMessage="No projects match the selected filters."
      tableClassName="min-w-190"
    />
  );
}
