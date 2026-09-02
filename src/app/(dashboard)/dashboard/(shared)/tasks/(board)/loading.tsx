import {
  TaskBoardSkeleton,
  TasksInformationSkeleton,
} from '@/components/shared/skeleton/TaskBoardSkeleton';

export default function TasksLoading() {
  return (
    <div
      className="flex flex-col gap-5"
      aria-busy="true"
      aria-label="Loading tasks"
    >
      <TasksInformationSkeleton />
      <TaskBoardSkeleton />
    </div>
  );
}
