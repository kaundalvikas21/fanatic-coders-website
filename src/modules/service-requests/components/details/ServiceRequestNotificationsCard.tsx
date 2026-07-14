import { WidgetCard } from '@/components/shared/widget-card';

export function ServiceRequestNotificationsCard() {
  return (
    <WidgetCard
      title="Notifications"
      description="Request updates will appear here."
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <p className="text-sm leading-6 text-muted-foreground">
        No updates yet. Our team will follow up when there is a status change.
      </p>
    </WidgetCard>
  );
}
