import { Activity, BriefcaseBusiness, CheckCircle2, Clock3 } from 'lucide-react';

const stats = [
  { label: 'Active projects', value: '04', icon: BriefcaseBusiness },
  { label: 'Open tasks', value: '18', icon: CheckCircle2 },
  { label: 'Due this week', value: '06', icon: Clock3 },
];

const projects = [
  {
    name: 'Client portal',
    status: 'In review',
    nextStep: 'Confirm dashboard metrics',
  },
  {
    name: 'Website refresh',
    status: 'In progress',
    nextStep: 'Ship auth screens',
  },
  {
    name: 'SEO sprint',
    status: 'Queued',
    nextStep: 'Prepare content brief',
  },
];

export const metadata = {
  title: 'Dashboard | fanaticCoders',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-sm text-cyan-300">dashboard</p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">Project overview</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Track client work, review next steps, and keep delivery moving.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
          <Activity className="size-4" />
          Live session
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-slate-300">{label}</p>
              <Icon className="size-5 text-cyan-300" />
            </div>
            <p className="mt-5 font-mono text-3xl font-bold text-white">{value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-semibold tracking-normal text-white">Projects</h2>
        </div>
        <div className="divide-y divide-white/10">
          {projects.map((project) => (
            <article
              key={project.name}
              className="grid gap-3 px-5 py-4 md:grid-cols-[1fr_auto_1.1fr] md:items-center"
            >
              <h3 className="font-semibold text-white">{project.name}</h3>
              <span className="w-fit rounded-md border border-cyan-300/20 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-100">
                {project.status}
              </span>
              <p className="text-sm text-slate-300 md:text-right">{project.nextStep}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
