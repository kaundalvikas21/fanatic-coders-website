import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import {
  DetailHeaderSkeleton,
  DetailPanelSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function BlogDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading blog"
    >
      <DetailPageLayout>
        <DetailPageLayout.Main>
          <DetailHeaderSkeleton />
          <DetailRowsSkeleton rows={3} />
        </DetailPageLayout.Main>

        <DetailPageLayout.Aside>
          <DetailRowsSkeleton rows={2} />
          <DetailPanelSkeleton rows={2} />
        </DetailPageLayout.Aside>
      </DetailPageLayout>
    </div>
  );
}
