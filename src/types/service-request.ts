import type { Response, Schemas } from './api';

export type ServiceRequestData = Schemas['ServiceRequestData'];
export type ServiceRequest = Schemas['ServiceRequest'];
export type ServiceRequestsResponse = Response<ServiceRequest[]>;
export type ServiceRequestResponse = Response<ServiceRequest>;
export type CreateServiceRequestInput = Schemas['CreateServiceRequestRequest'];
export type UpdateServiceRequestInput = Schemas['UpdateServiceRequestRequest'];

export type GetServiceRequestsResponse = ServiceRequestsResponse;
export type CreateServiceRequestRequest = CreateServiceRequestInput;
export type CreateServiceRequestResponse = ServiceRequestResponse;
export type GetServiceRequestByIdParams = { id: string };
export type GetServiceRequestByIdResponse = ServiceRequestResponse;
export type UpdateServiceRequestByIdParams = { id: string };
export type UpdateServiceRequestByIdRequest = UpdateServiceRequestInput;
export type UpdateServiceRequestByIdResponse = ServiceRequestResponse;
export type DeleteServiceRequestByIdParams = { id: string };
export type DeleteServiceRequestByIdResponse = ServiceRequestResponse;
