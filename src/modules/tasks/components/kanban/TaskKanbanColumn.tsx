'use client';

import { useDroppable } from '@dnd-kit/core';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Task, TaskStatus } from '@/types';
import { TASK_STATUS_OPTIONS } from '@/types';
import { TaskKanbanCard } from './TaskKanbanCard';
import { TASK_STATUS_STYLES } from './task-kanban-styles';

export function TaskKanbanColumn({ status, tasks }: { status: TaskStatus; tasks: Task[] }) {
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
        'min-h-128 transition-[border-color,background-color,box-shadow]',
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
            <TaskKanbanCard
              key={`${task.id}:${task.updatedAt}:${task.addOnTasks.map((item) => `${item.id}:${item.updatedAt}`).join(',')}`}
              task={task}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
