'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useDraggable } from '@dnd-kit/core';
import { CalendarDays, Clock3, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { ActionSheet } from '@/components/shared/action-sheet';
import { ActionDialog } from '@/components/shared/action-dialog';
import { UserAvatar } from '@/components/shared/user-avatar';
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Task, UserListItem } from '@/types';
import { TASK_PRIORITY_BADGE_VARIANTS, TASK_PRIORITY_COLORS, TASK_PRIORITY_OPTIONS } from '@/types';
import { formatDate } from '@/utils/date';
import { TaskAddOnSection } from './TaskAddOnSection';
import { TaskCardProvider, useTaskCard } from './TaskCardContext';
import { useTaskKanban } from './TaskKanbanContext';
import { TASK_STATUS_STYLES } from './task-kanban-styles';

const TaskDeleteActions = dynamic(
  () => import('./TaskDeleteActions').then((module) => module.TaskDeleteActions),
  {
    ssr: false,
    loading: () => (
      <div className="h-9 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
    ),
  },
);

const TaskForm = dynamic(() => import('../forms').then((module) => module.TaskForm), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
  ),
});

function getPriorityLabel(task: Task) {
  return (
    TASK_PRIORITY_OPTIONS.find((option) => option.value === task.priority)?.label ?? task.priority
  );
}

function getAssigneeLabel(task: Task) {
  const assignees = task.assignees ?? [];

  if (assignees.length === 0) return 'Unassigned';
  if (assignees.length === 1) {
    return assignees[0]?.member?.user?.name || assignees[0]?.member?.user?.email || 'Assigned';
  }

  return `${assignees.length} assignees`;
}

export function TaskKanbanCardContent({ preview = false }: { preview?: boolean }) {
  const task = useTaskCard();
  const { showProjects } = useTaskKanban();
  const assignee = task.assignees?.[0]?.member?.user;
  const assignees = task.assignees ?? [];

  return (
    <>
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3 pr-8">
          <Badge
            variant={TASK_PRIORITY_BADGE_VARIANTS[task.priority]}
            color={TASK_PRIORITY_COLORS[task.priority]}
          >
            {getPriorityLabel(task)}
          </Badge>
        </div>
        <CardTitle className="text-sm leading-5 tracking-normal">{task.title}</CardTitle>
        {showProjects && task.project ? (
          <CardDescription className="font-mono text-xs">
            <Link
              href={`/dashboard/projects/${task.project.id}`}
              className="hover:text-foreground hover:underline"
            >
              {task.project.name}
            </Link>
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {task.description ? (
          <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{task.description}</p>
        ) : null}
        {!preview ? <TaskAddOnSection /> : null}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AvatarGroup aria-label={`Assignees: ${getAssigneeLabel(task)}`}>
            {assignees.length > 0 ? (
              assignees.slice(0, 3).map((assignment) => (
                <UserAvatar
                  key={assignment.id}
                  name={assignment.member.user.name}
                  email={assignment.member.user.email}
                  image={assignment.member.user.image}
                  className="size-6"
                />
              ))
            ) : (
              <UserAvatar
                name={assignee?.name}
                email={assignee?.email}
                image={assignee?.image}
                className="size-6"
              />
            )}
            {assignees.length > 3 ? (
              <AvatarGroupCount>+{assignees.length - 3}</AvatarGroupCount>
            ) : null}
          </AvatarGroup>
          <span className="min-w-0 truncate">{getAssigneeLabel(task)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex shrink-0 items-center gap-1">
            <CalendarDays aria-hidden="true" />
            {task.dueDate ? formatDate(task.dueDate) : 'No due date'}
          </span>
          {task.estimatedHours !== null && task.estimatedHours !== undefined ? (
            <span className="inline-flex shrink-0 items-center gap-1">
              <Clock3 aria-hidden="true" />
              {task.estimatedHours}h
            </span>
          ) : null}
        </div>
      </CardContent>
    </>
  );
}

export function TaskKanbanCard({
  task,
  assignableMembers,
}: {
  task: Task;
  assignableMembers: UserListItem[];
}) {
  const { canUpdate, canDelete, pendingTaskIds } = useTaskKanban();
  const disabled = !canUpdate || pendingTaskIds.has(task.id);
  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
      disabled,
    });

  return (
    <TaskCardProvider task={task}>
      <Card
        ref={setNodeRef}
        size="sm"
        style={
          transform
            ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
            : undefined
        }
        className={cn(
          'group relative touch-manipulation transition-[border-color,background-color,box-shadow,opacity,transform] hover:-translate-y-[3px] hover:border-violet-500/40 hover:bg-accent/40 hover:shadow-[0_16px_40px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] motion-reduce:transition-none motion-reduce:hover:transform-none',
          TASK_STATUS_STYLES[task.status].card,
          isDragging && 'opacity-40',
        )}
      >
        <Button
          ref={setActivatorNodeRef}
          type="button"
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          aria-label={`Move ${task.title}`}
          className="absolute top-2 right-2 touch-none cursor-grab transition-[background-color,color,transform] hover:scale-110 hover:bg-accent hover:text-primary active:cursor-grabbing motion-reduce:transition-none motion-reduce:hover:transform-none"
          {...attributes}
          {...listeners}
        >
          <GripVertical />
        </Button>
        {canUpdate ? (
          <div
            className={cn(
              'absolute top-2 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none',
              canDelete ? 'right-[4.75rem]' : 'right-10',
            )}
          >
            <ActionSheet
              title="Edit task"
              description="Update this task's details and assignees."
              trigger={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  disabled={pendingTaskIds.has(task.id)}
                  aria-label="Edit task"
                  title="Edit task"
                >
                  <Pencil />
                </Button>
              }
            >
              <div className="min-h-0 flex-1 p-3">
                <TaskForm
                  projectId={task.projectId}
                  assignableMembers={assignableMembers}
                  task={task}
                />
              </div>
            </ActionSheet>
          </div>
        ) : null}
        {canDelete ? (
          <div className="absolute top-2 right-10 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
            <ActionDialog
              title="Delete this task?"
              description="The task will be removed from this project."
              trigger={
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  <Trash2 />
                </Button>
              }
            >
              <TaskDeleteActions />
            </ActionDialog>
          </div>
        ) : null}
        <TaskKanbanCardContent />
      </Card>
    </TaskCardProvider>
  );
}
