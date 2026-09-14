import { MonitorSmartphone, ShieldCheck } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function SecuritySettingsLoading() {
  return (
    <div
      role="status"
      aria-label="Loading security settings"
      className="flex flex-col gap-6"
    >
      <div
        aria-hidden="true"
        className="flex flex-col gap-6"
      >
        <WidgetCard
          icon={ShieldCheck}
          title="Change password"
          description="Update the password you use to sign in."
          className="w-full"
        >
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 2 }, (_, index) => (
                <div
                  key={index}
                  className="grid content-start gap-2"
                >
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-11 w-full" />
                  {index === 0 && <Skeleton className="h-4 w-48 max-w-full" />}
                </div>
              ))}
            </div>
            <Skeleton className="h-12 w-full" />
            <div className="flex justify-end border-t pt-5">
              <Skeleton className="h-9 w-40" />
            </div>
          </div>
        </WidgetCard>

        <WidgetCard
          icon={MonitorSmartphone}
          title="Sessions"
          description="Choose where you want to sign out."
          className="w-full"
        >
          <div className="divide-y divide-border/70">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="grid min-w-0 gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-72 max-w-full" />
                </div>
                <Skeleton className="h-9 w-32 shrink-0" />
              </div>
            ))}
          </div>
        </WidgetCard>
      </div>
    </div>
  );
}
