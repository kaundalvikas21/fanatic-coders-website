import { UserRound } from 'lucide-react';
import { ProfileAvatar } from '@/components/dashboard/ProfileAvatar';
import { ProfileDetails } from '@/components/dashboard/ProfileDetails';
import { WidgetCard } from '@/components/shared/widget-card';

export function Profile() {
  return (
    <WidgetCard
      icon={UserRound}
      title="Profile"
      description="Manage your profile image and review your account details."
      contentClassNames="space-y-6"
    >
      <ProfileAvatar />
      <ProfileDetails />
    </WidgetCard>
  );
}
