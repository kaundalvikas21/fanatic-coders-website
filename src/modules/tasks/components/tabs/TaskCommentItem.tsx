'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { ActionDialog, useActionDialog } from '@/components/shared/action-dialog';
import { UserAvatar } from '@/components/shared/user-avatar';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
  MessageFooter,
} from '@/components/ui/message';
import { getRoleLabel } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';
import { TaskCommentForm } from '@/modules/tasks/components/forms/TaskCommentForm';
import { useTaskCommentPermissions } from '@/modules/tasks/hooks/use-task-comment-permissions';
import type { TaskComment, UpdateTaskCommentRequest } from '@/types';

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
  onUpdate: (commentId: string, payload: UpdateTaskCommentRequest) => Promise<boolean>;
  onDelete: (commentId: string) => Promise<boolean>;
};

export function TaskCommentItem({ comment, onUpdate, onDelete }: TaskCommentItemProps) {
  const { canUpdate, canDelete } = useTaskCommentPermissions(comment);
  const [isEditing, setIsEditing] = useState(false);
  const authorName = comment.member?.user.name ?? 'Former member';

  return (
    <Message>
      <MessageAvatar className="self-start translate-y-0!">
        <UserAvatar
          name={authorName}
          image={comment.member?.user.image}
          className="size-8"
        />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader className="flex-wrap gap-x-2 gap-y-1 px-0">
          <span className="text-foreground">{authorName}</span>
          {comment.member?.role ? <span>{getRoleLabel(comment.member.role)}</span> : null}
        </MessageHeader>

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
          <p className="w-fit max-w-[75ch] whitespace-pre-wrap wrap-break-word rounded-lg bg-muted px-3 py-2 text-sm leading-6">
            {comment.content}
          </p>
        )}

        <MessageFooter className="flex-wrap gap-2 px-0">
          <time
            dateTime={comment.createdAt}
            suppressHydrationWarning
          >
            {format(new Date(comment.createdAt), 'MMM d, yyyy · h:mm a')}
          </time>
          {comment.updatedAt !== comment.createdAt ? <span>edited</span> : null}
        </MessageFooter>

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
      </MessageContent>
    </Message>
  );
}
