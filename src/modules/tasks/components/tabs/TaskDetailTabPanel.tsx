import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { WidgetCard } from '@/components/shared/widget-card';
import { TabsContent } from '@/components/ui/tabs';
import type { TaskDetailTab } from './types';

type TaskDetailTabPanelProps = {
  value: TaskDetailTab;
  activeTab: TaskDetailTab;
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  actionSlot?: ReactNode;
  before?: ReactNode;
  lazy?: boolean;
};

export function TaskDetailTabPanel({
  value,
  activeTab,
  icon,
  title,
  description,
  children,
  actionSlot,
  before,
  lazy = false,
}: TaskDetailTabPanelProps) {
  return (
    <TabsContent value={value}>
      {!lazy || activeTab === value ? (
        <div className={before ? 'space-y-5' : undefined}>
          {before}
          <WidgetCard
            icon={icon}
            title={title}
            description={description}
            actionSlot={actionSlot}
          >
            {children}
          </WidgetCard>
        </div>
      ) : null}
    </TabsContent>
  );
}

export function TaskTabSkeleton() {
  return (
    <div
      className="space-y-3"
      aria-label="Loading task section"
    >
      <div className="h-5 w-40 animate-pulse rounded bg-muted motion-reduce:animate-none" />
      <div className="h-20 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
    </div>
  );
}
