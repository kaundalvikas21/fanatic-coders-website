import { Check, ClipboardCheck, MessageSquareText, SlidersHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Small } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import type { ServiceRequestTemplateStep } from '@/modules/service-requests/config/templates';

type ServiceRequestStepCardProps = {
  stepId: ServiceRequestTemplateStep['id'];
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  onSelect: () => void;
};

const stepIcons = {
  'company-info': MessageSquareText,
  'goals-scope': SlidersHorizontal,
  'service-specific': SlidersHorizontal,
  review: ClipboardCheck,
} satisfies Record<ServiceRequestTemplateStep['id'], typeof MessageSquareText>;

export function ServiceRequestStepCard({
  stepId,
  title,
  isActive,
  isCompleted,
  onSelect,
}: ServiceRequestStepCardProps) {
  const StepIcon = stepIcons[stepId];

  return (
    <Button
      type="button"
      variant="ghost"
      aria-current={isActive ? 'step' : undefined}
      className={cn(
        'relative z-10 h-auto min-w-0 flex-1 flex-col gap-2 whitespace-normal bg-transparent px-2 py-0 text-center hover:bg-transparent',
        isActive && 'text-primary',
        isCompleted && 'text-foreground',
        !isActive && !isCompleted && 'text-muted-foreground',
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-card transition-colors duration-200 motion-reduce:transition-none',
          isActive && 'border-primary bg-primary text-primary-foreground ring-4 ring-primary/10',
          isCompleted && 'border-primary bg-primary text-primary-foreground',
          !isActive && !isCompleted && 'border-border text-muted-foreground',
        )}
      >
        {isCompleted ? <Check className="size-4" /> : <StepIcon className="size-4" />}
      </span>
      <Small className="max-w-40 leading-tight">{title}</Small>
    </Button>
  );
}
