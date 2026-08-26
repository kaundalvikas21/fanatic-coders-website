import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type TaskComment = Schemas['TaskComment'];
export type TaskCommentList = Schemas['TaskCommentsResponse']['data'];
export type TaskCommentResponse = Response<Schemas['TaskCommentResponse']['data']>;
export type TaskCommentsResponse = Response<TaskCommentList>;
export type CreateTaskCommentRequest = Schemas['CreateTaskCommentRequest'];
export type UpdateTaskCommentRequest = Schemas['UpdateTaskCommentRequest'];
export type GetTaskCommentsInput = NonNullable<
  operations['getTaskComments']['parameters']['query']
>;
