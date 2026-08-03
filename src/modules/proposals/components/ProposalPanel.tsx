'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { WidgetCard } from '@/components/shared/widget-card';
import { Button } from '@/components/ui/button';
import { Muted } from '@/components/ui/typography';
import { ProposalDetails } from '@/modules/proposals/components/ProposalDetails';
import { ProposalForm } from '@/modules/proposals/components/ProposalForm';
import { updateServiceRequestProposal } from '@/modules/proposals/data/mutations';
import { useProposalPermissions } from '@/modules/proposals/hooks/use-proposal-permissions';
import type { Proposal } from '@/types';

type ProposalPanelProps = {
  serviceRequestId: string;
  initialProposal: Proposal | null;
};

export function ProposalPanel({ serviceRequestId, initialProposal }: ProposalPanelProps) {
  const router = useRouter();
  const permissions = useProposalPermissions();
  const [proposal, setProposal] = useState(initialProposal);
  const isLocked = proposal?.status === 'ACCEPTED';
  const showManagementForm =
    permissions.isManagementView && !isLocked && (permissions.canCreate || permissions.canUpdate);

  async function acceptProposal() {
    // Accept the proposal to trigger Stripe invoice creation for the client.
    const response = await updateServiceRequestProposal(serviceRequestId, {
      status: 'ACCEPTED',
    });

    if (response.success && response.data) {
      setProposal(response.data as Proposal);
      toast.success('Proposal accepted.');
      router.refresh();
      return;
    }

    toast.error(response.message || 'Could not accept proposal.');
  }

  if (!proposal && permissions.isClientView) {
    return null;
  }

  return (
    <div className="grid gap-6">
      {proposal && <ProposalDetails proposal={proposal} />}

      {showManagementForm && (
        <ProposalForm
          serviceRequestId={serviceRequestId}
          proposal={proposal}
          canDelete={permissions.canDelete}
          onProposalChange={setProposal}
        />
      )}

      {permissions.isClientView && proposal?.status === 'SENT' && permissions.canUpdate && (
        <WidgetCard
          title="Accept proposal"
          description="Confirm the commercial terms to create your Stripe invoice."
        >
          <div className="grid gap-3">
            <Muted>
              Accepting confirms the scope and amount above. Stripe will create an invoice and send
              a copy to your account email.
            </Muted>
            <Button
              type="button"
              onClick={acceptProposal}
              className="w-full sm:w-fit"
            >
              <Check data-icon="inline-start" />
              Accept proposal
            </Button>
          </div>
        </WidgetCard>
      )}
    </div>
  );
}
