import { Bell } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotificationSettingsLoading() {
  return (
    <div
      role="status"
      aria-label="Loading notifications"
    >
      <div aria-hidden="true">
        <WidgetCard
          icon={Bell}
          title="Notifications"
          description="Review task assignments and workspace updates."
          contentClassNames="p-0"
          actionSlot={<Skeleton className="h-8 w-28" />}
        >
          <div className="flex flex-col gap-3 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="divide-y">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="flex gap-4 px-5 py-4"
              >
                <Skeleton className="mt-2 size-2 shrink-0 rounded-full" />
                <div className="grid min-w-0 flex-1 gap-2">
                  <Skeleton className="h-4 w-44 max-w-full" />
                  <Skeleton className="h-3 w-full max-w-xl" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
