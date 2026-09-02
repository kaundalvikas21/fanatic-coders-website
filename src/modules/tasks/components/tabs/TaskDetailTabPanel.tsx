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
  lazy?: boolean;
};

type TaskTabEmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

export function TaskDetailTabPanel({
  value,
  activeTab,
  icon,
  title,
  description,
  children,
  actionSlot,
  lazy = false,
}: TaskDetailTabPanelProps) {
  return (
    <TabsContent value={value}>
      {!lazy || activeTab === value ? (
        <WidgetCard
          icon={icon}
          title={title}
          description={description}
          actionSlot={actionSlot}
        >
          {children}
        </WidgetCard>
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

export function TaskTabEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: TaskTabEmptyStateProps) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center px-4 py-8 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon
          className="size-4"
          aria-hidden="true"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-5 text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
