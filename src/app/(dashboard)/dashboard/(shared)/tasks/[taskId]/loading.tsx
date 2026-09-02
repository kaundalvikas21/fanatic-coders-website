import {
  DetailHeaderSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function TaskDetailLoading() {
  return (
    <div
      className="flex flex-col gap-6"
      aria-busy="true"
      aria-label="Loading task details"
    >
      <DetailHeaderSkeleton />
      <DetailRowsSkeleton rows={4} />
    </div>
  );
}
