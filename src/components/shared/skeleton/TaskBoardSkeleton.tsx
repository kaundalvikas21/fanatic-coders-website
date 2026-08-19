import { Skeleton } from '@/components/ui/skeleton';

export function TaskBoardSkeleton() {
  return (
    <div className="grid gap-4 pb-2 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, columnIndex) => (
        <div
          key={columnIndex}
          className="flex min-h-72 flex-col gap-3 rounded-xl border bg-card/70 p-4"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="size-6 rounded-full" />
          </div>
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ))}
    </div>
  );
}

export function TasksInformationSkeleton() {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 border-y py-3"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </div>
      <div className="flex items-center gap-5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}
