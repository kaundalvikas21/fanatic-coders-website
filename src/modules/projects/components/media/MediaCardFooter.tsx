'use client';

import { Download, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { ActionDialog, useActionDialog } from '@/components/shared/action-dialog';
import { Button } from '@/components/ui/button';

type MediaCardFooterProps = {
  downloadHref: string;
  fileType: string;
  openLabel?: string;
  title: string;
  viewHref?: string;
  onDelete?: () => void | Promise<void>;
};

type DeleteActionProps = {
  onDelete: () => void | Promise<void>;
};

function DeleteAction({ onDelete }: DeleteActionProps) {
  const dialog = useActionDialog();
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);

    try {
      await onDelete();
      dialog.close();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={dialog.close}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        disabled={isPending}
        onClick={() => void handleDelete()}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
}

export function MediaCardFooter({
  downloadHref,
  fileType,
  openLabel,
  title,
  viewHref,
  onDelete,
}: MediaCardFooterProps) {
  return (
    <div className="flex min-h-12 items-center gap-2 border-t bg-card px-3 py-2">
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium leading-tight">{title}</p>
        <p className="mt-0.5 text-xs leading-none text-muted-foreground">{fileType}</p>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        {viewHref && openLabel ? (
          <Button
            asChild
            size="icon-sm"
            variant="ghost"
          >
            <Link
              href={viewHref}
              aria-label={openLabel}
              title="View"
            >
              <Eye aria-hidden="true" />
            </Link>
          </Button>
        ) : null}

        <Button
          asChild
          size="icon-sm"
          variant="ghost"
        >
          <Link
            href={downloadHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Download ${title}`}
            title="Download"
          >
            <Download aria-hidden="true" />
          </Link>
        </Button>

        {onDelete ? (
          <ActionDialog
            title={`Delete ${title.toLowerCase()}?`}
            description="This attachment will be permanently removed from the project."
            trigger={
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Delete ${title}`}
                title="Delete"
              >
                <Trash2 aria-hidden="true" />
              </Button>
            }
          >
            <DeleteAction onDelete={onDelete} />
          </ActionDialog>
        ) : null}
      </div>
    </div>
  );
}
