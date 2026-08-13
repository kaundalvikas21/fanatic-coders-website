import Link from 'next/link';

import { WidgetCard } from '@/components/shared/widget-card';

export type OverviewListItem = {
  id: string;
  href: string;
  label: string;
  supportingText: string;
  meta: string;
};

type OverviewListCardProps = {
  title: string;
  description: string;
  emptyMessage: string;
  items: OverviewListItem[];
};

export function OverviewListCard({
  title,
  description,
  emptyMessage,
  items,
}: OverviewListCardProps) {
  return (
    <WidgetCard
      title={title}
      description={description}
    >
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="grid divide-y divide-border/60">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex min-h-14 items-center justify-between gap-4 px-2 py-3 text-sm transition-colors first:pt-1 last:pb-1 hover:bg-muted/50 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0">
                <span className="block truncate font-medium">{item.label}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  {item.supportingText}
                </span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>
            </Link>
          ))}
        </div>
      )}
    </WidgetCard>
  );
}
