import { notFound } from 'next/navigation';
import { UserRound } from 'lucide-react';

import { MemberDetails } from '@/components/dashboard/users/MemberDetails';
import { PageHeader } from '@/components/shared/page-header';
import { ProfileDetails } from '@/components/shared/profile-details';
import { WidgetCard } from '@/components/shared/widget-card';
import { Badge } from '@/components/ui/badge';
import { getUserMemberById } from '@/lib/data/users/queries';
import { getUserRoleBadgeVariant } from '@/utils/user-formatters';

export const dynamic = 'force-dynamic';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getUserMemberById(id);
  const member = response.success ? response.data : null;

  if (!member) {
    notFound();
  }

  return (
    <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-6">
        <PageHeader
          title={member.user.name}
          description={member.user.email}
          showBackButton
        />

        <WidgetCard
          title="Member info"
          description="Account and organization details."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <MemberDetails member={member} />
        </WidgetCard>
      </div>

      <aside className="flex h-full flex-col gap-6">
        <WidgetCard
          title="Profile"
          description="Account identity."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <ProfileDetails
            name={member.user.name}
            email={member.user.email}
            image={member.user.image}
            meta={<Badge variant={getUserRoleBadgeVariant(member.role)}>{member.role}</Badge>}
          />
        </WidgetCard>

        <WidgetCard
          title="Access"
          description="Current organization access."
          titleClassName="text-xl font-semibold"
          descriptionClassName="text-sm"
        >
          <div className="flex items-start gap-3 rounded-lg border p-4">
            <UserRound className="mt-0.5 size-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Accepted member</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This member can access internal dashboard features allowed by the {member.role}{' '}
                role.
              </p>
            </div>
          </div>
        </WidgetCard>
      </aside>
    </div>
  );
}
