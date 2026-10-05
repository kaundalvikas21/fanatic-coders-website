import type { operations, components } from './backend-types';

export type NewsletterSubscriptionInput =
  components['schemas']['CreateNewsletterSubscriptionRequest'];
export type CreateNewsletterSubscriptionRequest = NewsletterSubscriptionInput;
export type CreateNewsletterSubscriptionResponse =
  operations['createNewsletterSubscription']['responses'][201]['content']['application/json'];
