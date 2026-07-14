import { Inbox, ListChecks, ShieldCheck, UsersRound } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getLeads } from '@/modules/leads';
export const metadata = {
  title: 'Admin | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const response = await getLeads();
  const leads = Array.isArray(response.data) ? response.data : [];
  const newLeads = leads.filter((lead) => lead.status === 'NEW').length;
  const inProgressLeads = leads.filter((lead) => lead.status === 'IN_PROGRESS').length;
  const closedLeads = leads.filter((lead) => lead.status === 'DEAD').length;
  const overviewCards = [
    {
      title: 'Total leads',
      value: leads.length,
      body: response.success ? 'All captured contact requests.' : response.message,
      Icon: Inbox,
    },
    {
      title: 'New leads',
      value: newLeads,
      body: 'Need first review.',
      Icon: ListChecks,
    },
    {
      title: 'In progress',
      value: inProgressLeads,
      body: 'Currently being handled.',
      Icon: UsersRound,
    },
    {
      title: 'Closed',
      value: closedLeads,
      body: 'Marked as dead.',
      Icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardDescription>admin</CardDescription>
          <CardTitle className="text-3xl">Admin workspace</CardTitle>
          <CardDescription className="max-w-2xl leading-6">
            Manage workspace access, roles, and lead review from one place.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map(({ title, value, body, Icon }) => (
          <Card key={title}>
            <CardHeader>
              <div>
                <CardDescription>{title}</CardDescription>
                <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
              </div>
              <CardAction>
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{body}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
