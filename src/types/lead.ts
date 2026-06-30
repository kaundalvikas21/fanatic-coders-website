import type { components, operations } from './backend-types';

type Schemas = components['schemas'];

export type Lead = Schemas['Lead'];
export type CreateLeadInput = Schemas['CreateLeadRequest'];
export type LeadResponse = Schemas['LeadResponse'];
export type CreatePublicLeadRequest =
  operations['createPublicLead']['requestBody']['content']['application/json'];
export type CreatePublicLeadResponse =
  operations['createPublicLead']['responses'][201]['content']['application/json'];
