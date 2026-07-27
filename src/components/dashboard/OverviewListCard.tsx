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
        <div className="grid gap-1">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex min-h-12 items-center justify-between gap-4 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
