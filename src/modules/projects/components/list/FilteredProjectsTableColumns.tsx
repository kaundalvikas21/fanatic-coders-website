'use client';

import { useRef } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { ActionSheet } from '@/components/shared/action-sheet';
import { ActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { UserAvatar } from '@/components/shared/user-avatar';
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { PROJECT_STATUS_LABELS } from '@/modules/projects/config/labels';
import { PROJECT_STATUS_COLORS, type Project } from '@/types';
import type { ProjectDeliverySummary } from '@/modules/projects/utils/progress';
import { ProjectStatusForm } from '../form/ProjectStatusForm';
import { TaskForm } from '@/modules/tasks/components/forms';
import { useProjectPermissions } from '@/modules/projects/hooks/use-project-permissions';
import { useTaskPermissions } from '@/modules/tasks/hooks/use-task-permissions';

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

function ProjectRowActions({ summary }: { summary: ProjectDeliverySummary }) {
  const { project } = summary;
  const projectName = project.name?.trim() || 'Untitled project';
  const { canUpdate: canUpdateProject } = useProjectPermissions();
  const { canCreate: canCreateTask } = useTaskPermissions();
  const taskTriggerRef = useRef<HTMLButtonElement>(null);
  const statusTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <ActionDropdown ariaLabel={`Open actions for ${projectName}`}>
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/projects/${project.id}`}>
            <Eye />
            View project
          </Link>
        </DropdownMenuItem>

        {canCreateTask ? (
          <DropdownMenuItem onSelect={() => taskTriggerRef.current?.click()}>
            <Plus />
            Add task
          </DropdownMenuItem>
        ) : null}

        {canUpdateProject ? (
          <DropdownMenuItem onSelect={() => statusTriggerRef.current?.click()}>
            <Settings2 />
            Change status
          </DropdownMenuItem>
        ) : null}
      </ActionDropdown>

      <ActionSheet
        title="Add task"
        showHeader
        description={`Add delivery work to ${projectName}.`}
        trigger={
          <button
            ref={taskTriggerRef}
            type="button"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        }
      >
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <TaskForm projectId={project.id} />
        </div>
      </ActionSheet>

      <ActionDialog
        title="Change project status"
        description={`Update the delivery stage for ${projectName}.`}
        trigger={
          <button
            ref={statusTriggerRef}
            type="button"
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        }
      >
        <ProjectStatusForm
          projectId={project.id}
          initialStatus={project.status}
        />
      </ActionDialog>
    </>
  );
}

export const projectColumns: ColumnDef<ProjectDeliverySummary>[] = [
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
    cell: ({ row }) => <ProjectRowActions summary={row.original} />,
  },
];
