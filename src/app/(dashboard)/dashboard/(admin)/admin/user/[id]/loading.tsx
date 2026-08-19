import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import {
  DetailHeaderSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function AdminUserDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading member"
    >
      <DetailPageLayout>
        <DetailPageLayout.Main>
          <DetailHeaderSkeleton />
          <DetailRowsSkeleton rows={4} />
        </DetailPageLayout.Main>

        <DetailPageLayout.Aside>
          <DetailRowsSkeleton rows={2} />
          <DetailRowsSkeleton rows={1} />
        </DetailPageLayout.Aside>
      </DetailPageLayout>
    </div>
  );
}
