import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Media = Schemas['Media'];
export type ProjectMediaList = Schemas['ProjectMediaListResponse']['data'];
export type ProjectMediaResponse = Response<Media>;
export type ProjectMediaListResponse = Response<ProjectMediaList>;
export type GetProjectMediaInput = NonNullable<
  operations['getProjectMedia']['parameters']['query']
>;

export type TaskMediaList = Schemas['TaskMediaListResponse']['data'];
export type TaskMediaResponse = Response<Schemas['MediaResponse']['data']>;
export type TaskMediaListResponse = Response<TaskMediaList>;
export type GetTaskMediaInput = NonNullable<operations['getTaskMedia']['parameters']['query']>;
