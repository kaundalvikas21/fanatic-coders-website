import { Settings } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { WidgetCard } from '@/components/shared/widget-card';

export const metadata = {
  title: 'Settings | fanaticCoders',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Workspace configuration and preferences."
        showBackButton
      />

      <WidgetCard
        icon={Settings}
        title="Settings are coming soon"
        description="Workspace preferences, notifications, and account controls are still being prepared."
      >
        <p className="text-sm leading-6 text-muted-foreground">
          No action is required. This page will become available in a future update.
        </p>
      </WidgetCard>
    </div>
  );
}
