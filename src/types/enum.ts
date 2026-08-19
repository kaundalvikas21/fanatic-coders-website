import type { components } from './backend-types';

type Schemas = components['schemas'];

export type LeadStatus = Schemas['LeadStatus'];
export type LeadSource = Schemas['LeadSource'];
export type ServiceInterest = Schemas['ServiceInterest'];
export type ServiceRequestStatus = Schemas['ServiceRequestStatus'];
export type ProjectStatus = Schemas['ProjectStatus'];
export type ProjectMemberRole = Schemas['ProjectMemberRole'];
export type ProjectCurrency = Schemas['ProjectCurrency'];

export const LEAD_STATUSES = [
  'NEW',
  'QUALIFIED',
  'IN_PROGRESS',
  'DEAD',
] as const satisfies readonly LeadStatus[];

export const LEAD_STATUS_OPTIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'DEAD', label: 'Closed' },
] as const satisfies readonly { value: LeadStatus; label: string }[];

export const LEAD_STATUS_BADGE_VARIANTS = {
  NEW: 'default',
  QUALIFIED: 'secondary',
  IN_PROGRESS: 'secondary',
  DEAD: 'outline',
} as const satisfies Record<LeadStatus, 'default' | 'secondary' | 'outline'>;
export const LEAD_STATUS_COLORS = {
  NEW: 'blue',
  QUALIFIED: 'green',
  IN_PROGRESS: 'amber',
  DEAD: 'gray',
} as const;

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

export const SERVICE_REQUEST_STATUSES = [
  'NEW',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
] as const satisfies readonly ServiceRequestStatus[];

export const SERVICE_REQUEST_STATUS_OPTIONS = [
  { value: 'NEW', label: 'New' },
  { value: 'IN_PROGRESS', label: 'In progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const satisfies readonly { value: ServiceRequestStatus; label: string }[];

export const SERVICE_REQUEST_STATUS_BADGE_VARIANTS = {
  NEW: 'default',
  IN_PROGRESS: 'secondary',
  COMPLETED: 'outline',
  CANCELLED: 'destructive',
} as const satisfies Record<
  ServiceRequestStatus,
  'default' | 'secondary' | 'outline' | 'destructive'
>;
export const SERVICE_REQUEST_STATUS_COLORS = {
  NEW: 'blue',
  IN_PROGRESS: 'amber',
  COMPLETED: 'green',
  CANCELLED: 'red',
} as const;

export const PROJECT_STATUSES = [
  'PLANNING',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'ARCHIVED',
] as const satisfies readonly ProjectStatus[];

export const PROJECT_STATUS_OPTIONS = [
  { value: 'PLANNING', label: 'Planning' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'ON_HOLD', label: 'On hold' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ARCHIVED', label: 'Archived' },
] as const satisfies readonly { value: ProjectStatus; label: string }[];

export const PROJECT_STATUS_BADGE_VARIANTS = {
  PLANNING: 'default',
  ACTIVE: 'secondary',
  ON_HOLD: 'outline',
  COMPLETED: 'outline',
  ARCHIVED: 'destructive',
} as const satisfies Record<ProjectStatus, 'default' | 'secondary' | 'outline' | 'destructive'>;
export const PROJECT_STATUS_COLORS = {
  PLANNING: 'blue',
  ACTIVE: 'green',
  ON_HOLD: 'amber',
  COMPLETED: 'green',
  ARCHIVED: 'gray',
} as const;

export const PROJECT_CURRENCIES = ['USD'] as const satisfies readonly ProjectCurrency[];

export const DEFAULT_PROJECT_CURRENCY = 'USD' satisfies ProjectCurrency;

export const PROJECT_CURRENCY_OPTIONS = [
  { value: 'USD', label: 'USD' },
] as const satisfies readonly { value: ProjectCurrency; label: string }[];
