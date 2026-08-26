'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { ActionDialog, useActionDialog } from '@/components/shared/action-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaskCommentForm } from '@/modules/tasks/components/forms/TaskCommentForm';
import type { TaskComment, UpdateTaskCommentRequest } from '@/types';

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function DeleteTaskCommentActions({
  commentId,
  onDelete,
}: {
  commentId: string;
  onDelete: (commentId: string) => Promise<boolean>;
}) {
  const { close } = useActionDialog();
  const [isDeleting, setIsDeleting] = useState(false);

  async function remove() {
    setIsDeleting(true);
    try {
      if (await onDelete(commentId)) close();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={isDeleting}
        onClick={close}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        disabled={isDeleting}
        onClick={() => void remove()}
      >
        {isDeleting ? 'Deleting…' : 'Delete'}
      </Button>
    </div>
  );
}

type TaskCommentItemProps = {
  comment: TaskComment;
  canUpdate: boolean;
  canDelete: boolean;
  onUpdate: (commentId: string, payload: UpdateTaskCommentRequest) => Promise<boolean>;
  onDelete: (commentId: string) => Promise<boolean>;
};

export function TaskCommentItem({
  comment,
  canUpdate,
  canDelete,
  onUpdate,
  onDelete,
}: TaskCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const authorName = comment.member?.user.name ?? 'Former member';

  return (
    <article className="flex gap-3 py-4 first:pt-0 last:pb-0">
      <Avatar className="mt-0.5">
        {comment.member?.user.image ? (
          <AvatarImage
            src={comment.member.user.image}
            alt=""
          />
        ) : null}
        <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-medium text-foreground">{authorName}</span>
          {comment.member?.role ? <Badge variant="outline">{comment.member.role}</Badge> : null}
          <time
            className="text-xs text-muted-foreground"
            dateTime={comment.createdAt}
            suppressHydrationWarning
          >
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </time>
          {comment.updatedAt !== comment.createdAt ? (
            <span className="text-xs text-muted-foreground">edited</span>
          ) : null}
        </div>

        {isEditing ? (
          <TaskCommentForm
            mode="edit"
            initialContent={comment.content}
            onCancel={() => setIsEditing(false)}
            onSubmit={async (values) => {
              const saved = await onUpdate(comment.id, values);
              if (saved) setIsEditing(false);
              return saved;
            }}
          />
        ) : (
          <p className="max-w-[75ch] whitespace-pre-wrap break-words text-sm leading-6 text-foreground">
            {comment.content}
          </p>
        )}

        {!isEditing && (canUpdate || canDelete) ? (
          <div className="flex gap-1">
            {canUpdate ? (
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => setIsEditing(true)}
              >
                <Pencil data-icon="inline-start" />
                Edit
              </Button>
            ) : null}
            {canDelete ? (
              <ActionDialog
                title="Delete this comment?"
                description="This comment will be permanently removed from the task discussion."
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 data-icon="inline-start" />
                    Delete
                  </Button>
                }
              >
                <DeleteTaskCommentActions
                  commentId={comment.id}
                  onDelete={onDelete}
                />
              </ActionDialog>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
