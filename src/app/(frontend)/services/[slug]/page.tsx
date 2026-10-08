import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailPage } from '@/components/pages/services/ServiceDetailPage';
import { services, getService } from '@/components/pages/services/data';
import { getAllPublishedPortfolios } from '@/modules/portfolios/data/queries';

export const dynamicParams = false;
export const dynamic = 'force-dynamic';

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
  const portfolios = await getAllPublishedPortfolios();
  const portfolio = found.service.relatedCaseStudyIds
    .map((caseStudySlug) => portfolios?.find((item) => item.slug === caseStudySlug))
    .find((item) => item !== undefined);
  return (
    <ServiceDetailPage
      service={found.service}
      group={found.group}
      portfolio={portfolio}
    />
  );
}
