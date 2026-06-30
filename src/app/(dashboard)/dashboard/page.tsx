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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <CardDescription>Operations dashboard</CardDescription>
            <CardTitle className="mt-2 text-2xl">Project control room</CardTitle>
            <CardDescription className="mt-2 max-w-2xl leading-6">
              Review leads, project health, delivery work, and team load from one place.
            </CardDescription>
          </div>
          <CardAction className="flex flex-wrap gap-2">
            <Button variant="outline">
              <CalendarClock data-icon="inline-start" />
              Schedule review
            </Button>
            <Button>
              View leads
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </CardAction>
        </CardHeader>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <Card
            key={label}
            size="sm"
          >
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardAction>
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Lead intake</CardTitle>
              <CardDescription>Public contact form queue</CardDescription>
            </div>
            <CardAction>
              <Button
                variant="outline"
                size="sm"
              >
                Open CRM
              </Button>
            </CardAction>
          </CardHeader>
          <Separator />
          <CardContent className="px-0">
            <div className="divide-y">
              {leads.map((lead) => (
                <div
                  key={lead.name}
                  className="grid gap-3 px-(--card-spacing) py-4 md:grid-cols-[1fr_1fr_auto] md:items-center"
                >
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{lead.service}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{lead.budget}</p>
                  <Badge
                    variant="secondary"
                    className="w-fit"
                  >
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Project health</CardTitle>
              <CardDescription>Current delivery snapshot</CardDescription>
            </div>
            <CardAction>
              <BriefcaseBusiness className="size-5 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
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
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Team and client updates</CardDescription>
            </div>
            <CardAction>
              <MessageSquareText className="size-5 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Team load</CardTitle>
              <CardDescription>Weekly capacity</CardDescription>
            </div>
            <CardAction>
              <UsersRound className="size-5 text-muted-foreground" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
