'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useClient } from '@/hooks/useClient';
import { updateTaskById } from '@/modules/tasks/data/mutations';
import { useTaskPermissions } from '@/modules/tasks/hooks/use-task-permissions';
import type { Task, TaskStatus, UserListItem } from '@/types';
import { TASK_STATUS_OPTIONS } from '@/types';
import { TaskKanbanCardContent } from './TaskKanbanCard';
import { TaskCardProvider } from './TaskCardContext';
import { TaskKanbanColumn } from './TaskKanbanColumn';
import { TaskKanbanProvider } from './TaskKanbanContext';

type TaskKanbanBoardProps = {
  tasks: Task[];
  showProjects?: boolean;
  assignableMembers?: UserListItem[];
};

export function TaskKanbanBoard({
  tasks: initialTasks,
  showProjects = true,
  assignableMembers = [],
}: TaskKanbanBoardProps) {
  const isClient = useClient();
  const router = useRouter();
  const { canUpdate, canDelete } = useTaskPermissions();
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [pendingTaskIds, setPendingTaskIds] = useState(() => new Set<string>());

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

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
    router.refresh();
  }

  if (!isClient) return null;

  return (
    <TaskKanbanProvider
      value={{
        canUpdate,
        canDelete,
        showProjects,
        pendingTaskIds,
      }}
    >
      <DndContext
        onDragStart={(event) => {
          setActiveTask((event.active.data.current?.task as Task | undefined) ?? null);
        }}
        onDragCancel={() => setActiveTask(null)}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 pb-2 sm:grid-cols-2 xl:grid-cols-4">
          {TASK_STATUS_OPTIONS.map((status) => (
            <TaskKanbanColumn
              key={status.value}
              status={status.value}
              tasks={tasks.filter((task) => task.status === status.value)}
              assignableMembers={assignableMembers}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <TaskCardProvider task={activeTask}>
              <Card
                size="sm"
                className="w-72 shadow-lg"
              >
                <TaskKanbanCardContent preview />
              </Card>
            </TaskCardProvider>
          ) : null}
        </DragOverlay>
      </DndContext>
    </TaskKanbanProvider>
  );
}
