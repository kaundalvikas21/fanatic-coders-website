import type { components } from './backend-types';

type Schemas = components['schemas'];

export type Lead = Schemas['Lead'];

export type CreateLeadInput = Pick<
  Lead,
  'name' | 'email' | 'companyName' | 'serviceInterest' | 'budgetRange'
>;
