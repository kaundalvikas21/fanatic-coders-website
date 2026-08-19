import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BackButton } from '@/components/shared/back-button';

type PageHeaderProps = {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backLabel?: string;
  action?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
  actionSlot?: ReactNode;
};

export function PageHeader({
  title,
  description,
  showBackButton = true,
  backLabel = 'Back',
  action,
  actionSlot,
}: PageHeaderProps) {
  const ActionIcon = action?.icon;

  return (
    <Card className="relative isolate overflow-hidden border-primary/20 bg-card/85 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,color-mix(in_oklab,var(--aurora-violet)_16%,transparent),transparent_36%),radial-gradient(circle_at_88%_90%,color-mix(in_oklab,var(--aurora-blue)_12%,transparent),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent"
      />
      <CardHeader className="relative gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="flex items-center gap-1">
          {showBackButton && <BackButton label={backLabel} />}
          <div className="flex flex-col items-start gap-2">
            <CardTitle className="text-3xl font-bold tracking-normal">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {(action || actionSlot) && (
          <CardAction className="flex flex-wrap items-center gap-2">
            {actionSlot}
            {action && (
              <Button asChild>
                <Link href={action.href}>
                  {ActionIcon && <ActionIcon data-icon="inline-start" />}
                  {action.label}
                </Link>
              </Button>
            )}
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
}
