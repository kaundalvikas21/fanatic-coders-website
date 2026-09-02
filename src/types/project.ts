import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Project = Schemas['Project'];
export type ProjectOption = Schemas['ProjectOption'];
export type ProjectMember = Schemas['ProjectMember'];
export type CreateProjectInput = Schemas['CreateProjectRequest'];
export type CreateProjectFromServiceRequestInput =
  Schemas['CreateProjectFromServiceRequestRequest'];
export type UpdateProjectInput = Schemas['UpdateProjectRequest'];

export type PaginatedProjects = Schemas['PaginatedProjects'];
export type ProjectsResponse = Response<PaginatedProjects>;
export type ProjectResponse = Response<Project>;
export type ProjectOptionsResponse = Response<ProjectOption[]>;
export type GetProjectsInput = NonNullable<operations['getProjects']['parameters']['query']>;
export type GetProjectsResponse = ProjectsResponse;
export type CreateProjectRequest = CreateProjectInput;
export type CreateProjectResponse = ProjectResponse;
export type CreateProjectFromServiceRequestRequest = CreateProjectFromServiceRequestInput;
export type CreateProjectFromServiceRequestResponse = ProjectResponse;
export type GetProjectByIdParams = { id: string };
export type GetProjectByIdResponse = ProjectResponse;
export type UpdateProjectByIdParams = { id: string };
export type UpdateProjectByIdRequest = UpdateProjectInput;
export type UpdateProjectByIdResponse = ProjectResponse;
export type DeleteProjectByIdParams = { id: string };
export type DeleteProjectByIdResponse = ProjectResponse;
