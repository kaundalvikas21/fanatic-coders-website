import {
  Building2,
  Check,
  ClipboardCheck,
  PanelsTopLeft,
  SlidersHorizontal,
  Target,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Small } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

type ServiceRequestStepCardProps = {
  stepId: string;
  stepNumber: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
};

const stepIcons: Record<string, LucideIcon> = {
  'choose-service': PanelsTopLeft,
  'company-info': Building2,
  'goals-scope': Target,
  'service-specific': SlidersHorizontal,
  review: ClipboardCheck,
};

export function ServiceRequestStepCard({
  stepId,
  stepNumber,
  title,
  isActive,
  isCompleted,
  onSelect,
}: ServiceRequestStepCardProps) {
  const StepIcon = stepIcons[stepId] ?? PanelsTopLeft;

  return (
    <Button
      type="button"
      variant="ghost"
      aria-current={isActive ? 'step' : undefined}
      className={cn(
        'group h-auto min-h-14 w-full justify-start gap-2.5 whitespace-normal rounded-lg border border-transparent bg-transparent px-2.5 py-2 text-left transition-[color,background-color,border-color] duration-200 ease-out hover:border-border hover:bg-accent hover:text-accent-foreground motion-reduce:transition-none',
        isActive &&
          'border-border bg-accent text-accent-foreground hover:border-border hover:bg-accent',
        isCompleted && 'text-foreground',
        !isActive && !isCompleted && 'text-muted-foreground',
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 group-hover:border-primary/60 group-hover:text-primary motion-reduce:transition-none',
          isActive && 'border-primary bg-primary text-primary-foreground',
          isCompleted && 'border-primary bg-primary text-primary-foreground',
          !isActive && !isCompleted && 'border-border text-muted-foreground',
        )}
      >
        {isCompleted ? (
          <Check className="size-4" />
        ) : (
          <StepIcon
            className="size-4"
            aria-label={`Step ${stepNumber}`}
          />
        )}
      </span>
      <span className="min-w-0">
        <Small className="block truncate leading-tight text-inherit">{title}</Small>
        <span className="mt-1 block text-xs font-normal text-muted-foreground">
          {isCompleted ? 'Completed' : isActive ? 'In progress' : 'Up next'}
        </span>
      </span>
    </Button>
  );
}
