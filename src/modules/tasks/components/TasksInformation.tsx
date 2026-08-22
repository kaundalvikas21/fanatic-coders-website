import type { Project, Task } from '@/types';

type TasksInformationProps = {
  tasks: Task[];
  project?: Project;
};

export function TasksInformation({ tasks, project }: TasksInformationProps) {
  const openTaskCount = tasks.filter((task) => task.status !== 'DONE').length;
  const doneTaskCount = tasks.length - openTaskCount;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-y py-3">
      <div>
        <p className="font-medium">{project?.name ?? 'All project tasks'}</p>
        <p className="text-sm text-muted-foreground">
          {project
            ? 'Drag tasks between columns to update their status.'
            : 'Select one project to create tasks for it.'}
        </p>
      </div>
      <dl className="flex items-center gap-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <dt>Open</dt>
          <dd className="font-semibold text-foreground">{openTaskCount}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt>Done</dt>
          <dd className="font-semibold text-foreground">{doneTaskCount}</dd>
        </div>
      </dl>
    </div>
  );
}
