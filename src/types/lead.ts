import type { components, operations } from './backend-types';

type Schemas = components['schemas'];
type Operation<TName extends keyof operations> = operations[TName];
type JsonRequest<TName extends keyof operations> =
  Operation<TName> extends { requestBody: { content: { 'application/json': infer TRequest } } }
    ? TRequest
    : never;
type JsonResponse<
  TName extends keyof operations,
  TStatus extends keyof Operation<TName>['responses'],
> = Operation<TName>['responses'][TStatus] extends {
  content: { 'application/json': infer TResponse };
}
  ? TResponse
  : never;
type PathParams<TName extends keyof operations> = Operation<TName>['parameters'] extends {
  path: infer TPath;
}
  ? TPath
  : never;

export type Lead = Schemas['Lead'];
export type LeadsResponse = Schemas['LeadsResponse'];
export type LeadResponse = Schemas['LeadResponse'];
export type CreateLeadInput = Schemas['CreateLeadRequest'];
export type UpdateLeadInput = Schemas['UpdateLeadRequest'];

export type GetLeadsResponse = JsonResponse<'getLeads', 200>;
export type CreateLeadRequest = JsonRequest<'createLead'>;
export type CreateLeadResponse = JsonResponse<'createLead', 201>;
export type GetLeadByIdParams = PathParams<'getLeadById'>;
export type GetLeadByIdResponse = JsonResponse<'getLeadById', 200>;
export type UpdateLeadByIdParams = PathParams<'updateLeadById'>;
export type UpdateLeadByIdRequest = JsonRequest<'updateLeadById'>;
export type UpdateLeadByIdResponse = JsonResponse<'updateLeadById', 200>;
export type DeleteLeadByIdParams = PathParams<'deleteLeadById'>;
export type DeleteLeadByIdResponse = JsonResponse<'deleteLeadById', 200>;

export type CreatePublicLeadRequest = CreateLeadRequest;
export type CreatePublicLeadResponse = CreateLeadResponse;
