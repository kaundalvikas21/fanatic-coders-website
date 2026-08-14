import { z } from 'zod';
import {
  SERVICE_INTERESTS,
  SERVICE_REQUEST_STATUSES,
  type ServiceInterest,
  type ServiceRequestStatus,
} from '@/types';

const mobileAppPlatforms = ['IOS', 'ANDROID', 'BOTH'] as const;
const communicationChannels = ['EMAIL', 'PHONE', 'WHATSAPP', 'PORTAL'] as const;

const textSchema = z.string().trim();
const requiredTextSchema = textSchema.min(2).max(255);
const requiredLongTextSchema = textSchema.min(10).max(2000);
const longTextSchema = textSchema.max(2000).optional().default('');
const optionalTextSchema = textSchema.optional().default('');
const emailSchema = z.email();
const optionalUrlSchema = z
  .preprocess((value) => (value === '' ? undefined : value), z.url().optional())
  .optional();
const requiredUrlSchema = z.url();
const textArraySchema = z.array(z.string().trim().min(1)).default([]);
const positiveNumberSchema = z.coerce.number().positive();

export const serviceInterestSchema = z.enum(SERVICE_INTERESTS);
export const serviceRequestStatusSchema = z.enum(SERVICE_REQUEST_STATUSES);
export const mobileAppPlatformSchema = z.enum(mobileAppPlatforms);
export const communicationChannelSchema = z.enum(communicationChannels);

export const commonServiceRequestDataSchema = z.object({
  companyName: requiredTextSchema,
  websiteUrl: requiredUrlSchema,
  industryVertical: requiredTextSchema,
  primaryContactName: requiredTextSchema,
  primaryContactEmail: emailSchema,
  primaryContactPhone: requiredTextSchema,
  timezone: requiredTextSchema,
  preferredCommunicationChannel: communicationChannelSchema,
  billingContact: optionalTextSchema,
  companySize: optionalTextSchema,
  annualRevenueRange: optionalTextSchema,
  attributionSource: optionalTextSchema,
  existingTools: textArraySchema,
  primaryBusinessGoals: textArraySchema,
  budgetRange: requiredTextSchema,
  timelineExpectations: requiredTextSchema,
  competitorUrls: textArraySchema,
  brandGuidelinesNotes: longTextSchema,
});

export const seoServiceSpecificDataSchema = z.object({
  primaryDomain: requiredUrlSchema,
  cmsPlatform: optionalTextSchema,
  cmsAccessLevel: optionalTextSchema,
  googleSearchConsoleAccess: optionalTextSchema,
  ga4PropertyId: optionalTextSchema,
  currentOrganicTraffic: optionalTextSchema,
  targetKeywords: textArraySchema,
  contentInventory: optionalTextSchema,
  inHouseContentCapability: optionalTextSchema,
  backlinkHistory: optionalTextSchema,
  knownTechnicalIssues: longTextSchema,
  localSeoNeeds: longTextSchema,
  internationalSeoNeeds: longTextSchema,
  previousSeoWork: longTextSchema,
});

export const googleAdsServiceSpecificDataSchema = z.object({
  googleAdsAccountId: optionalTextSchema,
  newAccountNeeded: optionalTextSchema,
  currentMonthlyAdSpend: positiveNumberSchema.optional(),
  historicalMonthlyAdSpend: longTextSchema,
  targetCpaRoas: optionalTextSchema,
  conversionActions: textArraySchema,
  conversionTrackingMethod: optionalTextSchema,
  landingPageUrls: textArraySchema,
  geographicTargeting: textArraySchema,
  languageTargeting: textArraySchema,
  negativeKeywords: longTextSchema,
  remarketingLists: longTextSchema,
  merchantCenterId: optionalTextSchema,
  productFeedUrl: optionalUrlSchema,
  previousAgencyExperience: longTextSchema,
  mccAccessDelegation: optionalTextSchema,
});

export const webDevelopmentServiceSpecificDataSchema = z.object({
  projectType: requiredTextSchema,
  currentWebsiteUrl: optionalUrlSchema,
  hostingProvider: optionalTextSchema,
  preferredTechStack: optionalTextSchema,
  domainDnsAccess: optionalTextSchema,
  designReferenceUrls: textArraySchema,
  sitemapWireframesNotes: longTextSchema,
  pageTemplateCount: z.coerce.number().int().positive().optional(),
  ecommerceRequirements: longTextSchema,
  thirdPartyIntegrations: textArraySchema,
  contentOwnership: optionalTextSchema,
  mediaAssetsAvailable: optionalTextSchema,
  accessibilityRequirements: optionalTextSchema,
  performanceRequirements: optionalTextSchema,
  sslStatus: optionalTextSchema,
  maintenanceExpectations: longTextSchema,
});

export const mobileAppDevelopmentServiceSpecificDataSchema = z.object({
  targetPlatforms: z.array(mobileAppPlatformSchema).min(1),
  preferredFramework: optionalTextSchema,
  featureList: textArraySchema,
  designReferences: textArraySchema,
  prototypeLinks: textArraySchema,
  backendRequirements: optionalTextSchema,
  thirdPartyApiIntegrations: textArraySchema,
  storeAccountAccess: optionalTextSchema,
  pushNotificationRequirements: optionalTextSchema,
  offlineFunctionality: optionalTextSchema,
  authenticationMethod: optionalTextSchema,
  expectedUserBase: optionalTextSchema,
  asoNeeds: longTextSchema,
  analyticsPreferences: textArraySchema,
});

