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
import type { Category } from '@/types';
import { deleteCategoryById } from '../../data/mutations';
import { CategoryForm } from '../form/CategoryForm';

function CategoryDeleteActions({ id }: { id: string }) {
  const { close } = useActionDialog();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await deleteCategoryById(id);
      if (!response.success) {
        toast.error(response.message || 'Could not delete category.');
        return;
      }
      toast.success('Category deleted.');
      close();
      router.refresh();
    } catch {
      toast.error('Could not delete category.');
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
        {isDeleting ? 'Deleting...' : 'Delete category'}
      </Button>
    </div>
  );
}

export function CategoryRowActions({ category }: { category: Category }) {
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
        ariaLabel={`Actions for ${category.name}`}
        onCloseAutoFocus={(event) => {
          if (editOpen || deleteOpen) event.preventDefault();
        }}
      >
        {canEdit && (
          <DropdownMenuItem onSelect={() => setEditOpen(true)}>
            <Pencil /> Edit category
          </DropdownMenuItem>
        )}
        {canDelete && (
          <>
            {canEdit && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 /> Delete category
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
          title={`Edit ${category.name}`}
          description="Update the category name and slug."
          showHeader
          contentClassName="sm:max-w-lg"
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <CategoryForm
              key={`${category.id}:${category.updatedAt}`}
              category={category}
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
          title={`Delete ${category.name}?`}
          description="This removes the category from any blogs that use it."
        >
          <CategoryDeleteActions id={category.id} />
        </ActionDialog>
      )}
    </>
  );
}
