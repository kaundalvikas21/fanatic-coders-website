import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type ServiceRequestFormActionsProps = {
  isSubmitting: boolean;
  isFirstStep: boolean;
  isReviewStep?: boolean;
  onBack: () => void;
};

// Renders shared wizard navigation while the parent keeps form state and submit logic.
export function ServiceRequestFormActions({
  isSubmitting,
  isFirstStep,
  isReviewStep = false,
  onBack,
}: ServiceRequestFormActionsProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-5 mt-2 flex justify-end gap-2 border-t border-border/60 bg-card/95 px-5 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:mt-4 sm:border-t sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
      {isFirstStep ? (
        <Button
          asChild
          variant="ghost"
          className="min-h-11 min-w-24 text-muted-foreground hover:text-foreground"
        >
          <Link href="/dashboard/services">
            <ChevronLeft data-icon="inline-start" />
            Back to services
          </Link>
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="min-h-11 min-w-24 text-muted-foreground hover:text-foreground"
          disabled={isSubmitting}
          onClick={onBack}
        >
          <ChevronLeft data-icon="inline-start" />
          Back
        </Button>
      )}
      <Button
        type="submit"
        className="min-h-11 min-w-32 bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isSubmitting}
      >
        {isReviewStep ? (
          <>
            {isSubmitting ? (
              <Loader2
                data-icon="inline-start"
                className="animate-spin"
              />
            ) : (
              <Send data-icon="inline-start" />
            )}
            {isSubmitting ? 'Submitting' : 'Submit request'}
          </>
        ) : (
          <>
            Continue
            <ChevronRight data-icon="inline-end" />
          </>
        )}
      </Button>
    </div>
  );
}
