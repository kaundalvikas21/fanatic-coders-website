import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import {
  DetailHeaderSkeleton,
  DetailPanelSkeleton,
  DetailRowsSkeleton,
} from '@/components/shared/skeleton/DetailPageSkeleton';

export default function ProjectDetailLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading project"
    >
      <DetailPageLayout>
        <DetailPageLayout.Main>
          <DetailHeaderSkeleton />
          <DetailPanelSkeleton />
          <DetailRowsSkeleton rows={4} />
        </DetailPageLayout.Main>

        <DetailPageLayout.Aside>
          <DetailPanelSkeleton rows={2} />
          <DetailRowsSkeleton rows={1} />
          <DetailPanelSkeleton />
        </DetailPageLayout.Aside>
      </DetailPageLayout>
    </div>
  );
}
