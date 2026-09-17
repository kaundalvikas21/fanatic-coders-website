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
import { useTaskCommentPermissions } from '@/modules/tasks/hooks/use-task-comment-permissions';
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
  const { canCreate } = useTaskCommentPermissions();
  const [items, setItems] = useState(comments.items);
  const [pagination, setPagination] = useState(comments.pagination);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  async function create(payload: CreateTaskCommentRequest) {
    const response = await createTaskComment(task.id, payload);
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
    const response = await updateTaskComment(task.id, commentId, payload);
    if (!response.success) {
      toast.error(response.message || 'Could not update comment.');
      return false;
    }

    setItems((current) => current.map((item) => (item.id === commentId ? response.data : item)));
    toast.success('Comment updated.');
    return true;
  }

  async function remove(commentId: string) {
    const response = await deleteTaskComment(task.id, commentId);
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

      setItems((current) => {
        const existingIds = new Set(current.map((item) => item.id));
        return [...current, ...response.data.items.filter((item) => !existingIds.has(item.id))];
      });
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
      <div className="flex max-h-[28rem] flex-col">
        <div className="max-h-[20rem] overflow-y-auto overscroll-contain [overflow-anchor:none]">
          {pagination.page < pagination.totalPages ? (
            <div className="flex justify-center pb-4">
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
          <div
            role="log"
            aria-label="Task comments"
            aria-live="polite"
            className="space-y-4 py-4 pr-2"
          >
            {items.length ? (
              [...items].reverse().map((comment) => (
                <TaskCommentItem
                  key={comment.id}
                  comment={comment}
                  onUpdate={update}
                  onDelete={remove}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <MessageSquare
                    className="size-4"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-foreground">No comments yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Start with a progress update or question.
                </p>
              </div>
            )}
          </div>
        </div>
        {canCreate ? (
          <div className="shrink-0 border-t border-border bg-background pt-4">
            <TaskCommentForm onSubmit={create} />
          </div>
        ) : null}
      </div>
    </TaskDetailTabPanel>
  );
}
