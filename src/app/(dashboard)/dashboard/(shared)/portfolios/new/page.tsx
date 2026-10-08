import { redirect } from 'next/navigation';
import { PageHeader } from '@/components/shared/page-header';
import { SectionTabs } from '@/components/shared/section-tabs';
import { TabsContent } from '@/components/ui/tabs';
import { getCurrentAccess } from '@/lib/auth/current-access';
import { PortfolioDetailsForm } from '@/modules/portfolios/components/PortfolioDetailsForm';
import { portfolioTabItems } from '@/modules/portfolios/components/portfolio-tab-items';

export const metadata = { title: 'Create Portfolio | fanaticCoders' };

export default async function NewPortfolioPage() {
  const access = await getCurrentAccess();
  if (!access?.can('portfolio', 'create')) redirect('/unauthorized');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create portfolio"
        description="Create the project, then add its case study sections."
        showBackButton
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
          <PortfolioDetailsForm />
        </TabsContent>
        {portfolioTabItems.slice(1).map(({ value }) => (
          <TabsContent
            key={value}
            value={value}
            forceMount
            className="data-[state=inactive]:hidden"
          >
            <div className="rounded-lg border border-border/60 bg-card p-6">
              <p className="font-medium">Save portfolio details first</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You can add this section after creating the portfolio.
              </p>
            </div>
          </TabsContent>
        ))}
      </SectionTabs>
    </div>
  );
}
