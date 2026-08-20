import type { operations } from './backend-types';
import type { Pagination, Response, Schemas } from './api';

export type Media = Schemas['Media'];
export type ProjectMediaList = {
  items: Media[];
  pagination: Pagination;
};
export type ProjectMediaResponse = Response<Media>;
export type ProjectMediaListResponse = Response<ProjectMediaList>;
export type GetProjectMediaInput = NonNullable<
  operations['getProjectMedia']['parameters']['query']
>;
