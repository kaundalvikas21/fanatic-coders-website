import Link from 'next/link';
import type { ReactNode } from 'react';
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
  };
  actionSlot?: ReactNode;
};

export function PageHeader({
  title,
  description,
  showBackButton = false,
  backLabel = 'Back',
  action,
  actionSlot,
}: PageHeaderProps) {
  return (
    <Card>
      <CardHeader className="gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
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
                <Link href={action.href}>{action.label}</Link>
              </Button>
            )}
          </CardAction>
        )}
      </CardHeader>
    </Card>
  );
}
