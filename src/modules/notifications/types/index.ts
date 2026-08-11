import type { components, operations } from '@/types/backend-types';

type Schemas = components['schemas'];

export type Notification = Schemas['Notification'];
export type NotificationsResponse = Schemas['NotificationsResponse'];
export type NotificationResponse = Schemas['NotificationResponse'];
export type MarkAllNotificationsReadResponse = Schemas['MarkAllNotificationsReadResponse'];
export type GetNotificationsInput = NonNullable<
  operations['getNotifications']['parameters']['query']
>;
