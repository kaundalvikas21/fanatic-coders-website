import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Category = Schemas['Category'];
export type PaginatedCategories = Schemas['CategoriesResponse']['data'];
export type CategoriesResponse = Response<PaginatedCategories>;
export type CategoryResponse = Response<Category>;
export type CreateCategoryInput = Schemas['CreateCategoryRequest'];
export type UpdateCategoryInput = Schemas['UpdateCategoryRequest'];

export type GetCategoriesInput = NonNullable<operations['getCategories']['parameters']['query']>;
export type GetCategoriesResponse = CategoriesResponse;
export type CreateCategoryRequest = CreateCategoryInput;
export type CreateCategoryResponse = CategoryResponse;
export type GetCategoryByIdParams = operations['getCategoryById']['parameters']['path'];
export type GetCategoryByIdResponse = CategoryResponse;
export type UpdateCategoryByIdParams = operations['updateCategoryById']['parameters']['path'];
export type UpdateCategoryByIdRequest = UpdateCategoryInput;
export type UpdateCategoryByIdResponse = CategoryResponse;
export type DeleteCategoryByIdParams = operations['deleteCategoryById']['parameters']['path'];
export type DeleteCategoryByIdResponse = CategoryResponse;
