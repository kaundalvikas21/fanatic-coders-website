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
          description="Track organization invites sent through Better Auth."
          actionSlot={
            <ActionSheet
              title="Create invitation"
              description="Send a Better Auth organization invite."
              trigger={
                <ActionSheetButton>
                  <MailPlus data-icon="inline-start" />
                  New invitation
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
