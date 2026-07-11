import {
  generalMarketingServiceRequestDataSchema,
  googleAdsServiceRequestDataSchema,
  mobileAppDevelopmentServiceRequestDataSchema,
  otherServiceRequestDataSchema,
  seoServiceRequestDataSchema,
  webDevelopmentServiceRequestDataSchema,
  type ServiceRequestDataByService,
} from '@/modules/service-requests/schemas/zod';
import type { ServiceInterest } from '@/types';

export type ServiceRequestFieldInput =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'number'
  | 'textarea'
  | 'tags'
  | 'select'
  | 'multi-select';

export type ServiceRequestFieldOption<TValue = string> = {
  value: TValue;
  label: string;
};

export type ServiceRequestTemplateField = {
  name: string;
  label: string;
  input: ServiceRequestFieldInput;
  defaultValue: unknown;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options?: readonly ServiceRequestFieldOption[];
};

export type ServiceRequestTemplateStep = {
  id: 'company-info' | 'goals-scope' | 'service-specific' | 'review';
  title: string;
  description: string;
  fields: readonly ServiceRequestTemplateField[];
};

export type ServiceRequestTemplate<TService extends ServiceInterest = ServiceInterest> = {
  service: TService;
  title: string;
  description: string;
  schema: (typeof serviceRequestTemplateSchemas)[TService];
  steps: readonly ServiceRequestTemplateStep[];
};

const communicationChannelOptions = [
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Phone' },
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'PORTAL', label: 'Portal' },
] as const;

const mobilePlatformOptions = [
  { value: 'IOS', label: 'iOS' },
  { value: 'ANDROID', label: 'Android' },
  { value: 'BOTH', label: 'Both' },
] as const;

