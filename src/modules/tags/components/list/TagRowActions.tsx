'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ActionDialog, useActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { ActionSheet } from '@/components/shared/action-sheet';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { usePermissions } from '@/providers/PermissionProvider';
import type { Tag } from '@/types';
import { deleteTagById } from '../../data/mutations';
import { TagForm } from '../form/TagForm';

function TagDeleteActions({ id }: { id: string }) {
  const { close } = useActionDialog();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await deleteTagById(id);
      if (!response.success) {
        toast.error(response.message || 'Could not delete tag.');
        return;
      }
      toast.success('Tag deleted.');
      close();
      router.refresh();
    } catch {
      toast.error('Could not delete tag.');
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
        {isDeleting ? 'Deleting...' : 'Delete tag'}
      </Button>
    </div>
  );
}

export function TagRowActions({ tag }: { tag: Tag }) {
  const { can } = usePermissions();
  const canEdit = can('blog', 'update');
  const canDelete = can('blog', 'delete');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  if (!canEdit && !canDelete) return null;

  return (
    <>
      <ActionDropdown
        triggerRef={trigger}
        ariaLabel={`Actions for ${tag.name}`}
        onCloseAutoFocus={(event) => {
          if (editOpen || deleteOpen) event.preventDefault();
        }}
      >
        {canEdit && (
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil /> Edit tag
          </DropdownMenuItem>
        )}
        {canDelete && (
          <>
            {canEdit && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 /> Delete tag
            </DropdownMenuItem>
          </>
        )}
      </ActionDropdown>
      {canEdit && (
        <ActionSheet
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title={`Edit ${tag.name}`}
          description="Update the tag name and slug."
          showHeader
          contentClassName="sm:max-w-lg"
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <TagForm
              key={`${tag.id}:${tag.updatedAt}`}
              tag={tag}
            />
          </div>
        </ActionSheet>
      )}
      {canDelete && (
        <ActionDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title={`Delete ${tag.name}?`}
          description="This removes the tag from any blogs that use it."
        >
          <TagDeleteActions id={tag.id} />
        </ActionDialog>
      )}
    </>
  );
}
