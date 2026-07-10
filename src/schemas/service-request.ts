import { z } from 'zod';
import {
  SERVICE_INTERESTS,
  SERVICE_REQUEST_STATUSES,
  type ServiceInterest,
  type ServiceRequestStatus,
} from '@/types';

const mobileAppPlatforms = ['IOS', 'ANDROID', 'BOTH'] as const;

const requiredTextSchema = z.string().trim().min(2).max(255);
const optionalUrlSchema = z
  .string()
  .trim()
  .url()
  .optional()
  .or(z.literal('').transform(() => undefined));
const textArraySchema = z.array(z.string().trim().min(1)).default([]);
const positiveNumberSchema = z.coerce.number().positive();

export const serviceInterestSchema = z.enum(SERVICE_INTERESTS);
export const serviceRequestStatusSchema = z.enum(SERVICE_REQUEST_STATUSES);
export const mobileAppPlatformSchema = z.enum(mobileAppPlatforms);

export const seoServiceRequestDataSchema = z.object({
  websiteUrl: z.string().trim().url(),
  targetKeywords: textArraySchema,
  competitors: textArraySchema,
});

export const googleAdsServiceRequestDataSchema = z.object({
  monthlyBudget: positiveNumberSchema,
  targetLocations: textArraySchema,
  campaignGoal: requiredTextSchema,
});

export const webDevelopmentServiceRequestDataSchema = z.object({
  projectType: requiredTextSchema,
  pageCount: z.coerce.number().int().positive().optional(),
  existingWebsiteUrl: optionalUrlSchema,
  requiredFeatures: textArraySchema,
});

export const mobileAppDevelopmentServiceRequestDataSchema = z.object({
  appType: requiredTextSchema,
  platforms: z.array(mobileAppPlatformSchema).min(1),
  requiredFeatures: textArraySchema,
});

export const generalMarketingServiceRequestDataSchema = z.object({
  monthlyBudget: positiveNumberSchema.optional(),
  goals: textArraySchema,
  channels: textArraySchema,
});

export const otherServiceRequestDataSchema = z.object({
  message: z.string().trim().min(10).max(2000),
});

export const serviceRequestDataSchemas = {
  SEO: seoServiceRequestDataSchema,
  GOOGLE_ADS: googleAdsServiceRequestDataSchema,
  WEB_DEVELOPMENT: webDevelopmentServiceRequestDataSchema,
  MOBILE_APP_DEVELOPMENT: mobileAppDevelopmentServiceRequestDataSchema,
  GENERAL_MARKETING: generalMarketingServiceRequestDataSchema,
  OTHER: otherServiceRequestDataSchema,
} as const satisfies Record<ServiceInterest, z.ZodType>;

export const createServiceRequestApiSchema = z.object({
  service: serviceInterestSchema,
  data: z.record(z.string(), z.unknown()).optional(),
});

const createSeoServiceRequestSchema = z.object({
  service: z.literal('SEO'),
  data: seoServiceRequestDataSchema,
});

const createGoogleAdsServiceRequestSchema = z.object({
  service: z.literal('GOOGLE_ADS'),
  data: googleAdsServiceRequestDataSchema,
});

const createWebDevelopmentServiceRequestSchema = z.object({
  service: z.literal('WEB_DEVELOPMENT'),
  data: webDevelopmentServiceRequestDataSchema,
});

const createMobileAppDevelopmentServiceRequestSchema = z.object({
  service: z.literal('MOBILE_APP_DEVELOPMENT'),
  data: mobileAppDevelopmentServiceRequestDataSchema,
});

const createGeneralMarketingServiceRequestSchema = z.object({
  service: z.literal('GENERAL_MARKETING'),
  data: generalMarketingServiceRequestDataSchema,
});

const createOtherServiceRequestSchema = z.object({
  service: z.literal('OTHER'),
  data: otherServiceRequestDataSchema,
});

export const createServiceRequestFormSchema = z.discriminatedUnion('service', [
  createSeoServiceRequestSchema,
  createGoogleAdsServiceRequestSchema,
  createWebDevelopmentServiceRequestSchema,
  createMobileAppDevelopmentServiceRequestSchema,
  createGeneralMarketingServiceRequestSchema,
  createOtherServiceRequestSchema,
]);

export const updateServiceRequestSchema = z
  .object({
    status: serviceRequestStatusSchema.optional(),
    data: z.record(z.string(), z.unknown()).optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'At least one field is required.',
  });

export type SeoServiceRequestData = z.infer<typeof seoServiceRequestDataSchema>;
export type GoogleAdsServiceRequestData = z.infer<typeof googleAdsServiceRequestDataSchema>;
export type WebDevelopmentServiceRequestData = z.infer<
  typeof webDevelopmentServiceRequestDataSchema
>;
export type MobileAppDevelopmentServiceRequestData = z.infer<
  typeof mobileAppDevelopmentServiceRequestDataSchema
>;
export type GeneralMarketingServiceRequestData = z.infer<
  typeof generalMarketingServiceRequestDataSchema
>;
export type OtherServiceRequestData = z.infer<typeof otherServiceRequestDataSchema>;
export type MobileAppPlatform = z.infer<typeof mobileAppPlatformSchema>;
export type CreateServiceRequestApiInput = z.infer<typeof createServiceRequestApiSchema>;
export type CreateServiceRequestFormInput = z.infer<typeof createServiceRequestFormSchema>;
export type UpdateServiceRequestFormInput = z.infer<typeof updateServiceRequestSchema>;

export type ServiceRequestTemplate<TService extends ServiceInterest = ServiceInterest> = {
  service: TService;
  title: string;
  description: string;
  schema: (typeof serviceRequestDataSchemas)[TService];
};

export const serviceRequestTemplates = {
  SEO: {
    service: 'SEO',
    title: 'SEO',
    description: 'Collect website, keyword, and competitor details.',
    schema: seoServiceRequestDataSchema,
  },
  GOOGLE_ADS: {
    service: 'GOOGLE_ADS',
    title: 'Google Ads',
    description: 'Collect ad budget, target location, and campaign goals.',
    schema: googleAdsServiceRequestDataSchema,
  },
  WEB_DEVELOPMENT: {
    service: 'WEB_DEVELOPMENT',
    title: 'Web development',
    description: 'Collect project type, page count, website, and feature needs.',
    schema: webDevelopmentServiceRequestDataSchema,
  },
  MOBILE_APP_DEVELOPMENT: {
    service: 'MOBILE_APP_DEVELOPMENT',
    title: 'Mobile app development',
    description: 'Collect app type, target platforms, and feature needs.',
    schema: mobileAppDevelopmentServiceRequestDataSchema,
  },
  GENERAL_MARKETING: {
    service: 'GENERAL_MARKETING',
    title: 'General marketing',
    description: 'Collect goals, channels, and budget details.',
    schema: generalMarketingServiceRequestDataSchema,
  },
  OTHER: {
    service: 'OTHER',
    title: 'Other',
    description: 'Collect custom service request details.',
    schema: otherServiceRequestDataSchema,
  },
} as const satisfies Record<ServiceInterest, ServiceRequestTemplate>;

export const getServiceRequestTemplate = (service: ServiceInterest) =>
  serviceRequestTemplates[service];

export const parseServiceRequestData = (service: ServiceInterest, data: unknown) =>
  serviceRequestDataSchemas[service].parse(data);

export const isServiceRequestStatus = (status: string): status is ServiceRequestStatus =>
  SERVICE_REQUEST_STATUSES.includes(status as ServiceRequestStatus);
