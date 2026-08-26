'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TaskCommentForm } from '@/modules/tasks/components/forms/TaskCommentForm';
import {
  createTaskComment,
  deleteTaskComment,
  updateTaskComment,
} from '@/modules/tasks/data/mutations';
import { getTaskComments } from '@/modules/tasks/data/queries';
import { usePermissions } from '@/providers/PermissionProvider';
import type {
  CreateTaskCommentRequest,
  Task,
  TaskCommentList,
  UpdateTaskCommentRequest,
} from '@/types';
import { TaskCommentItem } from './TaskCommentItem';
import { TaskDetailTabPanel } from './TaskDetailTabPanel';
import type { TaskDetailTab } from './types';

const PAGE_SIZE = 20;

const isCommentModerator = (role: string) => {
  const roles = role.split(',').map((item) => item.trim());
  return roles.includes('ADMIN') || roles.includes('MANAGER');
};

type TaskCommentsTabProps = {
  task: Task;
  comments: TaskCommentList;
  activeTab: TaskDetailTab;
  onCountChange: (count: number) => void;
};

export function TaskCommentsTab({
  task,
  comments,
  activeTab,
  onCountChange,
}: TaskCommentsTabProps) {
  const { can, memberId, role } = usePermissions();
  const [items, setItems] = useState(comments.items);
  const [pagination, setPagination] = useState(comments.pagination);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const moderator = isCommentModerator(role);

  async function create(payload: CreateTaskCommentRequest) {
    const response = await createTaskComment(task.projectId, task.id, payload);
    if (!response.success) {
      toast.error(response.message || 'Could not post comment.');
      return false;
    }

    const totalItems = pagination.totalItems + 1;
    setItems((current) => [response.data, ...current]);
    setPagination((current) => ({ ...current, totalItems }));
    onCountChange(totalItems);
    toast.success('Comment posted.');
    return true;
  }

  async function update(commentId: string, payload: UpdateTaskCommentRequest) {
    const response = await updateTaskComment(task.projectId, task.id, commentId, payload);
    if (!response.success) {
      toast.error(response.message || 'Could not update comment.');
      return false;
    }

    setItems((current) => current.map((item) => (item.id === commentId ? response.data : item)));
    toast.success('Comment updated.');
    return true;
  }

  async function remove(commentId: string) {
    const response = await deleteTaskComment(task.projectId, task.id, commentId);
    if (!response.success) {
      toast.error(response.message || 'Could not delete comment.');
      return false;
    }

    const totalItems = Math.max(0, pagination.totalItems - 1);
    setItems((current) => current.filter((item) => item.id !== commentId));
    setPagination((current) => ({ ...current, totalItems }));
    onCountChange(totalItems);
    toast.success('Comment deleted.');
    return true;
  }

  async function loadMore() {
    setIsLoadingMore(true);
    try {
      const response = await getTaskComments(task.id, {
        page: pagination.page + 1,
        pageSize: PAGE_SIZE,
      });
      if (!response.success) {
        toast.error(response.message || 'Could not load more comments.');
        return;
      }

      setItems((current) => [...current, ...response.data.items]);
      setPagination(response.data.pagination);
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <TaskDetailTabPanel
      value="comments"
      activeTab={activeTab}
      icon={MessageSquare}
      title="Comments"
      description="Share progress, questions, and review notes with everyone on this task."
      lazy
    >
      <div className="space-y-5">
        {can('taskComment', 'create') ? (
          <div className="border-b border-border pb-5">
            <TaskCommentForm onSubmit={create} />
          </div>
        ) : null}

        {items.length ? (
          <div className="divide-y divide-border">
            {items.map((comment) => {
              const ownsComment = comment.memberId === memberId;

              return (
                <TaskCommentItem
                  key={comment.id}
                  comment={comment}
                  canUpdate={can('taskComment', 'update') && (ownsComment || moderator)}
                  canDelete={can('taskComment', 'delete') && (ownsComment || moderator)}
                  onUpdate={update}
                  onDelete={remove}
                />
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center">
            <MessageSquare
              className="mx-auto size-8 text-muted-foreground/60"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-medium">No comments yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Start the conversation with a progress update or question.
            </p>
          </div>
        )}

        {pagination.page < pagination.totalPages ? (
          <div className="flex justify-center border-t border-border pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoadingMore}
              onClick={() => void loadMore()}
            >
              {isLoadingMore ? 'Loading…' : 'Load older comments'}
            </Button>
          </div>
        ) : null}
      </div>
    </TaskDetailTabPanel>
  );
}
