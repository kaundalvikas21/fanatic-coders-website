import type { operations } from './backend-types';
import type { Response, Schemas } from './api';

export type Lead = Schemas['Lead'];
export type LeadPagination = Schemas['PaginationMeta'];
export type PaginatedLeads = Schemas['PaginatedLeads'];
export type LeadsResponse = Response<PaginatedLeads>;
export type LeadResponse = Response<Lead>;
export type CreateLeadInput = Schemas['CreateLeadRequest'];
export type UpdateLeadInput = Schemas['UpdateLeadRequest'];

export type GetLeadsInput = NonNullable<operations['getLeads']['parameters']['query']>;
export type GetLeadsResponse = LeadsResponse;
export type CreateLeadRequest = CreateLeadInput;
export type CreateLeadResponse = LeadResponse;
export type GetLeadByIdParams = { id: string };
export type GetLeadByIdResponse = LeadResponse;
export type UpdateLeadByIdParams = { id: string };
export type UpdateLeadByIdRequest = UpdateLeadInput;
export type UpdateLeadByIdResponse = LeadResponse;
export type DeleteLeadByIdParams = { id: string };
export type DeleteLeadByIdResponse = LeadResponse;

export type CreatePublicLeadRequest = CreateLeadRequest;
export type CreatePublicLeadResponse = CreateLeadResponse;
