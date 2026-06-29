import { Blocks, ClipboardList } from 'lucide-react';

export const metadata = {
  title: 'User Scaffolding | fanaticCoders',
};

export default function UserScaffoldingPage() {
  return (
    <div className="space-y-8">
      <section className="border-b border-white/10 pb-8">
        <p className="font-mono text-sm text-cyan-300">user.scaffolding</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">User scaffolding</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Build user-facing workspace flows from this route.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: 'User shell',
            body: 'Place user dashboard sections behind this route group.',
            Icon: Blocks,
          },
          {
            title: 'Next actions',
            body: 'Add the forms, tables, and states users need here.',
            Icon: ClipboardList,
          },
        ].map(({ title, body, Icon }) => (
          <article
            key={title}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
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
