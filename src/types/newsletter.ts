import type { operations, components } from './backend-types';

export type NewsletterSubscriber = components['schemas']['NewsletterSubscriber'];
export type NewsletterSubscriptionsData =
  components['schemas']['NewsletterSubscriptionsResponse']['data'];
export type GetNewsletterSubscriptionsInput = NonNullable<
  operations['getNewsletterSubscriptions']['parameters']['query']
>;
export type GetNewsletterSubscriptionsResponse =
  operations['getNewsletterSubscriptions']['responses'][200]['content']['application/json'];
export type NewsletterSubscriptionInput =
  components['schemas']['CreateNewsletterSubscriptionRequest'];
export type CreateNewsletterSubscriptionRequest = NewsletterSubscriptionInput;
export type CreateNewsletterSubscriptionResponse =
  operations['createNewsletterSubscription']['responses'][201]['content']['application/json'];
