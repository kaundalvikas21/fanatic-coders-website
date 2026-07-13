import { notFound } from 'next/navigation';
import { DetailItem } from '@/components/shared/detail-item';
import { PageHeader } from '@/components/shared/page-header';
import { WidgetCard } from '@/components/shared/widget-card';
import { InviteForm } from '@/components/dashboard/leads/forms/InviteForm';
import { StatusForm } from '@/components/dashboard/leads/forms/StatusForm';
import { getLeadById } from '@/lib/data/leads/queries';
import type { Lead, ServiceInterest } from '@/types';
import { formatDate } from '@/utils/date';

const serviceLabels = {
  WEB_DEVELOPMENT: 'Web development',
  MOBILE_APP_DEVELOPMENT: 'Mobile app development',
  SEO: 'SEO',
  GOOGLE_ADS: 'Google Ads',
  GENERAL_MARKETING: 'General marketing',
  OTHER: 'Other',
} satisfies Record<ServiceInterest, string>;

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getLeadById(id);
  const lead = response.success && response.data ? (response.data as Lead) : null;

  if (!lead) {
    notFound();
  }

  return (
    <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title={lead.name}
          description={lead.companyName || 'No company added'}
          showBackButton
        />

        <WidgetCard
          title="Request info"
          description="Contact and project details."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              label="Email"
              value={lead.email}
            />
            <DetailItem
              label="Service"
              value={serviceLabels[lead.serviceInterest]}
            />
            <DetailItem
              label="Budget"
              value={lead.budgetRange || 'Not shared'}
            />
            <DetailItem
              label="Source"
              value="Contact form"
            />
            <DetailItem
              label="Created"
              value={formatDate(lead.createdAt)}
            />
            <DetailItem
              label="Updated"
              value={formatDate(lead.updatedAt)}
            />
          </dl>
        </WidgetCard>
      </div>

      <aside className="flex h-full flex-col gap-6">
        {/* Invite Action */}
        <WidgetCard
          title="Invite"
          description="Send client access to this lead email."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <InviteForm
            leadEmail={lead.email}
            serviceInterest={lead.serviceInterest}
          />
        </WidgetCard>

        {/* Status Action */}
        <WidgetCard
          title="Status"
          description="Update the lead stage."
          className="overflow-visible"
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <StatusForm
            leadId={lead.id}
            initialStatus={lead.status}
          />
        </WidgetCard>
      </aside>
    </div>
  );
}
