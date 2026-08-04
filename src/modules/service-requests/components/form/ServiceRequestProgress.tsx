import { Progress } from '@/components/ui/progress';
import { Muted, Small } from '@/components/ui/typography';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';
import { ServiceRequestStepCard } from './ServiceRequestStepCard';

type ServiceRequestProgressProps = {
  steps: ServiceRequestTemplate['steps'];
  activeStepIndex: number;
  onStepSelect: (stepIndex: number) => void;
};

export function ServiceRequestProgress({
  steps,
  activeStepIndex,
  onStepSelect,
}: ServiceRequestProgressProps) {
  const activeStep = steps[activeStepIndex] ?? steps[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / steps.length) * 100);
  const connectorPercent =
    steps.length > 1 ? Math.round((activeStepIndex / (steps.length - 1)) * 100) : 100;
  const connectorInset = `${50 / steps.length}%`;

  return (
    <div>
      <div className="grid gap-3 sm:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Small className="block">
              Step {activeStepIndex + 1} of {steps.length}
            </Small>
            <p className="truncate text-sm font-semibold">{activeStep.title}</p>
          </div>
          <Muted className="shrink-0">{progressPercent}%</Muted>
        </div>
        <Progress value={progressPercent} />
      </div>

      <nav
        aria-label="Service request progress"
        className="relative hidden py-1 sm:block"
      >
        <div
          aria-hidden="true"
          className="absolute top-6 h-0.5 bg-border"
          style={{ left: connectorInset, right: connectorInset }}
        >
          <div
            className="h-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${connectorPercent}%` }}
          />
        </div>

        <div className="relative flex items-start">
          {steps.map((step, index) => (
            <ServiceRequestStepCard
              key={step.id}
              stepId={step.id}
              title={step.title}
              isActive={index === activeStepIndex}
              isCompleted={index < activeStepIndex}
              onSelect={() => onStepSelect(index)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
