import { DetailItem } from '@/components/shared/detail-item';
import type { UserListItem } from '@/types';
import { formatDate } from '@/utils/date';

export function MemberDetails({ member }: { member: UserListItem }) {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      <DetailItem
        label="Name"
        value={member.user.name}
      />
      <DetailItem
        label="Email"
        value={member.user.email}
      />
      <DetailItem
        label="User ID"
        value={member.user.id}
      />
      <DetailItem
        label="Member ID"
        value={member.id}
      />
      <DetailItem
        label="Role"
        value={member.role}
      />
      <DetailItem
        label="Joined"
        value={formatDate(member.createdAt)}
      />
    </dl>
  );
}
