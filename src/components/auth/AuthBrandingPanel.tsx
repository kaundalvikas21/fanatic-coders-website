import { BriefcaseBusiness, ListChecks, MessagesSquare } from 'lucide-react';

const workspaceFeatures = [
  {
    icon: BriefcaseBusiness,
    title: 'Projects',
    description: 'Keep delivery details and client work aligned.',
  },
  {
    icon: ListChecks,
    title: 'Tasks',
    description: 'See priorities, owners, and progress clearly.',
  },
  {
    icon: MessagesSquare,
    title: 'Updates',
    description: 'Share decisions and stay close to every handoff.',
  },
];

export function AuthBrandingPanel() {
  return (
    <section className="auth-branding relative hidden max-w-xl overflow-hidden rounded-2xl lg:block">
      <div
        className="auth-orb auth-orb-cyan"
        aria-hidden
      />
      <div
        className="auth-orb auth-orb-violet"
        aria-hidden
      />
      <div
        className="auth-orb auth-orb-blue"
        aria-hidden
      />

      <div className="relative z-10 p-8 xl:p-10">
        <p className="text-sm font-medium text-cyan-200">Workspace</p>

        <h1 className="mt-6 text-5xl font-semibold leading-[1.12] tracking-[-0.035em] text-white">
          Your work, organized in one place.
        </h1>
        <p className="mt-6 max-w-[52ch] text-base font-medium leading-7 tracking-[0.01em] text-slate-300">
          Access projects, tasks, client conversations, and delivery updates from one secure
          workspace.
        </p>

        <div className="mt-10 border-t border-white/10">
          {workspaceFeatures.map((feature) => (
            <div
              key={feature.title}
              className="auth-feature-row flex items-start gap-4 border-b border-white/10 py-4"
            >
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-cyan-200">
                <feature.icon
                  className="size-4"
                  aria-hidden
                />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">{feature.title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
