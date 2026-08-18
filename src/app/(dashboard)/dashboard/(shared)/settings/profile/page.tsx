import { ImageIcon, UserRound } from 'lucide-react';
import { ProfileAvatar } from '@/components/dashboard/profile/ProfileAvatar';
import { ProfileDetails } from '@/components/dashboard/profile/ProfileDetails';
import { WidgetCard } from '@/components/shared/widget-card';

export const metadata = {
  title: 'Profile Settings | fanaticCoders',
};

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col items-start gap-6">
      <WidgetCard
        icon={ImageIcon}
        title="Profile photo"
        description="Choose the image shown across your workspace."
        className="w-full "
      >
        <ProfileAvatar />
      </WidgetCard>

      <WidgetCard
        icon={UserRound}
        title="Personal details"
        description="Update your display name and review your account email."
        className="w-full "
      >
        <ProfileDetails />
      </WidgetCard>
    </div>
  );
}