const companyInfoFields = [
  {
    name: 'companyName',
    label: 'Company name',
    input: 'text',
    defaultValue: '',
    required: true,
  },
  {
    name: 'websiteUrl',
    label: 'Website URL',
    input: 'url',
    defaultValue: '',
    placeholder: 'https://example.com',
    required: true,
  },
  {
    name: 'industryVertical',
    label: 'Industry / vertical',
    input: 'text',
    defaultValue: '',
    required: true,
  },
  {
    name: 'primaryContactName',
    label: 'Primary contact name',
    input: 'text',
    defaultValue: '',
    required: true,
  },
  {
    name: 'primaryContactEmail',
    label: 'Primary contact email',
    input: 'email',
    defaultValue: '',
    required: true,
  },
  {
    name: 'primaryContactPhone',
    label: 'Primary contact phone',
    input: 'tel',
    defaultValue: '',
    required: true,
  },
  {
    name: 'timezone',
    label: 'Timezone',
    input: 'text',
    defaultValue: '',
    placeholder: 'Asia/Dubai',
    required: true,
  },
  {
    name: 'preferredCommunicationChannel',
    label: 'Preferred communication channel',
    input: 'select',
    defaultValue: 'EMAIL',
    required: true,
    options: communicationChannelOptions,
  },
  {
    name: 'billingContact',
    label: 'Secondary / billing contact',
    input: 'text',
    defaultValue: '',
  },
  {
    name: 'companySize',
    label: 'Company size',
    input: 'text',
    defaultValue: '',
    placeholder: '1-10, 11-50, 51-200',
  },
  {
    name: 'annualRevenueRange',
    label: 'Annual revenue range',
    input: 'text',
    defaultValue: '',
  },
  {
    name: 'attributionSource',
    label: 'How did you hear about us?',
    input: 'text',
    defaultValue: '',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const goalsScopeFields = [
  {
    name: 'existingTools',
    label: 'Existing tools / platforms',
    input: 'tags',
    defaultValue: [],
    placeholder: 'GA4, Shopify, HubSpot',
  },
  {
    name: 'primaryBusinessGoals',
    label: 'Primary business goals',
    input: 'tags',
    defaultValue: [],
    placeholder: 'Lead gen, e-commerce sales, local traffic',
  },
  {
    name: 'budgetRange',
    label: 'Budget range',
    input: 'text',
    defaultValue: '',
    required: true,
  },
  {
    name: 'timelineExpectations',
    label: 'Timeline expectations',
    input: 'text',
    defaultValue: '',
    required: true,
  },
  {
    name: 'competitorUrls',
    label: 'Competitor URLs',
    input: 'tags',
    defaultValue: [],
    placeholder: 'https://competitor.com',
  },
  {
    name: 'brandGuidelinesNotes',
    label: 'Brand guidelines / asset notes',
    input: 'textarea',
    defaultValue: '',
    description: 'Use this until file upload is connected.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const serviceRequestTemplateSchemas = {
  SEO: seoServiceRequestDataSchema,
  GOOGLE_ADS: googleAdsServiceRequestDataSchema,
  WEB_DEVELOPMENT: webDevelopmentServiceRequestDataSchema,
  MOBILE_APP_DEVELOPMENT: mobileAppDevelopmentServiceRequestDataSchema,
  GENERAL_MARKETING: generalMarketingServiceRequestDataSchema,
  OTHER: otherServiceRequestDataSchema,
} as const;

function commonSteps() {
  return [
    {
      id: 'company-info',
      title: 'Company info',
      description:
        'Company profile, primary contact, billing contact, and baseline account context.',
      fields: companyInfoFields,
    },
    {
      id: 'goals-scope',
      title: 'Goals & scope',
      description: 'Tools, goals, budget, timeline, competitors, and brand guidance.',
      fields: goalsScopeFields,
    },
  ] satisfies readonly ServiceRequestTemplateStep[];
}

function reviewStep() {
  return {
    id: 'review',
    title: 'Review & submit',
    description: 'Review the captured onboarding answers before creating the request.',
    fields: [],
  } satisfies ServiceRequestTemplateStep;
}

export const serviceRequestTemplates = {
  SEO: {
    service: 'SEO',
    title: 'SEO',
    description: 'Collect technical SEO, content, traffic, and access details.',
    schema: serviceRequestTemplateSchemas.SEO,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'SEO details',
        description:
          'Search visibility, CMS, analytics, content, local, and technical SEO context.',
        fields: [
          {
            name: 'primaryDomain',
            label: 'Primary domain',
            input: 'url',
            defaultValue: '',
            required: true,
          },
          { name: 'cmsPlatform', label: 'CMS platform', input: 'text', defaultValue: '' },
          { name: 'cmsAccessLevel', label: 'CMS access level', input: 'text', defaultValue: '' },
          {
            name: 'googleSearchConsoleAccess',
            label: 'Google Search Console access',
            input: 'text',
            defaultValue: '',
            description: 'Prefer email delegation instead of password sharing.',
          },
          { name: 'ga4PropertyId', label: 'GA4 property ID', input: 'text', defaultValue: '' },
          {
            name: 'currentOrganicTraffic',
            label: 'Current organic traffic',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'targetKeywords',
            label: 'Target keywords',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'contentInventory',
            label: 'Existing content inventory',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'inHouseContentCapability',
            label: 'In-house content capability',
            input: 'text',
            defaultValue: '',
          },
          { name: 'backlinkHistory', label: 'Backlink history', input: 'text', defaultValue: '' },
          {
            name: 'knownTechnicalIssues',
            label: 'Known technical issues',
            input: 'textarea',
            defaultValue: '',
          },
          { name: 'localSeoNeeds', label: 'Local SEO needs', input: 'textarea', defaultValue: '' },
          {
            name: 'internationalSeoNeeds',
            label: 'International SEO needs',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'previousSeoWork',
            label: 'Previous SEO work',
            input: 'textarea',
            defaultValue: '',
          },
        ],
      },
      reviewStep(),
    ],
  },
  GOOGLE_ADS: {
    service: 'GOOGLE_ADS',
    title: 'Google Ads',
    description: 'Collect account, spend, conversion, targeting, and delegation details.',
    schema: serviceRequestTemplateSchemas.GOOGLE_ADS,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'Google Ads details',
        description: 'Ad account, tracking, spend, audiences, products, and MCC delegation.',
        fields: [
          {
            name: 'googleAdsAccountId',
            label: 'Google Ads account ID',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'newAccountNeeded',
            label: 'New account needed?',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'currentMonthlyAdSpend',
            label: 'Current monthly ad spend',
            input: 'number',
            defaultValue: undefined,
          },
          {
            name: 'historicalMonthlyAdSpend',
            label: 'Historical monthly ad spend',
            input: 'textarea',
            defaultValue: '',
          },
          { name: 'targetCpaRoas', label: 'Target CPA / ROAS', input: 'text', defaultValue: '' },
          {
            name: 'conversionActions',
            label: 'Conversion actions',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'conversionTrackingMethod',
            label: 'Conversion tracking method',
            input: 'text',
            defaultValue: '',
          },
          { name: 'landingPageUrls', label: 'Landing page URLs', input: 'tags', defaultValue: [] },
          {
            name: 'geographicTargeting',
            label: 'Geographic targeting',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'languageTargeting',
            label: 'Language targeting',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'negativeKeywords',
            label: 'Negative keywords',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'remarketingLists',
            label: 'Remarketing lists',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'merchantCenterId',
            label: 'Merchant Center ID',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'productFeedUrl',
            label: 'Product feed URL',
            input: 'url',
            defaultValue: undefined,
          },
          {
            name: 'previousAgencyExperience',
            label: 'Previous agency / consultant experience',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'mccAccessDelegation',
            label: 'MCC access delegation',
            input: 'text',
            defaultValue: '',
            description: 'Provide the admin email to grant access to Fanatic Coders MCC.',
          },
        ],
      },
      reviewStep(),
    ],
  },
  WEB_DEVELOPMENT: {
    service: 'WEB_DEVELOPMENT',
    title: 'Web development',
    description: 'Collect build scope, stack, hosting, integrations, content, and launch needs.',
    schema: serviceRequestTemplateSchemas.WEB_DEVELOPMENT,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'Web development details',
        description:
          'Project scope, technical requirements, integrations, content, and support needs.',
        fields: [
          {
            name: 'projectType',
            label: 'Project type',
            input: 'text',
            defaultValue: '',
            required: true,
          },
          {
            name: 'currentWebsiteUrl',
            label: 'Current website URL',
            input: 'url',
            defaultValue: undefined,
          },
          { name: 'hostingProvider', label: 'Hosting provider', input: 'text', defaultValue: '' },
          {
            name: 'preferredTechStack',
            label: 'Preferred tech stack',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'domainDnsAccess',
            label: 'Domain / DNS access',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'designReferenceUrls',
            label: 'Design reference URLs',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'sitemapWireframesNotes',
            label: 'Sitemap / wireframes notes',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'pageTemplateCount',
            label: 'Pages / templates needed',
            input: 'number',
            defaultValue: undefined,
          },
          {
            name: 'ecommerceRequirements',
            label: 'E-commerce requirements',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'thirdPartyIntegrations',
            label: 'Third-party integrations',
            input: 'tags',
            defaultValue: [],
          },
          { name: 'contentOwnership', label: 'Content ownership', input: 'text', defaultValue: '' },
          {
            name: 'mediaAssetsAvailable',
            label: 'Media assets available?',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'accessibilityRequirements',
            label: 'Accessibility requirements',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'performanceRequirements',
            label: 'Performance requirements',
            input: 'text',
            defaultValue: '',
          },
          { name: 'sslStatus', label: 'SSL certificate status', input: 'text', defaultValue: '' },
          {
            name: 'maintenanceExpectations',
            label: 'Post-launch support expectations',
            input: 'textarea',
            defaultValue: '',
          },
        ],
      },
      reviewStep(),
    ],
  },
  MOBILE_APP_DEVELOPMENT: {
    service: 'MOBILE_APP_DEVELOPMENT',
    title: 'Mobile app development',
    description:
      'Collect platforms, app scope, backend, store, notification, and analytics details.',
    schema: serviceRequestTemplateSchemas.MOBILE_APP_DEVELOPMENT,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'Mobile app details',
        description: 'Platform, feature, backend, store account, auth, analytics, and ASO context.',
        fields: [
          {
            name: 'targetPlatforms',
            label: 'Target platforms',
            input: 'multi-select',
            defaultValue: [],
            required: true,
            options: mobilePlatformOptions,
          },
          {
            name: 'preferredFramework',
            label: 'Preferred framework',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'featureList',
            label: 'Feature list / user stories',
            input: 'tags',
            defaultValue: [],
          },
          { name: 'designReferences', label: 'Design references', input: 'tags', defaultValue: [] },
          {
            name: 'prototypeLinks',
            label: 'Wireframes / prototype links',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'backendRequirements',
            label: 'Backend requirements',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'thirdPartyApiIntegrations',
            label: 'Third-party API integrations',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'storeAccountAccess',
            label: 'Apple / Google store account access',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'pushNotificationRequirements',
            label: 'Push notification requirements',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'offlineFunctionality',
            label: 'Offline functionality requirements',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'authenticationMethod',
            label: 'Authentication method',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'expectedUserBase',
            label: 'Expected user base',
            input: 'text',
            defaultValue: '',
          },
          { name: 'asoNeeds', label: 'ASO needs', input: 'textarea', defaultValue: '' },
          {
            name: 'analyticsPreferences',
            label: 'Analytics preferences',
            input: 'tags',
            defaultValue: [],
          },
        ],
      },
      reviewStep(),
    ],
  },
  GENERAL_MARKETING: {
    service: 'GENERAL_MARKETING',
    title: 'General marketing',
    description: 'Collect channel, social, email, audience, campaign, and brand asset context.',
    schema: serviceRequestTemplateSchemas.GENERAL_MARKETING,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'Marketing details',
        description:
          'Active channels, access delegation, audience personas, campaign goals, and calendar.',
        fields: [
          {
            name: 'activeMarketingChannels',
            label: 'Active marketing channels',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'socialMediaHandles',
            label: 'Social media handles',
            input: 'tags',
            defaultValue: [],
          },
          {
            name: 'socialAdminAccess',
            label: 'Social admin access delegation',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'emailMarketingPlatform',
            label: 'Email marketing platform',
            input: 'text',
            defaultValue: '',
          },
          {
            name: 'currentEmailListSize',
            label: 'Current email list size',
            input: 'number',
            defaultValue: undefined,
          },
          {
            name: 'targetAudiencePersonas',
            label: 'Target audience personas',
            input: 'textarea',
            defaultValue: '',
          },
          { name: 'campaignGoals', label: 'Campaign goals', input: 'tags', defaultValue: [] },
          {
            name: 'seasonalCalendar',
            label: 'Seasonal / event-based calendar',
            input: 'textarea',
            defaultValue: '',
          },
          {
            name: 'existingBrandAssets',
            label: 'Existing brand assets',
            input: 'textarea',
            defaultValue: '',
          },
        ],
      },
      reviewStep(),
    ],
  },
  OTHER: {
    service: 'OTHER',
    title: 'Other',
    description: 'Collect general onboarding details and custom request context.',
    schema: serviceRequestTemplateSchemas.OTHER,
    steps: [
      ...commonSteps(),
      {
        id: 'service-specific',
        title: 'Request details',
        description: 'Describe the service request that does not fit the predefined services.',
        fields: [
          {
            name: 'requestDetails',
            label: 'Request details',
            input: 'textarea',
            defaultValue: '',
            required: true,
          },
        ],
      },
      reviewStep(),
    ],
  },
} as const satisfies Record<ServiceInterest, ServiceRequestTemplate>;

export const getServiceRequestTemplate = (service: ServiceInterest) =>
  serviceRequestTemplates[service];

export const getServiceRequestDefaultValues = <TService extends ServiceInterest>(
  service: TService,
): ServiceRequestDataByService[TService] => {
  const steps = serviceRequestTemplates[service].steps as readonly ServiceRequestTemplateStep[];
  const fields = steps.flatMap((step) => step.fields);

  return Object.fromEntries(
    fields.map((field) => [field.name, field.defaultValue]),
  ) as ServiceRequestDataByService[TService];
};
