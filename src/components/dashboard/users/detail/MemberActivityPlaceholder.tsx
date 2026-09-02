import { History } from 'lucide-react';

import { WidgetCard } from '@/components/shared/widget-card';

export function MemberActivityPlaceholder() {
  return (
    <WidgetCard
      icon={History}
      title="Recent activity"
      description="Member-related workspace events will appear here."
      contentClassNames="flex flex-col items-center py-8 text-center"
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <History
          className="size-5"
          aria-hidden="true"
        />
      </div>
      <p className="mt-4 text-sm font-medium">Activity tracking is not available yet</p>
      <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
        Task assignments, completions, project membership, and role changes can appear here when the
        activity data source is ready.
      </p>
    </WidgetCard>
  );
}
