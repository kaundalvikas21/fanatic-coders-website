import type { LucideIcon } from 'lucide-react';
import { Clock3 } from 'lucide-react';
import { WidgetCard } from '@/components/shared/widget-card';
import { Muted } from '@/components/ui/typography';

type ComingSoonCardProps = {
  title: string;
  description: string;
  Icon?: LucideIcon;
};

export function ComingSoonCard({ title, description, Icon = Clock3 }: ComingSoonCardProps) {
  return (
    <WidgetCard contentClassNames="flex min-h-[18rem] flex-col items-center justify-center text-center">
      <div className="flex size-12 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-normal">{title}</h1>
      <Muted className="mt-2 max-w-md">{description}</Muted>
    </WidgetCard>
  );
}
