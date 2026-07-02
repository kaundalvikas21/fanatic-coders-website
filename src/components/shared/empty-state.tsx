import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type EmptyStateProps = {
  entity: string;
  description: string;
  Icon?: LucideIcon;
};

export function EmptyState({ entity, description, Icon = Inbox }: EmptyStateProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center px-4 py-14 text-center">
        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <p className="mt-4 text-sm font-medium">No {entity} yet</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
