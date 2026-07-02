import { Mail, ShieldCheck, UserRound } from 'lucide-react';

const members = [
  { name: 'Ava Reyes', role: 'Owner', email: 'ava@example.com' },
  { name: 'Noah Patel', role: 'Designer', email: 'noah@example.com' },
  { name: 'Mia Chen', role: 'Engineer', email: 'mia@example.com' },
];

export const metadata = {
  title: 'Team | fanaticCoders',
};

export default function TeamPage() {
  return (
    <div className="space-y-8">
      <section className="border-b border-white/10 pb-8">
        <p className="font-mono text-sm text-cyan-300">team</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">Workspace members</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Review who has access to this workspace.
        </p>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.04]">
        <div className="divide-y divide-white/10">
          {members.map((member) => (
            <article
              key={member.email}
              className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr] md:items-center"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                  <UserRound className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">{member.name}</h2>
                  <p className="text-sm text-slate-400">{member.role}</p>
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-100">
                <ShieldCheck className="size-3.5" />
                Active
              </span>
              <p className="inline-flex items-center gap-2 text-sm text-slate-300 md:justify-end">
                <Mail className="size-4" />
                {member.email}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
