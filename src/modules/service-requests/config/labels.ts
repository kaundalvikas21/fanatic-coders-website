import {
  SERVICE_INTEREST_OPTIONS,
  SERVICE_REQUEST_STATUS_OPTIONS,
  type ServiceInterest,
  type ServiceRequestStatus,
} from '@/types';

export const SERVICE_REQUEST_SERVICE_LABELS = Object.fromEntries(
  SERVICE_INTEREST_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ServiceInterest, string>;

export const SERVICE_REQUEST_STATUS_LABELS = Object.fromEntries(
  SERVICE_REQUEST_STATUS_OPTIONS.map((option) => [option.value, option.label]),
) as Record<ServiceRequestStatus, string>;
