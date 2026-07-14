import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Muted, Small } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type ServiceRequestStepCardProps = {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
};

export function ServiceRequestStepCard({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted,
  onSelect,
}: ServiceRequestStepCardProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'h-auto min-h-16 justify-start gap-3 whitespace-normal px-3 py-2 text-left text-sm',
        isActive && 'border-primary bg-primary/10 text-primary dark:bg-primary/15',
        isCompleted &&
          'border-primary/30 bg-primary/5 text-foreground dark:border-primary/25 dark:bg-primary/10',
        !isActive &&
          !isCompleted &&
          'text-muted-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
          isActive || isCompleted
            ? 'border-primary bg-primary text-primary-foreground dark:border-primary/80'
            : 'border-border dark:border-input',
        )}
      >
        {isCompleted ? <CheckCircle2 className="size-4" /> : stepNumber}
      </span>
      <span className="grid gap-0.5">
        <Small className="leading-tight">{title}</Small>
        <Muted className="line-clamp-2 text-xs leading-snug opacity-80">{description}</Muted>
      </span>
    </Button>
  );
}
