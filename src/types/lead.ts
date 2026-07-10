import type { Response, Schemas } from './api';

export type Lead = Schemas['Lead'];
export type LeadsResponse = Response<Lead[]>;
export type LeadResponse = Response<Lead>;
export type CreateLeadInput = Schemas['CreateLeadRequest'];
export type UpdateLeadInput = Schemas['UpdateLeadRequest'];

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
