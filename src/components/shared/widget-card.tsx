import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { CardIcon } from '@/components/shared/card-icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WidgetCardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassNames?: string;
  actionSlot?: ReactNode;
}

export function WidgetCard({
  icon: Icon,
  title,
  description,
  variant = 'default',
  children,
  className,
  titleClassName,
  descriptionClassName,
  contentClassNames,
  actionSlot,
}: WidgetCardProps) {
  const isDestructive = variant === 'destructive';
  const hasHeader = Icon || title || description;

  return (
    <Card
      className={cn(
        'border border-border/80 bg-card/80 transition-colors duration-200 hover:border-primary/20',
        isDestructive && 'border-destructive/30',
        className,
      )}
    >
      {hasHeader && (
        <CardHeader className="border-b border-border/60 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              {Icon && (
                <CardIcon
                  icon={Icon}
                  variant={variant}
                />
              )}
              <div className="grid min-w-0 auto-rows-min grid-rows-[auto_auto] items-start gap-1.5">
                {title && (
                  <CardTitle className={cn(isDestructive && 'text-destructive', titleClassName)}>
                    {title}
                  </CardTitle>
                )}
                {description && (
                  <CardDescription className={descriptionClassName}>{description}</CardDescription>
                )}
              </div>
            </div>
            {actionSlot && <div className="shrink-0">{actionSlot}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn(!hasHeader && 'px-6 pt-6', contentClassNames)}>
        {children}
      </CardContent>
    </Card>
  );
}
