import { Bell, Globe2, Shield } from 'lucide-react';

import { env } from '@/config/env';

const settings = [
  {
    label: 'Backend URL',
    value: env.NEXT_PUBLIC_AUTH_URL,
    icon: Globe2,
  },
  {
    label: 'Session checks',
    value: 'Better Auth client hook',
    icon: Shield,
  },
  {
    label: 'Notifications',
    value: 'Not configured',
    icon: Bell,
  },
];

export const metadata = {
  title: 'Settings | fanaticCoders',
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="border-b border-white/10 pb-8">
        <p className="font-mono text-sm text-cyan-300">settings</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-white">Workspace settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Confirm the auth client and workspace defaults.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {settings.map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
          >
            <Icon className="size-5 text-cyan-300" />
            <h2 className="mt-4 text-sm font-semibold text-white">{label}</h2>
            <p className="mt-2 break-words text-sm leading-6 text-slate-300">{value}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
