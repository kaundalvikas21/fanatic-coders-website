'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';
import { deleteBlogById } from '../../data/mutations';

export function BlogDeleteActions({ blogId }: { blogId: string }) {
  const { close } = useActionDialog();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      const response = await deleteBlogById(blogId);

      if (!response.success) {
        toast.error(response.message || 'Could not delete blog.');
        return;
      }

      toast.success('Blog deleted.');
      close();
      router.refresh();
    } catch {
      toast.error('Could not delete blog. Please try again.');
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
        {isDeleting ? 'Deleting...' : 'Delete blog'}
      </Button>
    </div>
  );
}
