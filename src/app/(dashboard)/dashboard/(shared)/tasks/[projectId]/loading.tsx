import {
  TaskBoardSkeleton,
  TasksInformationSkeleton,
} from '@/components/shared/skeleton/TaskBoardSkeleton';

export default function ProjectTasksLoading() {
  return (
    <div
      className="flex flex-col gap-5"
      aria-busy="true"
      aria-label="Loading project tasks"
    >
      <TasksInformationSkeleton />
      <TaskBoardSkeleton />
    </div>
  );
}
