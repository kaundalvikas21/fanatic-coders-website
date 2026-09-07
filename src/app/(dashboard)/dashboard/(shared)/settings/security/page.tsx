import { MonitorSmartphone, ShieldCheck } from 'lucide-react';
import { SecuritySettings } from '@/components/dashboard/settings/SecuritySettings';
import { SessionSettings } from '@/components/dashboard/settings/SessionSettings';
import { WidgetCard } from '@/components/shared/widget-card';

export const metadata = {
  title: 'Security Settings | fanaticCoders',
};

export default function SecuritySettingsPage() {
  return (
    <div className="flex flex-col   gap-6">
      <WidgetCard
        icon={ShieldCheck}
        title="Change password"
        description="Update the password you use to sign in."
        className="w-full"
      >
        <SecuritySettings />
      </WidgetCard>

      <WidgetCard
        icon={MonitorSmartphone}
        title="Sessions"
        description="Choose where you want to sign out."
        className="w-full"
      >
        <SessionSettings />
      </WidgetCard>
    </div>
  );
}
