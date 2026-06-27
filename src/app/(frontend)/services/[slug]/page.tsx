import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/components/pages/services/ServiceDetailPage';
import { services, getService } from '@/components/pages/services/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) return {};
  return {
    title: `${found.service.title} | fanaticCoders`,
    description: found.service.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getService(slug);
  if (!found) notFound();
  return (
    <ServiceDetailPage
      service={found.service}
      group={found.group}
    />
  );
}
