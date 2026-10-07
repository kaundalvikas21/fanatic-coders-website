import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Blog = Schemas['Blog'];
export type BlogSeo = Schemas['BlogSeo'];
export type BlogSeoInput = Pick<BlogSeo, 'metaTitle' | 'metaDescription'>;
export type BlogSummary = Schemas['BlogSummary'];
export type TiptapDocument = Schemas['TiptapDocument'];
export type CreateBlogInput = Schemas['CreateBlogRequest'] & { blogSeo?: BlogSeoInput };
export type UpdateBlogInput = Schemas['UpdateBlogRequest'] & { blogSeo?: BlogSeoInput | null };

export type PaginatedBlogs = Schemas['BlogsResponse']['data'];
export type BlogsResponse = Response<PaginatedBlogs>;
export type BlogResponse = Response<Blog>;

export type GetBlogsInput = NonNullable<operations['getBlogs']['parameters']['query']>;
export type GetBlogsResponse = BlogsResponse;
export type GetPublishedBlogsInput = NonNullable<
  operations['getPublishedBlogs']['parameters']['query']
>;
export type GetPublishedBlogsResponse = BlogsResponse;
export type GetPublishedBlogBySlugParams =
  operations['getPublishedBlogBySlug']['parameters']['path'];
export type GetPublishedBlogBySlugResponse = BlogResponse;
export type CreateBlogRequest = CreateBlogInput;
export type CreateBlogResponse = BlogResponse;
export type GetBlogByIdParams = operations['getBlogById']['parameters']['path'];
export type GetBlogByIdResponse = BlogResponse;
export type UpdateBlogByIdParams = operations['updateBlogById']['parameters']['path'];
export type UpdateBlogByIdRequest = UpdateBlogInput;
export type UpdateBlogByIdResponse = BlogResponse;
export type DeleteBlogByIdParams = operations['deleteBlogById']['parameters']['path'];
export type DeleteBlogByIdResponse = BlogResponse;
export type UpdateBlogFeatureImageByIdParams =
  operations['updateBlogFeatureImageById']['parameters']['path'];
export type UpdateBlogFeatureImageByIdRequest =
  operations['updateBlogFeatureImageById']['requestBody']['content']['multipart/form-data'];
export type UpdateBlogFeatureImageByIdResponse = BlogResponse;
export type DeleteBlogFeatureImageByIdParams =
  operations['deleteBlogFeatureImageById']['parameters']['path'];
export type DeleteBlogFeatureImageByIdResponse = BlogResponse;
