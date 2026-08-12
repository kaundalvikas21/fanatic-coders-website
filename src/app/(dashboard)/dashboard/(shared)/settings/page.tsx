import { PageHeader } from '@/components/shared/page-header';
import { Profile } from '@/components/dashboard/Profile';

export const metadata = {
  title: 'Settings | fanaticCoders',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Manage your account and workspace preferences."
        showBackButton
      />

      <Profile />
    </div>
  );
}
