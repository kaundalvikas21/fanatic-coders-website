import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { UserListItem } from '@/types';
import { formatDate } from '@/utils/date';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

type AdditionalMemberDetailsProps = {
  member: Pick<UserListItem, 'id' | 'role' | 'createdAt'>;
};

export function AdditionalMemberDetails({ member }: AdditionalMemberDetailsProps) {
  return (
    <section aria-labelledby="additional-member-details-heading">
      <h2
        id="additional-member-details-heading"
        className="text-sm font-semibold"
      >
        Details
      </h2>
      <Separator className="mt-3" />
      <dl className="flex flex-col gap-4 pt-4 text-sm">
        <div className="flex items-start justify-between gap-4">
          <dt className="shrink-0 text-muted-foreground">Member ID</dt>
          <dd className="min-w-0 break-all text-right font-mono text-xs leading-5">{member.id}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Role</dt>
          <dd>
            <Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Membership</dt>
          <dd>Accepted</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Joined</dt>
          <dd>{formatDate(member.createdAt)}</dd>
        </div>
      </dl>
    </section>
  );
}
