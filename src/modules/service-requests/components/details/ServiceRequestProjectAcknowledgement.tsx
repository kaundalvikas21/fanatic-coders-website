import Link from 'next/link';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WidgetCard } from '@/components/shared/widget-card';

type ServiceRequestProjectAcknowledgementProps = {
  projectId: string;
};

export function ServiceRequestProjectAcknowledgement({
  projectId,
}: ServiceRequestProjectAcknowledgementProps) {
  return (
    <WidgetCard
      icon={CircleCheckBig}
      title="Project created"
      description="Your request is now linked to a project."
      className="border-primary/30 bg-primary/[0.04]"
      titleClassName="text-xl font-semibold"
      descriptionClassName="text-sm"
    >
      <div className="grid gap-4">
        <div className="grid gap-1">
          <span className="text-xs font-medium text-muted-foreground">Project reference</span>
          <code className="overflow-wrap-anywhere text-sm font-semibold text-foreground">
            {projectId}
          </code>
        </div>

        <Button
          asChild
          className="w-full justify-between"
        >
          <Link href={`/dashboard/projects/${projectId}`}>
            Open project
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </WidgetCard>
  );
}
