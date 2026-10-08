import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { SectionTabs } from '@/components/shared/section-tabs';
import { TabsContent } from '@/components/ui/tabs';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { PortfolioDetailsForm } from '@/modules/portfolios/components/PortfolioDetailsForm';
import { PortfolioDetailScrollToTop } from '@/modules/portfolios/components/PortfolioDetailScrollToTop';
import { PortfolioFactsForm } from '@/modules/portfolios/components/PortfolioFactsForm';
import { portfolioTabItems } from '@/modules/portfolios/components/portfolio-tab-items';
import { ApproachForm } from '@/modules/portfolios/components/tabs/ApproachForm';
import { ChallengeForm } from '@/modules/portfolios/components/tabs/ChallengeForm';
import { DeliveryForm } from '@/modules/portfolios/components/tabs/DeliveryForm';
import { ResultsForm } from '@/modules/portfolios/components/tabs/ResultsForm';
import { getPortfolioById } from '@/modules/portfolios/data/queries';
import type { Portfolio } from '@/types';

export const metadata = { title: 'Portfolio Detail | fanaticCoders' };

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ portfolioId: string }>;
}) {
  const access = await getCurrentAccess();
  if (!access?.can('portfolio', 'read') || !access.can('portfolio', 'update'))
    redirect('/unauthorized');

  const { portfolioId } = await params;
  const response = await getPortfolioById(portfolioId);
  const portfolio = response.success && response.data ? (response.data as Portfolio) : null;
  if (!portfolio) notFound();

  return (
    <div className="flex flex-col gap-6">
      <PortfolioDetailScrollToTop />
      <PageHeader
        title={portfolio.title}
        description={portfolio.description}
        showBackButton
        backLabel="Portfolio"
      />
      <SectionTabs
        defaultValue={portfolioTabItems[0].value}
        items={portfolioTabItems}
        ariaLabel="Portfolio editor"
        variant="folder"
      >
        <TabsContent
          value={portfolioTabItems[0].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <PortfolioDetailsForm portfolio={portfolio} />
        </TabsContent>
        <TabsContent
          value={portfolioTabItems[1].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <PortfolioFactsForm portfolio={portfolio} />
        </TabsContent>
        <TabsContent
          value={portfolioTabItems[2].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ChallengeForm portfolio={portfolio} />
        </TabsContent>
        <TabsContent
          value={portfolioTabItems[3].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ApproachForm portfolio={portfolio} />
        </TabsContent>
        <TabsContent
          value={portfolioTabItems[4].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <DeliveryForm portfolio={portfolio} />
        </TabsContent>
        <TabsContent
          value={portfolioTabItems[5].value}
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <ResultsForm portfolio={portfolio} />
        </TabsContent>
      </SectionTabs>
    </div>
  );
}