export const generalMarketingServiceSpecificDataSchema = z.object({
  activeMarketingChannels: textArraySchema,
  socialMediaHandles: textArraySchema,
  socialAdminAccess: optionalTextSchema,
  emailMarketingPlatform: optionalTextSchema,
  currentEmailListSize: z.coerce.number().int().positive().optional(),
  targetAudiencePersonas: longTextSchema,
  campaignGoals: textArraySchema,
  seasonalCalendar: longTextSchema,
  existingBrandAssets: longTextSchema,
});

export const otherServiceSpecificDataSchema = z.object({
  requestDetails: z.string().trim().min(10).max(2000),
});

export const seoServiceRequestDataSchema = z.object({
  primaryDomain: optionalTextSchema,
  targetKeywords: requiredLongTextSchema,
  localSeoNeeds: requiredLongTextSchema,
  currentOrganicTraffic: longTextSchema,
  primaryBusinessGoals: requiredLongTextSchema,
  competitorUrls: longTextSchema,
  inHouseContentCapability: longTextSchema,
  previousSeoWork: longTextSchema,
  budgetRange: optionalTextSchema,
});
export const googleAdsServiceRequestDataSchema = z.object({
  campaignOffer: requiredLongTextSchema,
  conversionActions: requiredLongTextSchema,
  geographicTargeting: requiredLongTextSchema,
  previousAgencyExperience: longTextSchema,
  targetCpaRoas: optionalTextSchema,
  remarketingLists: longTextSchema,
  landingPageUrls: longTextSchema,
  budgetRange: optionalTextSchema,
  timelineExpectations: optionalTextSchema,
});
export const webDevelopmentServiceRequestDataSchema = z.object({
  industryVertical: requiredLongTextSchema,
  projectType: requiredTextSchema,
  websiteUrl: optionalTextSchema,
  sitemapWireframesNotes: requiredLongTextSchema,
  primaryBusinessGoals: requiredLongTextSchema,
  mediaAssetsAvailable: longTextSchema,
  budgetRange: optionalTextSchema,
  timelineExpectations: optionalTextSchema,
  designReferenceUrls: longTextSchema,
});
export const mobileAppDevelopmentServiceRequestDataSchema = z.object({
  industryVertical: requiredLongTextSchema,
  backendRequirements: requiredLongTextSchema,
  websiteUrl: optionalTextSchema,
  featureList: requiredLongTextSchema,
  targetPlatforms: requiredTextSchema,
  authenticationMethod: longTextSchema,
  prototypeLinks: longTextSchema,
  budgetRange: optionalTextSchema,
  timelineExpectations: optionalTextSchema,
});
export const generalMarketingServiceRequestDataSchema = z.object({
  industryVertical: requiredLongTextSchema,
  primaryBusinessGoals: requiredLongTextSchema,
  websiteUrl: optionalTextSchema,
  targetAudiencePersonas: requiredLongTextSchema,
  activeMarketingChannels: longTextSchema,
  campaignGoals: longTextSchema,
  existingBrandAssets: longTextSchema,
  budgetRange: optionalTextSchema,
  timelineExpectations: optionalTextSchema,
});
export const otherServiceRequestDataSchema = z.object({
  requestDetails: requiredLongTextSchema,
  currentSituation: requiredLongTextSchema,
  desiredOutcome: requiredLongTextSchema,
  existingMaterials: longTextSchema,
  timelineExpectations: optionalTextSchema,
  budgetRange: optionalTextSchema,
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

export const getCreateServiceRequestFormSchema = <TService extends ServiceInterest>(
  service: TService,
) =>
  z.object({
    service: z.literal(service),
    data: serviceRequestDataSchemas[service],
  });

export const updateServiceRequestSchema = z
  .object({
    status: serviceRequestStatusSchema.optional(),
    data: z.record(z.string(), z.unknown()).optional(),
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'At least one field is required.',
  });

export type CommonServiceRequestData = z.infer<typeof commonServiceRequestDataSchema>;
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
export type CommunicationChannel = z.infer<typeof communicationChannelSchema>;
export type CreateServiceRequestApiInput = z.infer<typeof createServiceRequestApiSchema>;
export type CreateServiceRequestFormInput = z.infer<
  ReturnType<typeof getCreateServiceRequestFormSchema>
>;
export type UpdateServiceRequestFormInput = z.infer<typeof updateServiceRequestSchema>;

export type ServiceRequestDataByService = {
  SEO: SeoServiceRequestData;
  GOOGLE_ADS: GoogleAdsServiceRequestData;
  WEB_DEVELOPMENT: WebDevelopmentServiceRequestData;
  MOBILE_APP_DEVELOPMENT: MobileAppDevelopmentServiceRequestData;
  GENERAL_MARKETING: GeneralMarketingServiceRequestData;
  OTHER: OtherServiceRequestData;
};

export const parseServiceRequestData = (service: ServiceInterest, data: unknown) =>
  serviceRequestDataSchemas[service].parse(data);

export const isServiceRequestStatus = (status: string): status is ServiceRequestStatus =>
  SERVICE_REQUEST_STATUSES.includes(status as ServiceRequestStatus);
