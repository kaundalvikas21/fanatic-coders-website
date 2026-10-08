'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { deletePortfolioById } from '../../data/mutations';

export function PortfolioDeleteActions({ portfolioId }: { portfolioId: string }) {
  const { close } = useActionDialog();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      // Delete through the portfolio action so the stored cover image is cleaned up too.
      const response = await deletePortfolioById(portfolioId);

      if (!response.success) {
        toast.error(response.message || 'Could not delete portfolio.');
        return;
      }

      toast.success('Portfolio deleted.');
      close();
      router.refresh();
    } catch {
      toast.error('Could not delete portfolio. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div
      className="flex justify-end gap-2"
      aria-busy={isDeleting}
    >
      <Button
        type="button"
        variant="outline"
        size="lg"
        disabled={isDeleting}
        onClick={close}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="lg"
        disabled={isDeleting}
        onClick={() => void handleDelete()}
      >
        {isDeleting ? 'Deleting...' : 'Delete portfolio'}
      </Button>
    </div>
  );
}
