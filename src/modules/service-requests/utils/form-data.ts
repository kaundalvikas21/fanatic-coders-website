export type ServiceRequestFormData = Record<string, unknown>;

export function mergeServiceRequestFormData(
  current: ServiceRequestFormData,
  next: unknown,
): ServiceRequestFormData {
  if (!next || typeof next !== 'object' || Array.isArray(next)) {
    return current;
  }

  return {
    ...current,
    ...(next as ServiceRequestFormData),
  };
}
