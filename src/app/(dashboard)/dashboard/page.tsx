import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarClock,
  CircleDollarSign,
  Inbox,
  ListChecks,
  MessageSquareText,
  UsersRound,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const metrics = [
  {
    label: 'New leads',
    value: '12',
    detail: '4 need review',
    icon: Inbox,
  },
  {
    label: 'Active projects',
    value: '08',
    detail: '2 at risk',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Open tasks',
    value: '34',
    detail: '9 due this week',
    icon: ListChecks,
  },
  {
    label: 'Revenue pipeline',
    value: '$42k',
    detail: '3 proposals open',
    icon: CircleDollarSign,
  },
];

const leads = [
  { name: 'Apex Retail', service: 'Web development', budget: '$10k to $25k', status: 'New' },
  { name: 'Lumen Health', service: 'SEO', budget: '$5k to $10k', status: 'In progress' },
  { name: 'Northstar Labs', service: 'Mobile app', budget: '$25k+', status: 'New' },
];

const projects = [
  { name: 'Client portal', progress: '72%', note: 'Review dashboard states' },
  { name: 'Website refresh', progress: '48%', note: 'Prepare content handoff' },
  { name: 'SEO sprint', progress: '24%', note: 'Confirm target pages' },
];

const activity = [
  { title: 'Lead captured', meta: 'Apex Retail submitted contact form' },
  { title: 'Onboarding pending', meta: 'Lumen Health has 3 missing fields' },
  { title: 'Project update posted', meta: 'Client portal milestone shared' },
];

const team = [
  { name: 'AK', load: '82%', label: 'Lead engineer' },
  { name: 'VK', load: '64%', label: 'Project manager' },
  { name: 'RS', load: '51%', label: 'Designer' },
];

export const metadata = {
  title: 'Dashboard | fanaticCoders',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Operations dashboard</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-normal">Project control room</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review leads, project health, delivery work, and team load from one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <CalendarClock />
            Schedule review
          </Button>
          <Button>
            View leads
            <ArrowUpRight />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <article
            key={label}
            className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <h2 className="text-base font-semibold">Lead intake</h2>
              <p className="mt-1 text-sm text-muted-foreground">Public contact form queue</p>
            </div>
            <Button
              variant="outline"
              size="sm"
            >
              Open CRM
            </Button>
          </div>
          <Separator />
          <div className="divide-y">
            {leads.map((lead) => (
              <div
                key={lead.name}
                className="grid gap-3 p-5 md:grid-cols-[1fr_1fr_auto] md:items-center"
              >
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{lead.service}</p>
                </div>
                <p className="text-sm text-muted-foreground">{lead.budget}</p>
                <span className="w-fit rounded-md border px-2.5 py-1 text-xs text-muted-foreground">
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">Project health</h2>
              <p className="mt-1 text-sm text-muted-foreground">Current delivery snapshot</p>
            </div>
            <BriefcaseBusiness className="size-5 text-muted-foreground" />
          </div>
          <div className="mt-6 space-y-5">
            {projects.map((project) => (
              <div key={project.name}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium">{project.name}</p>
                  <span className="text-sm text-muted-foreground">{project.progress}</span>
                </div>
                <Skeleton className="mt-2 h-2 w-full" />
                <p className="mt-2 text-xs text-muted-foreground">{project.note}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">Recent activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">Team and client updates</p>
            </div>
            <MessageSquareText className="size-5 text-muted-foreground" />
          </div>
          <div className="mt-6 space-y-4">
            {activity.map((item) => (
              <div
                key={item.title}
                className="flex gap-3"
              >
                <div className="mt-1 size-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold">Team load</h2>
              <p className="mt-1 text-sm text-muted-foreground">Weekly capacity</p>
            </div>
            <UsersRound className="size-5 text-muted-foreground" />
          </div>
          <div className="mt-6 space-y-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3"
              >
                <Avatar className="size-9 rounded-lg">
                  <AvatarFallback className="rounded-lg">{member.name}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium">{member.label}</p>
                    <span className="text-sm text-muted-foreground">{member.load}</span>
                  </div>
                  <Skeleton className="mt-2 h-2 w-full" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
