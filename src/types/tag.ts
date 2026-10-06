import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Tag = Schemas['Tag'];
export type PaginatedTags = Schemas['TagsResponse']['data'];
export type TagsResponse = Response<PaginatedTags>;
export type TagResponse = Response<Tag>;
export type CreateTagInput = Schemas['CreateTagRequest'];
export type UpdateTagInput = Schemas['UpdateTagRequest'];

export type GetTagsInput = NonNullable<operations['getTags']['parameters']['query']>;
export type GetTagsResponse = TagsResponse;
export type CreateTagRequest = CreateTagInput;
export type CreateTagResponse = TagResponse;
export type GetTagByIdParams = operations['getTagById']['parameters']['path'];
export type GetTagByIdResponse = TagResponse;
export type UpdateTagByIdParams = operations['updateTagById']['parameters']['path'];
export type UpdateTagByIdRequest = UpdateTagInput;
export type UpdateTagByIdResponse = TagResponse;
export type DeleteTagByIdParams = operations['deleteTagById']['parameters']['path'];
export type DeleteTagByIdResponse = TagResponse;
