import { ShieldCheck, UsersRound } from 'lucide-react';

export const metadata = {
  title: 'Admin | fanaticCoders',
};

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <section className="border-b border-white/10 pb-8">
        <p className="font-mono text-sm text-cyan-300">admin</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">Admin workspace</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Manage workspace access, roles, and account-level controls.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: 'Role access',
            body: 'Review admin-only routes and permission checks.',
            Icon: ShieldCheck,
          },
          {
            title: 'Member controls',
            body: 'Prepare account controls for workspace members.',
            Icon: UsersRound,
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
