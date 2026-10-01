import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import {
  DetailHeaderSkeleton,
  DetailPanelSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function ServiceRequestDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading service request"
    >
      <DetailPageLayout>
        <DetailPageLayout.Main>
          <DetailHeaderSkeleton />
          <DetailPanelSkeleton />
          <DetailPanelSkeleton />
        </DetailPageLayout.Main>

        <DetailPageLayout.Aside>
          <DetailRowsSkeleton rows={1} />
          <DetailRowsSkeleton rows={1} />
        </DetailPageLayout.Aside>
      </DetailPageLayout>
    </div>
  );
}
