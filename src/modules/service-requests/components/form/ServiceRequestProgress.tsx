import { CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Muted, Small } from '@/components/ui/typography';
import { ServiceRequestStepCard } from './ServiceRequestStepCard';

type ProgressStep = {
  id: string;
  title: string;
};

type ServiceRequestProgressProps = {
  steps: readonly ProgressStep[];
  activeStepIndex: number;
  onStepSelect: (stepIndex: number) => void;
};

const progressLabels: Record<string, string> = {
  'choose-service': 'Service',
  'company-info': 'About you',
  'goals-scope': 'Goals & scope',
  'service-specific': 'Details',
  review: 'Review',
};

export function ServiceRequestProgress({
  steps,
  activeStepIndex,
  onStepSelect,
}: ServiceRequestProgressProps) {
  const activeStep = steps[activeStepIndex] ?? steps[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / steps.length) * 100);
  return (
    <aside className="border-b border-border/60 bg-muted text-foreground lg:border-r lg:border-b-0">
      <div className="grid gap-3 px-5 py-4 lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Small className="block">
              Step {activeStepIndex + 1} of {steps.length}
            </Small>
            <p className="truncate text-sm font-semibold">{activeStep.title}</p>
          </div>
          <Muted className="shrink-0">{progressPercent}%</Muted>
        </div>
        <Progress
          value={progressPercent}
          className="bg-border [&_[data-slot=progress-indicator]]:bg-primary"
        />
      </div>

      <nav
        aria-label="Service request progress"
        className="hidden min-h-full flex-col px-4 py-6 lg:flex"
      >
        <div>
          <p className="text-base font-semibold tracking-tight">Your request</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Complete each step.</p>
          <div className="mt-4 flex items-center gap-3">
            <Progress
              value={progressPercent}
              className="h-1.5 flex-1 bg-border [&_[data-slot=progress-indicator]]:bg-primary"
            />
            <span className="text-xs font-medium text-muted-foreground">{progressPercent}%</span>
          </div>
        </div>

        <div className="mt-4 grid gap-1">
          {steps.map((step, index) => (
            <ServiceRequestStepCard
              key={step.id}
              stepId={step.id}
              stepNumber={index + 1}
              title={progressLabels[step.id] ?? step.title}
              isActive={index === activeStepIndex}
              isCompleted={index < activeStepIndex}
              onSelect={() => onStepSelect(index)}
            />
          ))}
        </div>

        <div className="mt-auto border-t border-border pt-5">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-4 text-primary" />
            Progress saved
          </p>
        </div>
      </nav>
    </aside>
  );
}
