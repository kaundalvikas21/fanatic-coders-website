import { Skeleton } from '@/components/ui/skeleton';

export function StatsWidgetSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton
          key={index}
          className="h-32 rounded-xl"
        />
      ))}
    </div>
  );
}

export function ChartWidgetSkeleton() {
  return <Skeleton className="h-96 rounded-xl" />;
}

export function ListWidgetSkeleton() {
  return <Skeleton className="h-80 rounded-xl" />;
}
