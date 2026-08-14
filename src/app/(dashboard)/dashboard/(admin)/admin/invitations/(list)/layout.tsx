import type { ReactNode } from 'react';
import { MailPlus } from 'lucide-react';
import { ListsLayout } from '@/components/layout/dashboard/lists-layout';
import { ActionSheet, ActionSheetButton } from '@/components/shared/action-sheet';
import { PageHeader } from '@/components/shared/page-header';
import { CreateInvitationForm } from '@/modules/invitations';

export default function AdminInvitationsLayout({ children }: { children: ReactNode }) {
  return (
    <ListsLayout
      header={
        <PageHeader
          title="Invitations"
          description="Invite teammates to your organization and track their invitation status."
          actionSlot={
            <ActionSheet
              title="Send invitation"
              description="Invite user in our organization."
              trigger={
                <ActionSheetButton>
                  <MailPlus data-icon="inline-start" />
                  Send invitation
                </ActionSheetButton>
              }
            >
              <CreateInvitationForm />
            </ActionSheet>
          }
        />
      }
    >
      {children}
    </ListsLayout>
  );
}
