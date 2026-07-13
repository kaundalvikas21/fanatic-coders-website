import { SERVICE_INTERESTS, type ServiceInterest } from '@/types';

export const SERVICE_REQUEST_ROUTE_SEGMENTS = {
  GOOGLE_ADS: 'google-ads',
  SEO: 'seo',
  WEB_DEVELOPMENT: 'web-development',
  MOBILE_APP_DEVELOPMENT: 'mobile-app-development',
  GENERAL_MARKETING: 'general-marketing',
  OTHER: 'other',
} as const satisfies Record<ServiceInterest, string>;

const SERVICE_REQUEST_SEGMENT_SERVICES = Object.fromEntries(
  Object.entries(SERVICE_REQUEST_ROUTE_SEGMENTS).map(([service, segment]) => [segment, service]),
) as Record<string, ServiceInterest>;

export function getServiceRequestRoute(service: ServiceInterest) {
  return `/dashboard/client/service-requests/new/${SERVICE_REQUEST_ROUTE_SEGMENTS[service]}`;
}

export function parseServiceRequestService(value?: string | null): ServiceInterest | null {
  if (!value) {
    return null;
  }

  if (SERVICE_INTERESTS.includes(value as ServiceInterest)) {
    return value as ServiceInterest;
  }

  return SERVICE_REQUEST_SEGMENT_SERVICES[value] ?? null;
}

export function getServiceRequestRouteParams() {
  return Object.values(SERVICE_REQUEST_ROUTE_SEGMENTS).map((service) => ({ service }));
}
