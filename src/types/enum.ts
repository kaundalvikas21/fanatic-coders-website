import type { components } from './backend-types';

type Schemas = components['schemas'];

export type LeadStatus = Schemas['LeadStatus'];
export type LeadSource = Schemas['LeadSource'];
export type ServiceInterest = Schemas['ServiceInterest'];

export const LEAD_STATUSES = [
  'NEW',
  'IN_PROGRESS',
  'DEAD',
] as const satisfies readonly LeadStatus[];

export const LEAD_STATUS_OPTIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'DEAD', label: 'Closed' },
] as const satisfies readonly { value: LeadStatus; label: string }[];

export const LEAD_STATUS_BADGE_VARIANTS = {
  NEW: 'default',
  IN_PROGRESS: 'secondary',
  DEAD: 'outline',
} as const satisfies Record<LeadStatus, 'default' | 'secondary' | 'outline'>;

export const LEAD_SOURCES = ['CONTACT_FORM'] as const satisfies readonly LeadSource[];

export const SERVICE_INTERESTS = [
  'GOOGLE_ADS',
  'SEO',
  'WEB_DEVELOPMENT',
  'MOBILE_APP_DEVELOPMENT',
  'GENERAL_MARKETING',
  'OTHER',
] as const satisfies readonly ServiceInterest[];

export const SERVICE_INTEREST_OPTIONS = [
  { value: 'WEB_DEVELOPMENT', label: 'Web development' },
  { value: 'MOBILE_APP_DEVELOPMENT', label: 'Mobile app development' },
  { value: 'SEO', label: 'SEO' },
  { value: 'GOOGLE_ADS', label: 'Google Ads' },
  { value: 'GENERAL_MARKETING', label: 'General marketing' },
  { value: 'OTHER', label: 'Other' },
] as const satisfies readonly { value: ServiceInterest; label: string }[];
