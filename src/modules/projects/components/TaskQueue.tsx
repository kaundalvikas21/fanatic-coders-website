import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectTasksCard } from './ProjectTasksCard';
import type { Task } from '@/types';

type TaskQueueProps = {
  tasks: Task[];
  canManageTasks: boolean;
  canUpdateStatus?: boolean;
};

export function TaskQueue({ tasks, canManageTasks, canUpdateStatus = true }: TaskQueueProps) {
  if (tasks.length === 0) {
    return (
      <ProjectTasksCard
        tasks={[]}
        canManageTasks={canManageTasks}
        canUpdateStatus={canUpdateStatus}
      />
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="grid gap-2"
        >
          {task.project && (
            <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
              <span className="truncate">Project: {task.project.name}</span>
              <Button
                asChild
                size="sm"
                variant="outline"
              >
                <Link href={`/dashboard/projects/${task.project.id}`}>Open project</Link>
              </Button>
            </div>
          )}
          <ProjectTasksCard
            tasks={[task]}
            canManageTasks={canManageTasks}
            canUpdateStatus={canUpdateStatus}
          />
        </div>
      ))}
    </div>
  );
}
