import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type AcknowledgementCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
};

// Reusable centered acknowledgement card; parent composes the action it needs.
export function AcknowledgementCard({
  icon: Icon,
  title,
  description,
  action,
}: AcknowledgementCardProps) {
  return (
    <Card>
      <CardContent className="grid justify-items-center gap-5 py-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>

        <div className="grid gap-2">
          <h2 className="text-xl font-semibold tracking-normal">{title}</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
        </div>

        {action && <div className="flex justify-center">{action}</div>}
      </CardContent>
    </Card>
  );
}
