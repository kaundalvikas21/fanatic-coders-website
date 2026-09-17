import type { ReactNode } from 'react';
import { SettingsNavigation } from '@/components/dashboard/settings/SettingsNavigation';
import { SettingsProfileSummary } from '@/components/dashboard/settings/SettingsProfileSummary';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <DetailPageLayout className="xl:grid-cols-1">
      <DetailPageLayout.Main>
        <PageHeader
          title="Settings"
          description="Manage your profile, account security, and workspace notifications."
          showBackButton
        />
        <SettingsProfileSummary />
        <SettingsNavigation>{children}</SettingsNavigation>
      </DetailPageLayout.Main>
    </DetailPageLayout>
  );
}
