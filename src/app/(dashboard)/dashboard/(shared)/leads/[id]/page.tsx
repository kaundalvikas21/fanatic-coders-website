import { notFound } from 'next/navigation';
import { DetailPageLayout } from '@/components/shared/detail-page-layout';
import { PageHeader } from '@/components/shared/page-header';
import { WidgetCard } from '@/components/shared/widget-card';
import { leadServiceLabels } from '@/modules/leads/config/labels';
import {
  getLeadById,
  LeadInfoCard,
  LeadInviteForm,
  LeadStatusForm,
  type LeadInfoItem,
} from '@/modules/leads';
import type { Lead } from '@/types';
import { formatDate } from '@/utils/date';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getLeadById(id);
  const lead = response.success && response.data ? (response.data as Lead) : null;

  if (!lead) {
    notFound();
  }

  // Prepare display rows explicitly so the card only handles rendering.
  const leadInfoItems = [
    {
      label: 'Email',
      value: lead.email,
    },
    {
      label: 'Service',
      value: leadServiceLabels[lead.serviceInterest],
    },
    {
      label: 'Budget',
      value: lead.budgetRange || 'Not shared',
    },
    {
      label: 'Source',
      value: 'Contact form',
    },
    {
      label: 'Created',
      value: formatDate(lead.createdAt),
    },
    {
      label: 'Updated',
      value: formatDate(lead.updatedAt),
    },
  ] satisfies LeadInfoItem[];

  return (
    <DetailPageLayout>
      <DetailPageLayout.Main>
        {/* Lead identity and submitted request details. */}
        <PageHeader
          title={lead.name}
          description={lead.companyName || 'No company added'}
          showBackButton
        />

        <LeadInfoCard items={leadInfoItems} />
      </DetailPageLayout.Main>

      <DetailPageLayout.Aside>
        {/* Follow-up actions for converting or updating this lead. */}
        <WidgetCard
          title="Invite"
          description="Send client access to this lead email."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <LeadInviteForm
            leadEmail={lead.email}
            serviceInterest={lead.serviceInterest}
          />
        </WidgetCard>

        <WidgetCard
          title="Status"
          description="Update the lead stage."
          className="overflow-visible"
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <LeadStatusForm
            leadId={lead.id}
            initialStatus={lead.status}
          />
        </WidgetCard>
      </DetailPageLayout.Aside>
    </DetailPageLayout>
  );
}
