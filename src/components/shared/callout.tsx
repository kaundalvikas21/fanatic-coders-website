import type { ComponentProps, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CalloutProps = {
  icon?: LucideIcon;
  title: ReactNode;
  description: ReactNode;
  variant?: ComponentProps<typeof Alert>['variant'];
  className?: string;
};

export function Callout({
  icon: Icon,
  title,
  description,
  variant = 'default',
  className,
}: CalloutProps) {
  return (
    <Alert
      variant={variant}
      className={className}
    >
      {Icon && <Icon aria-hidden="true" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
