import type { Response, Schemas } from './api';

export type Project = Schemas['Project'];
export type ProjectMember = Schemas['ProjectMember'];
export type CreateProjectInput = Schemas['CreateProjectRequest'];
export type CreateProjectFromServiceRequestInput =
  Schemas['CreateProjectFromServiceRequestRequest'];
export type UpdateProjectInput = Schemas['UpdateProjectRequest'];

export type ProjectsResponse = Response<Project[]>;
export type ProjectResponse = Response<Project>;
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
