import type { LeadSource, ServiceInterest } from '@/types';

export const leadServiceLabels = {
  WEB_DEVELOPMENT: 'Web development',
  MOBILE_APP_DEVELOPMENT: 'Mobile app development',
  SEO: 'SEO',
  GOOGLE_ADS: 'Google Ads',
  GENERAL_MARKETING: 'General marketing',
  OTHER: 'Other',
} satisfies Record<ServiceInterest, string>;

export const leadSourceLabels = {
  CONTACT_FORM: 'Contact form',
} satisfies Record<LeadSource, string>;
