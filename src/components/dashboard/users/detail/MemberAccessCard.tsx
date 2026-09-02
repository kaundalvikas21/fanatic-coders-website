import { ShieldCheck } from 'lucide-react';

import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import type { UserListItem } from '@/types';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

export function MemberAccessCard({ member }: { member: UserListItem }) {
  return (
    <WidgetCard
      icon={ShieldCheck}
      title="Access"
      description={`Granted through the ${member.role} role.`}
    >
      <dl className="divide-y divide-border/60">
        <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
          <dt className="text-sm text-muted-foreground">Role</dt>
          <dd>
            <Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3">
          <dt className="text-sm text-muted-foreground">Membership</dt>
          <dd className="text-sm font-medium">Accepted</dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
          <dt className="text-sm text-muted-foreground">Permissions</dt>
          <dd className="text-sm font-medium">Role inherited</dd>
        </div>
      </dl>
      <p className="mt-4 border-t border-border/60 pt-4 text-xs leading-5 text-muted-foreground">
        Permissions are inherited from the organization role and are not edited independently on
        this page.
      </p>
    </WidgetCard>
  );
}
