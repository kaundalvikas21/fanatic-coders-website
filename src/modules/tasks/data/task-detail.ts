'use server';

import type { FailureResponse, Media, Task, TaskCommentList } from '@/types';
import { getTaskMedia } from './media';
import { getTaskById, getTaskComments } from './queries';

type TaskDetailData = {
  task: Task;
  attachments: Media[];
  comments: TaskCommentList;
};

export type TaskDetailDataResult = { success: true; data: TaskDetailData } | FailureResponse;

function withFallbackMessage(response: FailureResponse, fallbackMessage: string): FailureResponse {
  return {
    ...response,
    message: response.message || fallbackMessage,
  };
}

export async function getTaskDetailData(taskId: string): Promise<TaskDetailDataResult> {
  const [taskResponse, mediaResponse, commentsResponse] = await Promise.all([
    getTaskById(taskId),
    getTaskMedia(taskId, { page: 1, pageSize: 20 }),
    getTaskComments(taskId, { page: 1, pageSize: 20 }),
  ]);

  if (!taskResponse.success) {
    return withFallbackMessage(taskResponse, 'Could not load task.');
  }

  if (!mediaResponse.success) {
    return withFallbackMessage(mediaResponse, 'Could not load task attachments.');
  }

  if (!commentsResponse.success) {
    return withFallbackMessage(commentsResponse, 'Could not load task comments.');
  }

  return {
    success: true,
    data: {
      task: taskResponse.data,
      attachments: mediaResponse.data.items,
      comments: commentsResponse.data,
    },
  };
}
