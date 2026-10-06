'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { ActionDialog } from '@/components/shared/action-dialog';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { usePermissions } from '@/providers/PermissionProvider';
import type { BlogSummary } from '@/types';
import { BlogDeleteActions } from './BlogDeleteActions';

export function BlogRowActions({ blog }: { blog: BlogSummary }) {
  const { can } = usePermissions();
  const canEdit = can('blog', 'update');
  const canDelete = can('blog', 'delete');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  if (!canEdit && !canDelete) return null;

  return (
    <>
      <ActionDropdown
        triggerRef={trigger}
        ariaLabel={`Actions for ${blog.title}`}
        onCloseAutoFocus={(event) => {
          if (deleteOpen) event.preventDefault();
        }}
      >
        {canEdit && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/blogs/${blog.id}`}>
              <Pencil /> Edit blog
            </Link>
          </DropdownMenuItem>
        )}
        {canDelete && (
          <>
            {canEdit && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              <Trash2 /> Delete blog
            </DropdownMenuItem>
          </>
        )}
      </ActionDropdown>
      {canDelete && (
        <ActionDialog
          open={deleteOpen}
          onOpenChange={(open) => {
            setDeleteOpen(open);
            if (!open) trigger.current?.focus();
          }}
          title={`Delete ${blog.title}?`}
          description="This permanently deletes the blog and its feature image. This cannot be undone."
        >
          <BlogDeleteActions blogId={blog.id} />
        </ActionDialog>
      )}
    </>
  );
}
