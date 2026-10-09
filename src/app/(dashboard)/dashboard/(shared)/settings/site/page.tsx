import { Globe2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { WidgetCard } from '@/components/shared/widget-card';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getSiteSettingData } from '@/lib/data/site-settings/get-public-site-setting';
import { SiteSettingsForm } from '@/modules/site-settings/components/SiteSettingsForm';

export const metadata = { title: 'Site Settings | fanaticCoders' };

export default async function SiteSettingsPage() {
  const access = await getCurrentAccess();
  if (!access?.can('siteSetting', 'update')) redirect('/unauthorized');

  const setting = await getSiteSettingData();

  return (
    <WidgetCard
      icon={Globe2}
      title="Public contact details"
      description="Choose how visitors can reach fanaticCoders. Empty optional fields stay hidden on the website."
      className="w-full"
    >
      <SiteSettingsForm initialSetting={setting} />
    </WidgetCard>
  );
}
