import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { DetailRowsSkeleton } from '@/components/shared/skeleton/DetailPageSkeleton';

export default function AdminUserDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading member"
    >
      <DetailPageLayout className="xl:grid-cols-[20rem_minmax(0,1fr)]">
        <DetailPageLayout.Aside>
          <DetailRowsSkeleton rows={4} />
        </DetailPageLayout.Aside>

        <DetailPageLayout.Main>
          <DetailRowsSkeleton rows={5} />
          <div className="grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <DetailRowsSkeleton rows={4} />
            <DetailRowsSkeleton rows={3} />
          </div>
          <DetailRowsSkeleton rows={2} />
        </DetailPageLayout.Main>
      </DetailPageLayout>
    </div>
  );
}
