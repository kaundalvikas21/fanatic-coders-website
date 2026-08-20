import { BriefcaseBusiness, ShieldCheck, UserRound, UsersRound } from 'lucide-react';

import { OverviewStatsCard, type OverviewStat } from '@/components/dashboard/OverviewStatsCard';
import { parseRoles, Role } from '@/lib/auth/roles';
import type { UserListItem } from '@/types';

type MemberRoleStatsProps = {
  members: UserListItem[];
  total: number;
};

export function MemberRoleStats({ members, total }: MemberRoleStatsProps) {
  const counts = members.reduce<Record<Role, number>>(
    (result, member) => {
      for (const role of parseRoles(member.role)) {
        result[role] += 1;
      }

      return result;
    },
    {
      ADMIN: 0,
      MANAGER: 0,
      MEMBER: 0,
      CLIENT: 0,
    },
  );
  const stats: OverviewStat[] = [
    {
      label: 'Admins',
      value: counts.ADMIN,
      supportingText: 'Organization administrators',
      icon: ShieldCheck,
      tone: 'blue',
    },
    {
      label: 'Managers',
      value: counts.MANAGER,
      supportingText: 'Project and client managers',
      icon: BriefcaseBusiness,
      tone: 'violet',
    },
    {
      label: 'Members',
      value: counts.MEMBER,
      supportingText: 'Delivery team members',
      icon: UsersRound,
      tone: 'amber',
    },
    {
      label: 'Clients',
      value: counts.CLIENT,
      supportingText: `${total} total ${total === 1 ? 'member' : 'members'}`,
      icon: UserRound,
      tone: 'emerald',
    },
  ];

  return <OverviewStatsCard stats={stats} />;
}
