import { ChevronLeft, ChevronRight, Loader2, Send } from 'lucide-react';
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
    <div className="sticky bottom-0 z-10 -mx-2 flex justify-end gap-2 border-t bg-card/95 px-2 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:border-t-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
      <Button
        type="button"
        variant="outline"
        disabled={isSubmitting || isFirstStep}
        onClick={onBack}
      >
        <ChevronLeft data-icon="inline-start" />
        Back
      </Button>
      <Button
        type="submit"
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
            {isSubmitting ? 'Creating' : 'Create request'}
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
