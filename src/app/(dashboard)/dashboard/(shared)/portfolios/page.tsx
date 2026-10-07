import { Images, Plus } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { EmptyState } from '@/components/shared/empty-state';
import { ErrorState } from '@/components/shared/error-state';
import { PageHeader } from '@/components/shared/page-header';
import { Pagination } from '@/components/shared/Pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { getPortfolios } from '@/modules/portfolios';
import type { PaginatedPortfolios } from '@/types';

export const metadata = { title: 'Portfolio | fanaticCoders' };
export const dynamic = 'force-dynamic';

type PortfoliosPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function PortfoliosPage({ searchParams }: PortfoliosPageProps) {
  const access = await getCurrentAccess();
  if (!access?.can('portfolio', 'read')) redirect('/unauthorized');

  const rawPage = (await searchParams).page;
  const parsedPage = Number(Array.isArray(rawPage) ? rawPage[0] : rawPage);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const response = await getPortfolios({ page, pageSize: 10 });
  const data = response.success ? (response.data as PaginatedPortfolios | null | undefined) : null;

  const content = !response.success ? (
    <ErrorState
      title="Could not load portfolios"
      message={response.message}
    />
  ) : !data?.items.length ? (
    <EmptyState
      entity="portfolios"
      description="Portfolio projects will appear here."
      Icon={Images}
    />
  ) : (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3">
        {data.items.map((portfolio) => (
          <Link
            key={portfolio.id}
            href={`/dashboard/portfolios/${encodeURIComponent(portfolio.id)}`}
          >
            <Card className="transition-colors hover:border-primary/40">
              <CardContent className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="font-medium">{portfolio.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {portfolio.description}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {[portfolio.client, portfolio.industry, portfolio.year]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  color={portfolio.isPublished ? 'green' : 'amber'}
                >
                  {portfolio.isPublished ? 'Published' : 'Draft'}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination
        pagination={data.pagination}
        itemLabel={data.pagination.totalItems === 1 ? 'portfolio' : 'portfolios'}
      />
    </div>
  );

  return (
    <ListsLayout
      header={
        <PageHeader
          title="Portfolio"
          description="Review portfolio case studies and drafts."
          showBackButton
          action={
            access.can('portfolio', 'create')
              ? { label: 'New portfolio', href: '/dashboard/portfolios/new', icon: Plus }
              : undefined
          }
        />
      }
    >
      {content}
    </ListsLayout>
  );
}
