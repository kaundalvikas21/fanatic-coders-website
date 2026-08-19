import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceRequestListLoader } from '@/modules/service-requests';
import {
  parseServiceRequestsSearchParams,
  type ServiceRequestsSearchParams,
} from '@/modules/service-requests/config/search-params';

export const metadata = {
  title: 'Services | fanaticCoders',
};

type ServicesPageProps = {
  searchParams: Promise<ServiceRequestsSearchParams>;
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const filters = parseServiceRequestsSearchParams(await searchParams);
  const suspenseKey = JSON.stringify(filters);

  return (
    <Suspense
      key={suspenseKey}
      fallback={
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-16 rounded-lg"
            />
          ))}
        </div>
      }
    >
      <ServiceRequestListLoader filters={filters} />
    </Suspense>
  );
}
