'use client';

import type { ReactNode } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { History, IdCard, ListChecks, ShieldCheck } from 'lucide-react';
import { SectionTabs, type SectionTabItem } from '@/components/shared/section-tabs';
import { TabsContent } from '@/components/ui/tabs';

const MEMBER_TABS = [
  { value: 'assignments', label: 'Assignments', Icon: ListChecks },
  { value: 'account', label: 'Account details', Icon: IdCard },
  { value: 'access', label: 'Access', Icon: ShieldCheck },
  { value: 'activity', label: 'Recent activity', Icon: History },
] as const satisfies readonly SectionTabItem[];

export function MemberDetailTabs({
  memberId,
  children,
}: {
  memberId: string;
  children: ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const activeTab = MEMBER_TABS.find((tab) => tab.value === segment)?.value ?? 'assignments';
  const items = MEMBER_TABS.map((tab) => ({
    ...tab,
    href: `/dashboard/admin/user/${encodeURIComponent(memberId)}/${tab.value}`,
  }));

  return (
    <SectionTabs
      value={activeTab}
      items={items}
      ariaLabel="Member details"
      variant="folder"
    >
      <TabsContent value={activeTab}>{children}</TabsContent>
    </SectionTabs>
  );
}
