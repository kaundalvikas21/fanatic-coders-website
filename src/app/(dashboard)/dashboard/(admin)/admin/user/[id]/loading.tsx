import { DetailRowsSkeleton } from '@/components/shared/skeleton/DetailPageSkeleton';

export default function MemberSectionLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading member details"
    >
      <DetailRowsSkeleton rows={4} />
    </div>
  );
}
