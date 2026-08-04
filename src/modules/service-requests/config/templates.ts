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

const webDevelopmentCompanyInfoFields = [
  {
    name: 'industryVertical',
    label: 'Tell us briefly about your business.',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We provide accounting services to small businesses across the UAE.',
    description: 'A short explanation of what you offer and who you serve is enough.',
    required: true,
  },
  {
    name: 'projectType',
    label: 'What would you like us to build or improve?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We need a new website that explains our services and generates enquiries.',
    required: true,
  },
  {
    name: 'websiteUrl',
    label: 'Do you have an existing website we should review?',
    input: 'url',
    defaultValue: '',
    placeholder: 'https://yourwebsite.com',
    description: 'Optional. Share it even if it is unfinished or due for replacement.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const seoSearchContextFields = [
  {
    name: 'primaryDomain',
    label: 'Which website do you want people to find?',
    input: 'url',
    defaultValue: '',
    placeholder: 'https://yourwebsite.com',
    description: 'We will use this to review how the site currently appears in search.',
    required: true,
  },
  {
    name: 'targetKeywords',
    label: 'What would someone search when they need what you offer?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Office cleaning company, warehouse cleaning, and commercial cleaners near me.',
    description: 'Write this like a customer. You do not need to prepare an SEO keyword list.',
    required: true,
  },
  {
    name: 'localSeoNeeds',
    label: 'Where are the customers you want to reach?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Businesses in Dubai and Sharjah, especially Business Bay and JLT.',
    description:
      'Mention locations, countries, or languages only when they matter to the business.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const seoCurrentPictureFields = [
  {
    name: 'currentOrganicTraffic',
    label: 'What are you noticing about your search traffic today?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Traffic has stayed flat, and most enquiries still come through referrals.',
    description: 'Numbers are not required. Tell us what you have observed.',
  },
  {
    name: 'primaryBusinessGoals',
    label: 'What should a valuable search visitor do next?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Request a site visit and ask for a commercial cleaning quote.',
    description: 'This connects search visibility to a useful business action.',
    required: true,
  },
  {
    name: 'competitorUrls',
    label: 'Who do you regularly see above or beside you in search results?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'CleanCo and Example Services often appear above us for local searches.',
    description: 'Optional. Business names are enough if you do not have links.',
  },
  {
    name: 'inHouseContentCapability',
    label: 'How involved can your team be with website content?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We can review drafts and provide technical details, but we need help writing.',
    description: 'This helps us recommend a content plan your team can maintain.',
  },
  {
    name: 'previousSeoWork',
    label: 'Has anyone worked on the website’s SEO before?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'A freelancer updated page titles last year, but no ongoing work was completed.',
    description:
      'Mention previous work, a migration, a penalty, or a sudden traffic drop if relevant.',
  },
  {
    name: 'budgetRange',
    label: 'What monthly investment feels realistic for improving organic search?',
    input: 'text',
    defaultValue: '',
    placeholder: 'USD 1,500 to 3,000 per month',
    description:
      'A range helps us suggest a plan that can be maintained long enough to show progress.',
    required: true,
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const googleAdsCampaignFields = [
  {
    name: 'campaignOffer',
    label: 'What do you want to advertise?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Our fixed-price company formation package for new businesses in Dubai.',
    description: 'Describe the product, service, or offer you want customers to see.',
    required: true,
  },
  {
    name: 'conversionActions',
    label: 'What should someone do after clicking the ad?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Book a consultation or call our sales team.',
    description: 'Choose the action that would make the campaign valuable to your business.',
    required: true,
  },
  {
    name: 'geographicTargeting',
    label: 'Where should the people seeing these ads be located?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Dubai and Abu Dhabi, with English and Arabic speaking customers.',
    description:
      'Mention locations and languages that matter. Avoid targeting everywhere by default.',
    required: true,
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const googleAdsReadinessFields = [
  {
    name: 'previousAgencyExperience',
    label: 'Have you run paid search campaigns before?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We ran Google Ads last year. Leads were expensive and many were not relevant.',
    description: 'Tell us what worked, what failed, or say this will be your first campaign.',
  },
  {
    name: 'targetCpaRoas',
    label: 'What is a new lead or sale worth to your business?',
    input: 'text',
    defaultValue: '',
    placeholder: 'An average customer is worth about USD 1,200 in the first year.',
    description: 'An estimate is enough. It helps us judge what acquisition cost can make sense.',
  },
  {
    name: 'remarketingLists',
    label: 'Who is the best-fit customer for this campaign?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'First-time founders who need a mainland business licence within the next month.',
    description:
      'Describe the customer’s situation rather than choosing advertising audience settings.',
  },
  {
    name: 'landingPageUrls',
    label: 'Where should the ads send people?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'https://yourwebsite.com/company-formation\nWe can create a new page if this one is not suitable.',
    description: 'Optional. Share a page or tell us if a landing page still needs to be created.',
  },
  {
    name: 'budgetRange',
    label: 'How much are you comfortable spending each month?',
    input: 'text',
    defaultValue: '',
    placeholder: 'USD 3,000 per month for ads, plus campaign management.',
    description: 'Separate advertising spend from service fees if you already know both amounts.',
    required: true,
  },
  {
    name: 'timelineExpectations',
    label: 'Is the campaign connected to a launch, offer, or fixed date?',
    input: 'text',
    defaultValue: '',
    placeholder: 'Our new package launches on 15 October, and ads should start one week earlier.',
    description: 'Optional. This helps us allow enough time for setup, review, and tracking.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const otherRequestContextFields = [
  {
    name: 'requestDetails',
    label: 'What would you like our help with?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'We need an internal dashboard that combines sales and support data for our managers.',
    description: 'Describe the request in your own words. Technical details are not required.',
    required: true,
  },
  {
    name: 'currentSituation',
    label: 'What is happening today that you want to change?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'Managers export data from three systems and prepare the same report manually each week.',
    description: 'A real example helps us understand why the work matters.',
    required: true,
  },
  {
    name: 'desiredOutcome',
    label: 'What would a useful result look like?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'Managers should open one dashboard and see updated figures without preparing spreadsheets.',
    description:
      'Focus on what should become easier, faster, or possible after the work is complete.',
    required: true,
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const otherRequestPracticalFields = [
  {
    name: 'existingMaterials',
    label: 'What do you already have that could help us understand the request?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We have sample reports, API documentation, and a rough sketch of the dashboard.',
    description:
      'Optional. Mention documents, designs, systems, or examples. Do not share passwords.',
  },
  {
    name: 'timelineExpectations',
    label: 'Does this need to be ready by a particular date?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We would like to use it for our January management meeting.',
    description: 'Optional. Explain what makes the date important.',
  },
  {
    name: 'budgetRange',
    label: 'Is there a budget range we should work within?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We have approved up to USD 8,000 for the first version.',
    description: 'Optional. A rough range helps us suggest an appropriate first step.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const webDevelopmentGoalsScopeFields = [
  {
    name: 'sitemapWireframesNotes',
    label: 'What should visitors be able to do on the website?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'Visitors should be able to compare our services, request a quote, and book a call.',
    description: 'For example, request a quote, book a call, buy a product, or sign in.',
  },
  {
    name: 'primaryBusinessGoals',
    label: 'Which features or outcomes matter most for the first launch?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'A clear service catalogue, online booking, and a simple enquiry form.',
    description: 'Focus on what is essential. We can plan later additions together.',
  },
  {
    name: 'mediaAssetsAvailable',
    label: 'Do you already have copy, designs, photos, or videos?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We have a logo and some photos, but we need help writing the website copy.',
    description: 'Tell us what exists and what may still need to be created.',
  },
  {
    name: 'budgetRange',
    label: 'What budget range have you planned for the website?',
    input: 'text',
    defaultValue: '',
    placeholder: 'USD 5,000 to 10,000',
    description: 'A range helps us recommend an approach that fits instead of guessing.',
    required: true,
  },
  {
    name: 'timelineExpectations',
    label: 'Is there an important deadline?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We would like to launch before our October product event.',
    description: 'Mention any event, campaign, or business commitment connected to the date.',
    required: true,
  },
  {
    name: 'designReferenceUrls',
    label: 'Are there any websites you would like us to review?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'https://example.com/products\nWe like how clearly this site explains each service.',
    description: 'Optional. You can explain what you like about them during our call.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const mobileAppCompanyInfoFields = [
  {
    name: 'industryVertical',
    label: 'Tell us briefly about your business.',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We provide home healthcare services to families across the UAE.',
    description: 'A short explanation of what you offer and who you serve is enough.',
    required: true,
  },
  {
    name: 'backendRequirements',
    label: 'What problem should the app solve for its users?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Customers should be able to book a caregiver and track upcoming visits.',
    description: 'Focus on what users struggle with today and how the app should help.',
    required: true,
  },
  {
    name: 'websiteUrl',
    label: 'Do you have an existing website or product we should review?',
    input: 'url',
    defaultValue: '',
    placeholder: 'https://yourproduct.com',
    description: 'Optional. This helps us understand what already exists.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const mobileAppGoalsScopeFields = [
  {
    name: 'featureList',
    label: 'Which features matter most for the first release?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Account creation, service booking, visit tracking, and reminders.',
    description: 'Focus on the smallest useful version. We can plan later additions together.',
  },
  {
    name: 'targetPlatforms',
    label: 'Should the app work on iPhone, Android, or both?',
    input: 'text',
    defaultValue: '',
    placeholder: 'Both, but we are open to your recommendation.',
    description: 'Not sure yet is fine.',
  },
  {
    name: 'authenticationMethod',
    label: 'Will users sign in, make payments, or store sensitive information?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Users will sign in and save booking details, but payments will happen later.',
    description: 'Mention health, financial, location, or other private information if relevant.',
  },
  {
    name: 'prototypeLinks',
    label: 'Do you already have designs, sketches, or a prototype?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We have rough sketches and a Figma file that we can share.',
    description: 'Optional. A simple written idea is also enough to get started.',
  },
  {
    name: 'budgetRange',
    label: 'What budget range have you planned for the first release?',
    input: 'text',
    defaultValue: '',
    placeholder: 'USD 15,000 to 25,000',
    description: 'A range helps us recommend an approach that fits instead of guessing.',
    required: true,
  },
  {
    name: 'timelineExpectations',
    label: 'Is there an important deadline?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We would like a first release ready before our January launch.',
    description: 'Mention any event, pilot, or business commitment connected to the date.',
    required: true,
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const generalMarketingCompanyInfoFields = [
  {
    name: 'industryVertical',
    label: 'Tell us briefly about your business.',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We run a group of dental clinics serving families across Dubai.',
    description: 'A short explanation of what you offer and who you serve is enough.',
    required: true,
  },
  {
    name: 'primaryBusinessGoals',
    label: 'What business result would you like marketing to improve?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We want more qualified appointment enquiries from families in our local area.',
    description: 'Focus on the result you need, not the marketing channel.',
    required: true,
  },
  {
    name: 'websiteUrl',
    label: 'Do you have a website or social profile we should review?',
    input: 'url',
    defaultValue: '',
    placeholder: 'https://yourbusiness.com',
    description: 'Optional. Share the main online presence for your business.',
  },
] as const satisfies readonly ServiceRequestTemplateField[];

const generalMarketingGoalsScopeFields = [
  {
    name: 'targetAudiencePersonas',
    label: 'Who would you most like to reach?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'Parents aged 30 to 50 who live within 15 km of our clinics.',
    description: 'Describe your ideal customer in your own words.',
  },
  {
    name: 'activeMarketingChannels',
    label: 'How are you currently promoting the business?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'We post on Instagram and receive referrals, but we are not running paid campaigns.',
    description: 'Not sure what each channel is called? A simple description is enough.',
  },
  {
    name: 'campaignGoals',
    label: 'Is there a specific service, product, or offer you want to promote?',
    input: 'textarea',
    defaultValue: '',
    placeholder:
      'We want to promote our new family dental membership before the school term begins.',
    description: 'Leave this blank if you need help deciding what to promote first.',
  },
  {
    name: 'existingBrandAssets',
    label: 'What marketing material do you already have?',
    input: 'textarea',
    defaultValue: '',
    placeholder: 'We have a logo, brand colours, clinic photos, and a few customer testimonials.',
    description:
      'Mention any copy, photos, videos, brand guidelines, or previous campaign material.',
  },
  {
    name: 'budgetRange',
    label: 'What monthly budget have you planned for marketing?',
    input: 'text',
    defaultValue: '',
    placeholder: 'USD 2,000 to 4,000 per month, including advertising spend',
    description: 'A range helps us suggest a realistic mix of work and advertising.',
    required: true,
  },
  {
    name: 'timelineExpectations',
    label: 'Is there an important date or campaign deadline?',
    input: 'text',
    defaultValue: '',
    placeholder: 'We would like the campaign live three weeks before our September opening.',
    description: 'Mention any launch, event, seasonal period, or business commitment.',
    required: true,
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
    description: 'Tell us where you want to be found and what is happening in search today.',
    schema: serviceRequestTemplateSchemas.SEO,
    steps: [
      {
        id: 'company-info',
        title: 'Where you want to be found',
        description: 'Describe how customers search for your business in their own words.',
        fields: seoSearchContextFields,
      },
      {
        id: 'service-specific',
        title: 'Your current search picture',
        description:
          'Tell us what you are seeing today. Reports and exact numbers are not required.',
        fields: seoCurrentPictureFields,
      },
      reviewStep(),
    ],
  },
  GOOGLE_ADS: {
    service: 'GOOGLE_ADS',
    title: 'Google Ads',
    description:
      'Tell us what you want to advertise, who should see it, and what a result is worth.',
    schema: serviceRequestTemplateSchemas.GOOGLE_ADS,
    steps: [
      {
        id: 'company-info',
        title: 'Define the campaign result',
        description:
          'Start with the offer, customer action, and market. Platform settings come later.',
        fields: googleAdsCampaignFields,
      },
      {
        id: 'service-specific',
        title: 'Check campaign readiness',
        description:
          'These answers help us judge whether the offer, page, and budget can work together.',
        fields: googleAdsReadinessFields,
      },
      reviewStep(),
    ],
  },
  WEB_DEVELOPMENT: {
    service: 'WEB_DEVELOPMENT',
    title: 'Web development',
    description: 'Tell us about your business, website goals, and what you would like to build.',
    schema: serviceRequestTemplateSchemas.WEB_DEVELOPMENT,
    steps: [
      {
        id: 'company-info',
        title: 'Tell us about your business',
        description: 'A little context helps us understand your request before we talk.',
        fields: webDevelopmentCompanyInfoFields,
      },
      {
        id: 'service-specific',
        title: 'Tell us about the website',
        description: 'Share your goals and what you have in mind. A rough answer is enough.',
        fields: webDevelopmentGoalsScopeFields,
      },
      reviewStep(),
    ],
  },
  MOBILE_APP_DEVELOPMENT: {
    service: 'MOBILE_APP_DEVELOPMENT',
    title: 'Mobile app development',
    description: 'Tell us about your users, the problem to solve, and the first app release.',
    schema: serviceRequestTemplateSchemas.MOBILE_APP_DEVELOPMENT,
    steps: [
      {
        id: 'company-info',
        title: 'Tell us about the idea',
        description: 'A little context helps us understand who the app is for and why it matters.',
        fields: mobileAppCompanyInfoFields,
      },
      {
        id: 'service-specific',
        title: 'Tell us about the first release',
        description: 'Share what matters most. A rough answer is enough.',
        fields: mobileAppGoalsScopeFields,
      },
      reviewStep(),
    ],
  },
  GENERAL_MARKETING: {
    service: 'GENERAL_MARKETING',
    title: 'General marketing',
    description: 'Tell us about your audience, the result you need, and what is already in place.',
    schema: serviceRequestTemplateSchemas.GENERAL_MARKETING,
    steps: [
      {
        id: 'company-info',
        title: 'Tell us about your business',
        description: 'A little context helps us understand what marketing needs to achieve.',
        fields: generalMarketingCompanyInfoFields,
      },
      {
        id: 'service-specific',
        title: 'Tell us about your marketing',
        description: 'Share what you know today. We can work through the rest together.',
        fields: generalMarketingGoalsScopeFields,
      },
      reviewStep(),
    ],
  },
  OTHER: {
    service: 'OTHER',
    title: 'Other',
    description: 'Describe the situation, the result you need, and any practical limits.',
    schema: serviceRequestTemplateSchemas.OTHER,
    steps: [
      {
        id: 'company-info',
        title: 'Explain what you need',
        description:
          'Use your own words. We will work out the service category and technical details.',
        fields: otherRequestContextFields,
      },
      {
        id: 'service-specific',
        title: 'Add useful context',
        description: 'Share only what is already known. Every question in this step is optional.',
        fields: otherRequestPracticalFields,
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
