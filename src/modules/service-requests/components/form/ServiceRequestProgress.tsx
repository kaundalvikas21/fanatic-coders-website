import { Progress } from '@/components/ui/progress';
import { Muted, Small } from '@/components/ui/typography';
import type { ServiceRequestTemplate } from '@/modules/service-requests/config/templates';

type ServiceRequestProgressProps = {
  steps: ServiceRequestTemplate['steps'];
  activeStepIndex: number;
};

export function ServiceRequestProgress({ steps, activeStepIndex }: ServiceRequestProgressProps) {
  const activeStep = steps[activeStepIndex] ?? steps[0];
  const progressPercent = Math.round(((activeStepIndex + 1) / steps.length) * 100);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <Small className="block">
              Step {activeStepIndex + 1} of {steps.length}
            </Small>
            <Muted>{progressPercent}% complete</Muted>
          </div>
          <div className="min-w-36 rounded-md border bg-muted/30 px-3 py-2 text-sm font-medium">
            {activeStep.title}
          </div>
        </div>
        <Progress value={progressPercent} />
      </div>
    </div>
  );
}
