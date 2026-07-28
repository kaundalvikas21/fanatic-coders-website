import { BriefcaseBusiness, ClipboardList, Inbox, ListChecks } from 'lucide-react';

import { LeadStatusDonutChart } from '@/components/dashboard/charts/LeadStatusDonutChart';
import { TaskStatusBarChart } from '@/components/dashboard/charts/TaskStatusBarChart';
import { OverviewListCard } from '@/components/dashboard/OverviewListCard';
import { OverviewStatsCard } from '@/components/dashboard/OverviewStatsCard';
import { PageHeader } from '@/components/shared/page-header';
import { WidgetCard } from '@/components/shared/widget-card';
import { getLeads } from '@/modules/leads';
import { getProjects } from '@/modules/projects/data/queries';
import { getTasks } from '@/modules/projects/data/tasks';
import { getServiceRequests } from '@/modules/service-requests/data/queries';
import { formatDate } from '@/utils/date';
import type { PaginatedLeads, Project, ServiceRequest, Task } from '@/types';

export const metadata = {
  title: 'Admin | fanaticCoders',
};

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Load each workspace domain together to build one current operational snapshot.
  const [response, projectsResponse, tasksResponse, serviceRequestsResponse] = await Promise.all([
    getLeads({ pageSize: 100 }),
    getProjects(),
    getTasks(),
    getServiceRequests(),
  ]);
  const leads = response.success && response.data ? (response.data as PaginatedLeads).items : [];
  const projects: Project[] =
    projectsResponse.success && Array.isArray(projectsResponse.data)
      ? (projectsResponse.data as Project[])
      : [];
  const tasks: Task[] =
    tasksResponse.success && Array.isArray(tasksResponse.data)
      ? (tasksResponse.data as Task[])
      : [];
  const serviceRequests: ServiceRequest[] =
    serviceRequestsResponse.success && Array.isArray(serviceRequestsResponse.data)
      ? (serviceRequestsResponse.data as ServiceRequest[])
      : [];
  const newLeads = leads.filter((lead) => lead.status === 'NEW').length;
  const qualifiedLeads = leads.filter((lead) => lead.status === 'QUALIFIED').length;
  const inProgressLeads = leads.filter((lead) => lead.status === 'IN_PROGRESS').length;
  const closedLeads = leads.filter((lead) => lead.status === 'DEAD').length;
  const leadStatusData = [
    { status: 'new' as const, leads: newLeads, fill: 'var(--color-new)' },
    {
      status: 'qualified' as const,
      leads: qualifiedLeads,
      fill: 'var(--color-qualified)',
    },
    {
      status: 'inProgress' as const,
      leads: inProgressLeads,
      fill: 'var(--color-inProgress)',
    },
    { status: 'closed' as const, leads: closedLeads, fill: 'var(--color-closed)' },
  ];
  const taskStatusData = [
    {
      status: 'To do',
      tasks: tasks.filter((task) => task.status === 'TODO').length,
      fill: 'var(--chart-1)',
    },
    {
      status: 'In progress',
      tasks: tasks.filter((task) => task.status === 'IN_PROGRESS').length,
      fill: 'var(--chart-2)',
    },
    {
      status: 'In review',
      tasks: tasks.filter((task) => task.status === 'IN_REVIEW').length,
      fill: 'var(--chart-3)',
    },
    {
      status: 'Done',
      tasks: tasks.filter((task) => task.status === 'DONE').length,
      fill: 'var(--chart-4)',
    },
  ];
  const openTasks = tasks.filter((task) => task.status !== 'DONE').length;
  const activeProjects = projects.filter((project) => project.status === 'ACTIVE').length;
  const openServiceRequests = serviceRequests.filter(
    (request) => request.status === 'NEW' || request.status === 'IN_PROGRESS',
  ).length;

  // Surface unfinished urgent or overdue work that may require admin intervention.
  const attentionTasks = tasks
    .filter((task) => {
      if (task.status === 'DONE') {
        return false;
      }

      const overdue = task.dueDate ? new Date(task.dueDate) < new Date() : false;
      return overdue || task.priority === 'URGENT';
    })
    .sort((left, right) => {
      const leftDate = left.dueDate ? new Date(left.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const rightDate = right.dueDate ? new Date(right.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return leftDate - rightDate;
    })
    .slice(0, 5);
  const recentLeads = [...leads]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 5);
  const attentionItems = attentionTasks.map((task) => ({
    id: task.id,
    href: `/dashboard/projects/${task.projectId}`,
    label: task.title,
    supportingText: task.project?.name ?? 'Project task',
    meta: task.dueDate ? formatDate(task.dueDate) : 'Urgent',
  }));
  const recentLeadItems = recentLeads.map((lead) => ({
    id: lead.id,
    href: `/dashboard/leads/${lead.id}`,
    label: lead.name,
    supportingText: lead.companyName || lead.email,
    meta: formatDate(lead.createdAt),
  }));
  const workspaceStats = [
    {
      label: 'Projects',
      value: activeProjects,
      supportingText: `${projects.length} total`,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Tasks',
      value: openTasks,
      supportingText: `${tasks.length - openTasks} completed`,
      icon: ListChecks,
    },
    {
      label: 'Requests',
      value: openServiceRequests,
      supportingText: `${serviceRequests.length} total`,
      icon: ClipboardList,
    },
    {
      label: 'Leads',
      value: leads.length,
      supportingText: `${newLeads} new`,
      icon: Inbox,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Establish page context using the shared dashboard header. */}
      <PageHeader
        title="Admin workspace"
        description="Manage workspace access, roles, and lead review from one place."
      />

      {/* Present independent workspace totals before the analytical distributions. */}
      <OverviewStatsCard stats={workspaceStats} />

      {/* Compare lead pipeline and task delivery flow side by side. */}
      <section
        aria-label="Workspace analytics"
        className="grid items-stretch gap-4 lg:grid-cols-2"
      >
        <WidgetCard
          title="Lead pipeline"
          description="Current lead distribution by status."
          className="h-full"
        >
          {response.success ? (
            <LeadStatusDonutChart data={leadStatusData} />
          ) : (
            <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
              {response.message}
            </div>
          )}
        </WidgetCard>

        <WidgetCard
          title="Task flow"
          description="Delivery tasks grouped by current status."
          className="h-full"
        >
          {tasksResponse.success ? (
            <TaskStatusBarChart data={taskStatusData} />
          ) : (
            <div className="flex min-h-72 items-center justify-center text-sm text-muted-foreground">
              {tasksResponse.message}
            </div>
          )}
        </WidgetCard>
      </section>

      {/* Prioritize work needing action alongside the newest pipeline activity. */}
      <section className="grid gap-4 xl:grid-cols-2">
        <OverviewListCard
          title="Needs attention"
          description="Urgent or overdue delivery tasks."
          emptyMessage="No urgent or overdue tasks."
          items={attentionItems}
        />

        <OverviewListCard
          title="Recent leads"
          description="Latest contact requests entering the pipeline."
          emptyMessage="No leads captured yet."
          items={recentLeadItems}
        />
      </section>
    </div>
  );
}
