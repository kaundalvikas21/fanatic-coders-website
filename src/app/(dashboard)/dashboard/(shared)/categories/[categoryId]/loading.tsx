import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import {
  DetailHeaderSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function CategoryDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading category"
    >
      <DetailPageLayout>
        <DetailPageLayout.Main>
          <DetailHeaderSkeleton />
          <DetailRowsSkeleton rows={2} />
        </DetailPageLayout.Main>
        <DetailPageLayout.Aside>
          <DetailRowsSkeleton rows={1} />
        </DetailPageLayout.Aside>
      </DetailPageLayout>
    </div>
  );
}
