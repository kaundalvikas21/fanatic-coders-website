import { Blocks, ClipboardList } from 'lucide-react';

export const metadata = {
  title: 'Client Dashboard | fanaticCoders',
};

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="border-b border-white/10 pb-8">
        <p className="font-mono text-sm text-cyan-300">client</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">Client workspace</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Review client-facing project updates, deliverables, and account activity.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: 'Client portal',
            body: 'Place client dashboard sections behind this route group.',
            Icon: Blocks,
          },
          {
            title: 'Next actions',
            body: 'Add the forms, tables, and states clients need here.',
            Icon: ClipboardList,
          },
        ].map(({ title, body, Icon }) => (
          <article
            key={title}
            className="rounded-lg border border-white/10 bg-white/4 p-5"
          >
            <Icon className="size-5 text-cyan-300" />
            <h2 className="mt-4 text-sm font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
