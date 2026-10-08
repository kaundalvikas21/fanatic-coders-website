'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { SelectField } from '@/components/shared/forms/SelectField';
import { Badge } from '@/components/ui/badge';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { updatePortfolioById } from '../../data/mutations';

const statusOptions = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

type PortfolioStatusFormProps = {
  portfolioId: string;
  initialStatus: boolean;
};

export function PortfolioStatusForm({ portfolioId, initialStatus }: PortfolioStatusFormProps) {
  const router = useRouter();
  const { close } = useActionDialog();
  const [isPublished, setIsPublished] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(value: string) {
    const nextStatus = value === 'published';
    if (nextStatus === isPublished || isUpdating) return;

    setError(null);
    setIsUpdating(true);

    try {
      // Persist publishing state so the public portfolio pages follow this choice.
      const response = await updatePortfolioById(portfolioId, { isPublished: nextStatus });

      if (!response.success) {
        const message = response.message || 'Could not update portfolio status.';
        setError(message);
        toast.error(message);
        return;
      }

      setIsPublished(nextStatus);
      toast.success(nextStatus ? 'Portfolio published.' : 'Portfolio moved to drafts.');
      router.refresh();
      close();
    } catch {
      const message = 'Could not update portfolio status. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
        <span className="text-sm text-muted-foreground">Current status</span>
        <Badge variant={isPublished ? 'default' : 'secondary'}>
          {isPublished ? 'Published' : 'Draft'}
        </Badge>
      </div>
      <Field>
        <FieldLabel htmlFor="portfolio-status">Change status</FieldLabel>
        <SelectField
          id="portfolio-status"
          value={isPublished ? 'published' : 'draft'}
          options={statusOptions}
          onChange={(value) => void updateStatus(value)}
          ariaLabel="Change portfolio status"
          disabled={isUpdating}
          error={error ?? undefined}
        />
        <FieldDescription aria-live="polite">
          {isUpdating ? 'Updating portfolio status…' : 'Changes save automatically.'}
        </FieldDescription>
      </Field>
      {error && (
        <p
          className="text-sm text-destructive"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
}
