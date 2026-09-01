import { IdCard } from 'lucide-react';

import { MemberDetails } from '@/components/dashboard/users/MemberDetails';
import { WidgetCard } from '@/components/shared/widget-card';
import type { UserListItem } from '@/types';

export function MemberAccountCard({ member }: { member: UserListItem }) {
  return (
    <WidgetCard
      icon={IdCard}
      title="Account details"
      description="Organization membership identifiers."
    >
      <MemberDetails member={member} />
    </WidgetCard>
  );
}
