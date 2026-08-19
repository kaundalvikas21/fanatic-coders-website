import { ErrorState } from '@/components/shared/error-state';
import { EmptyState } from '@/components/shared/empty-state';
import { Pagination } from '@/components/shared/Pagination';
import type { GetServiceRequestsInput, ServiceRequest } from '@/types';
import { getServiceRequests } from '../../data/queries';
import { ServiceRequestList } from './ServiceRequestList';

export async function ServiceRequestListLoader({ filters }: { filters: GetServiceRequestsInput }) {
  const response = await getServiceRequests(filters);
  const requests =
    response.success && Array.isArray(response.data) ? (response.data as ServiceRequest[]) : [];
  const hasFilters = Boolean(filters.client || filters.status || filters.serviceType);
  const page = filters.page ?? 1;
  const pageSize = filters.pageSize ?? 10;
  const totalItems = requests.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const pageRequests = requests.slice((page - 1) * pageSize, page * pageSize);

  if (!response.success) {
    return (
      <ErrorState
        title="Could not load service requests"
        message={response.message}
      />
    );
  }

  if (totalItems === 0) {
    return (
      <EmptyState
        entity="service requests"
        description={
          hasFilters
            ? 'No service requests match the selected filters.'
            : 'Client-submitted service requests will appear here for review.'
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ServiceRequestList
        requests={pageRequests}
        hasFilters={hasFilters}
      />
      <Pagination
        pagination={{ page, pageSize, totalItems, totalPages }}
        itemLabel={totalItems === 1 ? 'service request' : 'service requests'}
      />
    </div>
  );
}
