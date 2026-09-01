import type { UserListItem } from '@/types';
import { formatDate } from '@/utils/date';

export function MemberDetails({ member }: { member: UserListItem }) {
  const items = [
    { label: 'User ID', value: member.user.id, mono: true },
    { label: 'Member ID', value: member.id, mono: true },
    { label: 'Organization role', value: member.role, mono: false },
    { label: 'Joined organization', value: formatDate(member.createdAt), mono: false },
  ];

  return (
    <dl className="divide-y divide-border/60">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-6"
        >
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
          <dd
            className={
              item.mono
                ? 'break-all font-mono text-xs leading-5 text-foreground'
                : 'text-sm font-medium text-foreground'
            }
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
