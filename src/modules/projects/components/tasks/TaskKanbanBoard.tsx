'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DndContext, DragOverlay, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { CalendarDays, Clock3, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/shared/user-avatar';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { updateTaskById } from '@/modules/projects/data/tasks/mutations';
import { TaskDeleteButton } from './TaskDeleteButton';
import type { Task, TaskStatus } from '@/types';
import {
  TASK_PRIORITY_BADGE_VARIANTS,
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUS_OPTIONS,
} from '@/types';
import { formatDate } from '@/utils/date';
import { cn } from '@/lib/utils';
import { useClient } from '@/hooks/useClient';
import { useTaskPermissions } from '../../hooks/use-task-permissions';

const TASK_STATUS_STYLES: Record<
  TaskStatus,
  {
    column: string;
    card: string;
    heading: string;
    dot: string;
    count: string;
    drop: string;
  }
> = {
  TODO: {
    column: 'border-violet-200 bg-violet-50/70 dark:border-violet-500/25 dark:bg-violet-500/5',
    card: 'border-violet-200/80 bg-white/80 dark:border-violet-500/20 dark:bg-violet-500/[0.035]',
    heading: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    count: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    drop: 'ring-violet-500',
  },
  IN_PROGRESS: {
    column: 'border-blue-200 bg-blue-50/70 dark:border-blue-500/25 dark:bg-blue-500/5',
    card: 'border-blue-200/80 bg-white/80 dark:border-blue-500/20 dark:bg-blue-500/[0.035]',
    heading: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
    count: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
    drop: 'ring-blue-500',
  },
  IN_REVIEW: {
    column: 'border-amber-200 bg-amber-50/70 dark:border-amber-500/30 dark:bg-amber-500/5',
    card: 'border-amber-200/80 bg-white/80 dark:border-amber-500/25 dark:bg-amber-500/[0.035]',
    heading: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    count: 'border-amber-500/35 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    drop: 'ring-amber-500',
  },
  DONE: {
    column: 'border-emerald-200 bg-emerald-50/70 dark:border-emerald-500/25 dark:bg-emerald-500/5',
    card: 'border-emerald-200/80 bg-white/80 dark:border-emerald-500/20 dark:bg-emerald-500/[0.035]',
    heading: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    count: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    drop: 'ring-emerald-500',
  },
};

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

function TaskCardContent({ task, showProject }: { task: Task; showProject: boolean }) {
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
        {showProject && task.project ? (
          <CardDescription className="font-mono text-[0.6875rem]">
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

function TaskCard({
  task,
  disabled,
  canDelete,
  onDeleted,
  showProject,
}: {
  task: Task;
  disabled: boolean;
  canDelete: boolean;
  onDeleted: (taskId: string) => void;
  showProject: boolean;
}) {
  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
      disabled,
    });

  return (
    <Card
      ref={setNodeRef}
      size="sm"
      style={
        transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined
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
      {canDelete ? (
        <div className="absolute top-2 right-10 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
          <TaskDeleteButton
            task={task}
            onDeleted={onDeleted}
          />
        </div>
      ) : null}
      <TaskCardContent
        task={task}
        showProject={showProject}
      />
    </Card>
  );
}

function KanbanColumn({
  status,
  tasks,
  canUpdate,
  canDelete,
  onDeleted,
  pendingTaskIds,
  showProjects,
}: {
  status: TaskStatus;
  tasks: Task[];
  canUpdate: boolean;
  canDelete: boolean;
  onDeleted: (taskId: string) => void;
  pendingTaskIds: Set<string>;
  showProjects: boolean;
}) {
  const option = TASK_STATUS_OPTIONS.find((item) => item.value === status);
  const styles = TASK_STATUS_STYLES[status];
  const { setNodeRef, isOver } = useDroppable({
    id: `task-column-${status}`,
    data: { status },
  });

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        'min-h-[32rem] transition-[border-color,background-color,box-shadow]',
        styles.column,
        isOver && 'ring-2',
        isOver && styles.drop,
      )}
    >
      <CardHeader className="border-b">
        <CardTitle className={cn('flex items-center gap-2', styles.heading)}>
          <span
            className={cn('size-2 rounded-full', styles.dot)}
            aria-hidden="true"
          />
          {option?.label ?? status}
        </CardTitle>
        <CardDescription>{tasks.length === 1 ? '1 task' : `${tasks.length} tasks`}</CardDescription>
        <CardAction>
          <Badge
            variant="outline"
            className={styles.count}
          >
            {tasks.length}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
            Drop a task here.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              disabled={!canUpdate || pendingTaskIds.has(task.id)}
              canDelete={canDelete}
              onDeleted={onDeleted}
              showProject={showProjects}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}

type TaskKanbanBoardProps = {
  tasks: Task[];
  showProjects?: boolean;
};

export function TaskKanbanBoard({
  tasks: initialTasks,
  showProjects = true,
}: TaskKanbanBoardProps) {
  const isClient = useClient();
  const { canUpdate, canDelete } = useTaskPermissions();
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [pendingTaskIds, setPendingTaskIds] = useState(() => new Set<string>());

  function handleDeleted(taskId: string) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    if (!canUpdate) return;

    const task = event.active.data.current?.task as Task | undefined;
    const nextStatus = event.over?.data.current?.status as TaskStatus | undefined;

    if (!task || !nextStatus || task.status === nextStatus) return;

    const previousStatus = task.status;
    setTasks((current) =>
      current.map((item) => (item.id === task.id ? { ...item, status: nextStatus } : item)),
    );
    setPendingTaskIds((current) => new Set(current).add(task.id));

    const response = await updateTaskById(task.id, task.projectId, { status: nextStatus });

    setPendingTaskIds((current) => {
      const next = new Set(current);
      next.delete(task.id);
      return next;
    });

    if (!response.success) {
      setTasks((current) =>
        current.map((item) =>
          item.id === task.id && item.status === nextStatus
            ? { ...item, status: previousStatus }
            : item,
        ),
      );
      toast.error(response.message || 'Could not update task status.');
      return;
    }

    toast.success('Task status updated.');
  }

  if (!isClient) return null;

  return (
    <DndContext
      onDragStart={(event) => {
        setActiveTask((event.active.data.current?.task as Task | undefined) ?? null);
      }}
      onDragCancel={() => setActiveTask(null)}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-4 pb-2 sm:grid-cols-2 xl:grid-cols-4">
        {TASK_STATUS_OPTIONS.map((status) => (
          <KanbanColumn
            key={status.value}
            status={status.value}
            tasks={tasks.filter((task) => task.status === status.value)}
            canUpdate={canUpdate}
            canDelete={canDelete}
            onDeleted={handleDeleted}
            pendingTaskIds={pendingTaskIds}
            showProjects={showProjects}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <Card
            size="sm"
            className="w-72 shadow-lg"
          >
            <TaskCardContent
              task={activeTask}
              showProject={showProjects}
            />
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
