import { Skeleton } from '@/components/ui/skeleton';

type DetailPanelSkeletonProps = {
  rows?: number;
  className?: string;
};

export function DetailPanelSkeleton({ rows = 4, className = '' }: DetailPanelSkeletonProps) {
  return (
    <div
      className={`rounded-xl border bg-card/80 p-6 ${className}`}
      aria-hidden="true"
    >
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-3 h-4 w-48" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: rows }, (_, index) => (
          <Skeleton
            key={index}
            className="h-16 w-full"
          />
        ))}
      </div>
    </div>
  );
}

export function DetailHeaderSkeleton() {
  return (
    <div
      className="rounded-xl border bg-card/80 p-6"
      aria-hidden="true"
    >
      <Skeleton className="h-9 w-2/3 max-w-sm" />
      <Skeleton className="mt-3 h-4 w-full max-w-lg" />
    </div>
  );
}

export function DetailRowsSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div
      className="rounded-xl border bg-card/80 p-6"
      aria-hidden="true"
    >
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-3 h-4 w-48" />
      <div className="mt-6 flex flex-col gap-3">
        {Array.from({ length: rows }, (_, index) => (
          <Skeleton
            key={index}
            className="h-12 w-full"
          />
        ))}
      </div>
    </div>
  );
}
